<template>
  <div>
    <select id='song-menu'>
    </select>
    <input id="song-title" placeholder="Put title here"/>
    <input id="song-notes" placeholder="Put notes here"/>
    <button id="save-song">save song</button>

    <audio data-key='65' src='http://soundbible.com/grab.php?id=2218&type=mp3'></audio>
    <audio data-key='83' src='http://soundbible.com/grab.php?id=966&type=mp3'></audio>
    <audio data-key='68' src='http://soundbible.com/grab.php?id=995&type=mp3'></audio>
  </div>

</template>

<script>
export default {
  name: 'Piano',
  data () {
    return {

    }
  },
  props:[],
  methods:{

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
