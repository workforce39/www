<template>
  <div class="container">
    <div class="offer has-text-centered">
      <div class="content">
        <span class="subtitle"><i>Ethereum-based game</i></span>
        <h1 class="crown">👑</h1>
        <h1>King Of The Hill:</h1>
        <div class="neon-border">
          <p class="address">{{ king ? king : 'The position is vacant' }}</p>
          <span v-if="king">💰 Minimum reward: {{ fromWei(fee) }} ETH</span>
          <span v-if="king">⏳ Reign time: {{
              `${getReignTime().hours} hours ${getReignTime().minutes} minutes ${getReignTime().seconds} seconds`
            }}</span>
        </div>
        <div class="field has-addons-centered has-addons">
          <p class="control">
            <input v-model="donation" @keypress="onlyNumber" class="input is-rounded" type="text">
          </p>
          <p class="control">
            <span class="button is-rounded" @click="donation = fromWei(fee)">
              MIN
            </span>
          </p>
          <p class="control">
            <span class="button btn is-link is-rounded" @click="newKing()">
              Become king for {{ donation }}
              <div class="eth-icon-24"></div>
            </span>
          </p>
        </div>
        <p>Your possible reward will be at least <strong>{{ (Number(donation) + donation * 30 / 100).toFixed(5) }}
          ETH</strong> (minus my fee of 5%)</p>
        <p style="color: #ff0000;">🚨 Make sure that the gas price does not exceed your minimum possible reward! 🚨</p>
      </div>
    </div>
  </div>
</template>

<script>
import json from '../KingOfTheHill.json';
import eventHub from "../event.js"

const Web3 = require('web3');

const ethEnabled = () => {
  if (ethereum) {
    web3 = new Web3(ethereum);
    ethereum.enable();
    return true;
  }
  return false;
}

export default {
  components: {},
  data() {
    return {
      king: '',
      fee: 0,
      donation: 0.001,
      sinceOf: 0,
      contract: null,
      board: [],
    }
  },
  mounted() {
    eventHub.$on('LOGIN', () => this.init());
    eventHub.$on('NEW_KING', king => this.setKing(king));

    this.init()
    this.getKing();
  },
  computed: {
    account() {
      return this.$store.state.account;
    },
    timeIsOver() {
      return this.getReignTime().hours >= 24;
    }
  },
  methods: {
    init() {
      if (!ethEnabled()) {
        alert("Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!");
      } else {
        let account0;
        web3.eth.getAccounts().then((result) => {
          account0 = result[0];
          if (!this.account.address || account0 !== this.account.address) {
            this.$store.commit("UPDATE_ACCOUNT", {
              address: account0
            });
            this.$buefy.snackbar.open({
              duration: 3000,
              message: 'You have been successfully authorized!',
              type: 'is-success',
              queue: false,
              // position: 'is-top',
            })
          }
        })

        this.fee = this.toWei(0.001);
        this.contract = new web3.eth.Contract(json.abi, this.$contractAddress);
      }
    },
    setKing(king) {
      if (king && (this.sinceOf !== king[2])) {
        this.sinceOf = king[2];
        if (this.timeIsOver) {
          this.king = "";
          this.fee = this.toWei(0.001);
          this.donation = 0.001;
        } else {
          this.king = king[0];
          this.fee = king[1];
          this.donation = this.fromWei(this.fee);
        }
      }
    },
    async newKing() {
      await this.getKing();

      if (this.account.address) {
        this.contract.methods.newKing().send({
          from: this.account.address,
          value: this.toWei(this.donation)
        })
            .then((receipt) => {
              this.$buefy.snackbar.open({
                duration: 3000,
                message: 'You have become the new king of the hill!',
                type: 'is-success',
                queue: false,
                // position: 'is-top',
              })
            }).catch((error) => {
          this.$buefy.snackbar.open({
            duration: 3000,
            message: error,
            type: 'is-danger',
            queue: false,
            // position: 'is-top',
          })
        });
      }
    },
    async getKing() {
      this.contract.methods.getKing().call((err, result) => {
        this.setKing(result);
      });
    },
    fromWei(wei) {
      if (web3 && web3.utils) {
        return web3.utils.fromWei(String(wei), 'ether');
      }
    },
    toWei(ether) {
      if (web3 && web3.utils) {
        return web3.utils.toWei(String(ether), 'ether')
      }
    },
    getReignTime() {
      const sinceOf = new Date(this.sinceOf * 1000).getTime();
      const now = new Date().getTime();
      const msec = now - sinceOf;
      let secs = Math.floor(msec / 1000);
      let mins = Math.floor(secs / 60);
      let hrs = Math.floor(mins / 60);
      secs = secs % 60;
      mins = mins % 60;

      return {hours: hrs, minutes: mins, seconds: secs};
    },
    onlyNumber($event) {
      let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
        $event.preventDefault();
      }
    }
  }
}
</script>