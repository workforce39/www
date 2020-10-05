<template>
  <section class="main-section">
    <div class="container">
      <div class="contentbox">
        <b-tabs position="is-centered">
          <b-tab-item label="Last 10 kings">
            <table class="table is-fullwidth">
              <thead>
              <tr>
                <th>👑 King</th>
                <th>Since Of</th>
                <th>Reward</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(i, index) in board" :key="index">
                <td>{{ i.king }}</td>
                <td>{{ new Date(i.sinceOf * 1000).toLocaleString() }}</td>
                <td>{{ fromWei(i.fee) }}
                  <div class="eth-icon-16"></div>
                </td>
              </tr>
              </tbody>
            </table>
          </b-tab-item>
          <b-tab-item label="How to play">
            <p>
              Dear friend, welcome to KingHill.io
            </p>
            <br>
            <p>
              This is a simple game based on the Ethereum blockchain.
            </p>
            <br>
            <p>
              The rules are as follows:<br>
              A player can become the "King of the Hill" if they pay a certain price in ETH tokens. Tokens paid will automatically go to the previous "King of the Hill", minus my fee of 5%.
            </p>
            <br>
            <p>
              The same thing will happen to you! When the new "King of the Hill" appears, you will receive a reward.
            </p>
            <br>
            <p>
              How is the price formed?
            </p>
            <br>
            <p>
              The price of becoming the "King of the Hill" starts at 0.001 ETH and is increased by 30% with every new ruler. But be careful: if you don't find a successor in 24 hours, the price will be reset to the starting value.
            </p>
            <br>
            <p>
              Do you have any questions or just want to chat? Here's my telegram: <a href="https://t.me/stdi0">@stdi0</a>
            </p>
          </b-tab-item>
        </b-tabs>
      </div>
    </div>
  </section>
</template>

<script>
import json from '../KingOfTheHill.json';
import eventHub from "../event.js"

export default {
  components: {},
  data() {
    return {
      contract: null,
      board: [],
      tab: 0
    }
  },
  mounted() {
    this.contract = new window.web3.eth.Contract(json.abi, this.$contractAddress)
    this.getEvents();
    setInterval(this.getEvents, 1000);
  },
  computed: {
    account() {
      return this.$store.state.account;
    }
  },
  methods: {
    getEvents() {
      this.contract.getPastEvents(
          'NewKing',
          {
            fromBlock: 0,
            toBlock: 'latest'
          },
          (err, events) => {
            this.board = events.map(e => {
              return e.returnValues;
            }).reverse().splice(0, 10)

            eventHub.$emit('NEW_KING', this.board[0]);
          }
      )
    },
    fromWei(wei) {
      if (web3.utils) {
        return window.web3.utils.fromWei(String(wei), 'ether');
      }
    },
    getReignTime() {
      const sinceOf = new Date(this.sinceOf * 1000);
      const now = new Date();
      const timeDiff = now - sinceOf;
      return new Date(timeDiff).toLocaleTimeString();
    }
  }
}
</script>