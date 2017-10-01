<template>
  <div>
    <div class="flex item">
      <div style="flex: 2">
        <h2 v-text="link.votes"></h2> points</div>
      <div style="flex: 8">
        <a href="" @click.prevent="remove(link)" class="remove-link">x remove</a>
        <div>
          <h2 v-text="link.title"></h2>
        </div>
        <div>(
          <a :href="link.link" v-text="link.link" target="_blank"></a>)</div>
        <p>
          <a href="" @click.prevent="upVote">up vote</a> |
          <a href="" @click.prevent="downVote">down vote</a>
        </p>
      </div>
    </div>
    <hr>
  </div>
</template>
<script>
export default {
  props: ['link'],
  methods: {
    remove(link) {
      if(!confirm(`do you want to remove "${link.title}"`)) {
        return
      }
      this.$store.dispatch('REMOVE_LINK', link.id)
        .then(() => {
          // success
          this.$store.commit('NOTIFY_SUCCESS', `<strong>${link.title}</strong> removed`)
        })
        .catch(err => {
          alert('an error occured')
          console.log(err)
        })
    },
    upVote() {
      ++this.link.votes
      this.$store.dispatch('UPDATE_LINK', {id: this.link.id, votes: this.link.votes})
        .catch(err => {
          --this.link.votes
          alert('an error occured')
          console.log(err)
        })
    },
    downVote() {
      --this.link.votes
      this.$store.dispatch('UPDATE_LINK', {id: this.link.id, votes: this.link.votes})
        .catch(err => {
          ++this.link.votes
          alert('an error occured')
          console.log(err)
        })
    }
  }
}
</script>
<style>
.flex {
  display: flex;
  align-items: center;
}

.flex-row {
  flex-direction: row;
}

.flex-column {
  flex-direction: column;
}
.item{
  border-radius: 10px;
  padding: 10px;
  position: relative;
}
.item:hover{
  background-color: #f5f5f5;
}
.remove-link{
  color: red;
  display: none;
  position: absolute;
  right: 4px;
}
.item:hover a.remove-link {
  display: block;
}
</style>


