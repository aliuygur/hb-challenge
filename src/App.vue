<template>
  <div id="app">
    <div class="container">
      <p class="notify-success" v-if="notifySuccess" v-html="notifySuccess"></p>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      addLink: false,
      title: null,
      link: null,
      links: []
    }
  },
  methods: {
    add() {
      // save to db
      this.$linkService.add(this.title, this.link)
        .then(link => {
          // put to state on success
          this.links.push(link)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  computed: {
    notifySuccess() {
      return this.$store.getters.notifySuccess
    }
  }
}
</script>

<style>
html {
  font-size: 16px;
}
.flex {
  display: flex;
}
.flex-row {
  flex-direction: row;
}
.flex-column {
  flex-direction: column;
}
.container{
  width: 500px;
  margin: 0 auto;
  /* display: flex; */
}
.add-link{
  width: 100%;
  height: 100px;
  font-size: 1.5rem;
}
.notify-success {
  background-color: #69F0AE;
  padding: 20px;
  border: 1px solid green;
  position: absolute;
  width: 500px;
  box-sizing: border-box;
  z-index: 9999;
  color: green;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.4);
}
</style>
