<template>
  <div>
    <h1>User List</h1>
    <UserTable :users="users" />
  </div>
</template>

<script>
import UserTable from '~/components/UserTable.vue'

export default {
  components: {
    UserTable
  },
  data() {
    return {
      users: []
    }
  },
  async fetch() {
    try {
      const response = await this.$axios.$get('http://localhost:8000/users')
      this.users = response
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }
}
</script>