<template>
  <section class="main-section">
    <div class="content">
      <div class="king">
        <span class="subtitle mypadmar"><i>Ethereum-based game</i></span>
        <h1 class="crown mypadmar">👑</h1>
        <h1 class="mypadmar">King Of The Hill:</h1>
        <div class="neon-box">
          <span class="address mypadmar">{{ getReignTime().hours >= 24 ? 'The position is vacant' : king }}</span>
          <span>💰 Minimum reward: {{ fromWei(fee) }} ETH</span>
          <span v-if="getReignTime().hours < 24">Reign time: {{
              `${getReignTime().hours} hours ${getReignTime().minutes} minutes ${getReignTime().seconds} seconds`
            }}</span>
        </div>
        <div class="field has-addons">
          <p class="control">
            <input v-model="donation" @keypress="onlyNumber" class="input is-rounded" type="text" placeholder="Rounded input">
          </p>
          <p class="control">
            <span class="button is-rounded" @click="donation=fromWei(fee)">
              MIN
            </span>
          </p>
          <p class="control">
            <span class="button btn is-link is-rounded" @click="newKing()">
              Become king for {{ getReignTime().hours >= 24 ? '0.001' : donation }}
              <div class="eth-icon-24"></div>
            </span>
          </p>
        </div>
        <p>Your possible reward will be at least <strong>{{ (Number(donation) + donation * 30 / 100).toFixed(5) }}
          ETH</strong> (minus my fee of 5%)</p>
        <p><span style="color: #ff0000;">🚨 Make sure that the gas price does not exceed your minimum possible reward! 🚨</span>
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import json from '../KingOfTheHill.json';
import eventHub from "../event.js"

const Web3 = require('web3');

const ethEnabled = () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    window.ethereum.enable();
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
      sinceOf: 0,
      contract: null,
      board: [],
      donation: 0
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
    }
  },
  methods: {
    init() {
      if (!ethEnabled()) {
        alert("Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!");
      }

      let account0;
      window.web3.eth.getAccounts().then((result) => {
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

      console.log('[CONTRACT ADDRESS]', this.$contractAddress);

      this.contract = new window.web3.eth.Contract(json.abi, this.$contractAddress);
    },
    setKing(king) {
      if (king && (this.king !== king[0] || this.fee !== king[1] || this.sinceOf !== king[2])) {
        this.king = king[0];
        this.fee = king[1];
        this.sinceOf = king[2];
        this.donation = this.fromWei(this.fee);
      }
    },
    async newKing() {
      await this.getKing();

      if (this.account.address) {
        this.contract.methods.newKing().send({
          from: this.account.address,
          value: window.web3.utils.toWei(String(this.donation), 'ether')
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
        console.log('[GET KING]', result);
        this.setKing(result);
      });
    },
    fromWei(wei) {
      if (web3.utils) {
        return window.web3.utils.fromWei(String(wei), 'ether');
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
    onlyNumber ($event) {
      //console.log($event.keyCode); //keyCodes value
      let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
        $event.preventDefault();
      }
    }
  }
}
</script>