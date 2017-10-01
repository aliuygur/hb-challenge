<template>
  <div>
    <p><router-link to="/add-link">Submit a link</router-link></p>

    <select v-model="orderBy">
      <option value="">Order By</option>
      <option value="mostVoted">Most Voted (Z-A)</option>
      <option value="lessVoted">Less Voted (A-Z)</option>
    </select>

    <p v-if="links.length == 0">no records to display, you can add by clicking "add link" button</p>
    
    <LinkItem v-for="link in linksPaginated" :link="link" :key="link.id"></LinkItem>

    <Pagination :per-page="pagination.perPage" :total="links.length" @page-changed="pagination.currentPage = arguments[0]"></Pagination>
  </div>
</template>
<script>
import LinkItem from './Link.vue'
import Pagination from './Pagination.vue'
export default {
  data() {
    return {
      orderBy: "",
      pagination: {
        currentPage: 1,
        perPage: 5
      }
    }
  },
  mounted() {
    // fetch all records from db.
    this.$store.dispatch('FETCH_LINKS')
  },
  computed: {
    links() {
      switch(this.orderBy) {
        case "mostVoted":
          return this.$store.getters.linksMostVoted
        case "lessVoted":
          return this.$store.getters.linksLessVoted
        default:
          return this.$store.getters.links        
      }
    },
    linksPaginated() {
      let offset = (this.pagination.currentPage - 1) * this.pagination.perPage
      let limit = offset + this.pagination.perPage
      return this.links.slice(offset, limit)
    }
  },
  components: {LinkItem, Pagination}
}
</script>
<style>

</style>
