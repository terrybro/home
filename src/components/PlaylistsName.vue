<template>
  <h1>
    {{ name }}'s Playlists
  </h1>
</template>


<script>
export default {
  name: 'PlaylistsName',
  props: ['name'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
