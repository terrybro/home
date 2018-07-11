<template>
  <div>
    <h1>This is Games</h1>
    <div id="words" contenteditable>
 </div>
    <div id="cats" v-if='cats' >
      <img src="http://placekitten.com/300/200">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Movies',
  data () {
    return {
      cats:false
    }
  },
  props:[],
  methods:{

  }

}


function dictate() {
console.log('here')
  if (window.hasOwnProperty('webkitSpeechRecognition')) {

    var recognition = new webkitSpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = function(e) {
      document.getElementById('words').innerHTML=(e.results[0][0].transcript);
      recognition.stop();
      document.getElementById('labnol').submit();
    };

    recognition.onerror = function(e) {
      recognition.stop();
    }

  }
}
dictate();

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.words {
  color: #000;
  max-width:500px;
  margin:50px auto;
  background:white;
  border-radius:5px;
  box-shadow:10px 10px 0 rgba(0,0,0,0.1);
  padding:1rem 2rem 1rem 5rem;
  background: -webkit-gradient(linear, 0 0, 0 100%, from(#d9eaf3), color-stop(4%, #fff)) 0 4px;
  background-size: 100% 3rem;
  position: relative;
  line-height:3rem;
}
p {
  margin: 0 0 3rem;
}
.words:before {
  content: '';
  position: absolute;
  width: 4px;
  top: 0;
  left: 30px;
  bottom: 0;
  border: 1px solid;
  border-color: transparent #efe4e4;
}

</style>
