<template>
  <div>
    <p>
      <router-link to="/">Return to list</router-link>
    </p>
    <h2>Add new link</h2>
    <p v-if="!isValid" style="color: red">All fields are required</p>
    <p>
      title: <input type="text" v-model="title" required autofocus>
    </p>
    <p>
      link: <input type="text" v-model="link" required @keyup.enter="add">
    </p>
    <p>
      <button @click="add">add</button>
    </p>
  </div>
</template>
<script>

export default {
  data() {
    return {
      isValid: true,
      title: null,
      link: null
    }
  },
  methods: {
    add() {
      // validation
      if (!this.title || !this.link) {
        this.isValid = false
        return
      }

      this.$store.dispatch('ADD_LINK', { title: this.title, link: this.link }).then(link => {
        // success, redirect to list.
        this.$store.commit('NOTIFY_SUCCESS', `<strong>${this.title}</strong> added`)
        this.$router.push('/')
      }).catch(err => {
        // error, log the error
        alert('an error occured')
        console.log(err)
      })
    }
  }
}
</script>

