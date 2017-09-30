<template>
  <div v-if="totalPage > 1">
    <ul class="pagination">
      <li v-if="currentPage != 1">
        <a href="" @click.prevent="changePage(currentPage - 1)">Prev</a>
      </li>
      <li v-for="page in pages" :class="{active: currentPage == page}">
        <a href="" @click.prevent="changePage(page)">{{page}}</a>
      </li>
      <li v-if="currentPage != totalPage">
        <a href="" @click.prevent="changePage(currentPage + 1)">Next</a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentPage: 1
    }
  },
  props: ['perPage', 'total'],
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.perPage)
    },
    pages() {
      return [...Array(this.totalPage + 1).keys()].slice(1)
    }
  },
  methods: {
    changePage(page) {
      this.$emit('page-changed', page)
      this.currentPage = page
    }
  }
}
</script>

<style>
.pagination {
  list-style-type: none;
}

.pagination li {
  float: left;
  padding: 5px 10px
}

.pagination li.active {
  background-color: #ccc;
}
</style>

