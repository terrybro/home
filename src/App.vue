<template>
  <div id="app">
    <div id="dragon">

    </div>
    <div class="content">
      <header class="headerWrapper">
        <div class="headerApp">
          <span class="logo">tb </span> There's a fine line between a stream of consciousness and a babbling brook to nowhere
        </div>
      </header>
      <div class="wrapper">
          <div id='flexbox'>

            <div id="stage">
              <transition name="fade"><component v-bind:is='activeWidget' ></component></transition>
            </div>
            <div id="widgets">
              <button v-on:click='slideUp'><div class="up"><</div></button>
              <button v-on:click='slideDown'><div class="down"><</div></button>
              <widget :widgets='widgets'></widget>
            </div>
          </div>
      </div>
      <footer class="footerWrapper">
        <div class="footerApp">
          &copy;  2018 Terry Broughton   ::   t:  07986 559924   ::   e:  terry@terrybro.co.uk
        </div>
        <div class='speaker'>

        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js'
import mp3 from './assets/sounds/forest.mp3'
import Widget from './components/Widget'
import Home from './components/Home'
import Weather from './components/Weather'
import Movies from './components/Movies'
import Quiz from './components/Quiz'
import Spotify from './components/Spotify'
import Piano from './components/Piano'
import Webcam from './components/Webcam'
import YouTube from './components/YouTube'
import Life from './components/Life'
import Games from './components/Games'
import Exercise from './components/Exercise'
import Maps from './components/Maps'
import { EventBus } from './event-bus.js';

export default {
  name: 'App',
  components: {
    Widget,
    Home,
    Weather,
    Spotify,
    Quiz,
    Movies,
    Piano,
    YouTube,
    Webcam,
    Life,
    Games,
    Exercise,
    Maps
  },
  data(){
    return{
      msg:'hello',
      activeWidget:'home',
      widgets:[
        {
          id:1,
          title:'Home',
          img:'buttons.png'
        },
        {
          id:2,
          title:'Movies',
          img:'movies.png'
        },
        {
          id:3,
          title:'Quiz',
          img:'brain.png'
        },
        {
          id:4,
          title:'Spotify',
          img:'spotify.png'
        },
        {
          id:5,
          title:'Piano',
          img:'piano.png'
        },
        {
          id:6,
          title:'Weather',
          img:'weather.png'
        },
        {
          id:7,
          title:'Life',
          img:'life.png'
        },
        {
          id:8,
          title:'Games',
          img:'games.png'
        },
        {
          id:9,
          title:'YouTube',
          img:'youtube.png'
        },
        {
          id:10,
          title:'Webcam',
          img:'mic.png'
        },
        {
          id:11,
          title:'Exercise',
          img:'exercise.png'
        },
        {
          id:12,
          title:'maps',
          img:'map.png'
        }


    ]
    }

  },

  methods:{
    init(){
      let sound = new Audio(mp3)
      sound.volume = 0.8
      sound.loop = true
      sound.play()
    },
    fly(e){
      let dragon = document.getElementById('dragon')
      dragon.style.left = (e.pageY*2) + 100 + 'px'
      dragon.style.top = (e.pageX/2) + 'px'
    },
    slideDown:function(event){
      this.widgets.push(this.widgets.splice(0, 1)[0])
    },
    slideUp:function(event){
      this.widgets.unshift(this.widgets.pop())
    }
  },
  mounted(){
    this.init()
    window.addEventListener('mousemove', this.fly)
    EventBus.$on('i-got-clicked', clickCount => {
      this.activeWidget = clickCount
    });
  },
}
</script>

<style>
body{
  overflow-y: hidden;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #eee;
  margin-top: 0;
  height: 620px;
}
#flexbox{
  position: relative;
  display: flex;

  margin-bottom: 22px;
}
#widgets{
  position: absolute;
  top:0;
  left:970px;
  clip-path: inset(120px 0 0 0);
  flex: 2;
  height: 740px;
  min-width: 110px;
  margin-top: -120px;
  margin-right: 12px;
  overflow:hidden;
}
#stage{
  flex: 1;
  min-width: 840px;
  height: 620px;
  background: #0f3854;
  background: radial-gradient(ellipse at center,  #0a2e38  0%, #000000 70%);
  background-size: 100%;
  opacity: 0.7;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  margin-right: 14px;
  padding: 44px;
  overflow: hidden;
}
* {
    box-sizing: border-box;
    margin:0;
    padding:0;
}

body {
    font-family: Arial, Helvetica, sans-serif;
    background-color: #000;
    color: #fff;

}
@font-face {
  font-family: "Chicago House Trial";
  src: url("./assets/fonts/Chicago_House_Trial.woff") format("woff");
}


@keyframes changeHue {
  from {
    filter: blur(22px) opacity(0.3) hue-rotate(20deg);
    transform: scale(1.0);

  }

  to {
    filter: blur(12px) opacity(0.8) hue-rotate(120deg);
    transform: scale(1.2);
  }
}

#dragon{
  display: inline-block;
  position: absolute;
  height:100px;
  width:100px;
  background-image: url('./assets/dragonfly.gif');
  top:122px;
  left: 300px;
  z-index: 10;
  background-size: 60%;
  background-repeat: no-repeat;

}

.content::before {
  content: "";
  position: fixed;
  left: 0;
  right: 0;
  z-index: -1;
  background-image: url('./assets/bg.jpg');
  background-repeat:repeat-x;
  background-size: 80%;
  width: 100%;
  height: 100%;
  filter: blur(18px) opacity(0.4) hue-rotate(20deg);
  animation-duration: 30s;
  animation-name: changeHue;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

.content:hover::before{
  animation-duration: 30s;
  animation-name: changeHue;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
.wrapper{
  width:100%;
  max-width: 980px;
  height: 620px;
  margin:22px auto;
}

.headerWrapper{
  width:100%;
  height: 74px;
  background-color: rgba(0,0,0,0.6);
  opacity: 0.8;
  border-bottom: solid 1px #666;
}
.headerApp{
  font-family: 'Cuprum', sans-serif;
  font-size: 1.1em;
  width:100%;
  max-width: 980px;
  margin:0 auto;
  padding:8px 0;
}
.logo{
  font-family: "Chicago House Trial";
  font-size: 56px;
  color: red;
}

.appWindow{
  width:100%;
  border:solid 1px #444;
  border-radius: 4px;
  float: left;
  padding:12px;
  background-color: rgba(0,0,0,0.6);
  height: 100%;
}

.footerWrapper{
  width:100%;
  height:100%;
  background-color: rgba(38,70,3,0.3);
  border-top: solid 1px #444;

}
.footerApp{
  font-family: 'Cuprum', sans-serif;
  letter-spacing: 1px;
  width:100%;
  max-width: 980px;
  height: 400px;
  margin:0 auto;
  padding:10px 0;
  color: #ccc;
  font-size: 0.8em;
  opacity: 0.7;
}
.speaker{
  float: right;
  display: inline-block;
  width:40px;
  height: 40px;
  background-image: url('./assets/speaker.png');
  background-size: 40%;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 2s;
}
.fade-enter, .fade-leave {
  opacity: 0;
}
button{
  font-size: 1em;
  background-color: rgb(8, 87, 101);
  border: 0;
  color: #ddd;
  width:110px;
  height:22px;
  position: absolute;
  transition:.3s;

}
button .up{
  transform: scale(5, 1) rotate(90deg);
  padding: 0 0 3px 2px;
  margin: -10px 0 -20px 0;
}
button .down{
  transform: scale(5, 1) rotate(-90deg);
  padding: 0 0 3px 2px;
    margin: -10px 0 -20px 0;
}
button:hover{
  background-color: rgb(63, 1, 42);
  cursor: pointer;
}
button:first-of-type{
  top:119px;
  left:0;
  z-index: 10;
  border-top-right-radius: 8px;
}
button:last-of-type{
  bottom: 0;
  left:0;
  z-index: 10;
  border-bottom-right-radius: 8px;
}
button:focus {
  outline: none;
}

</style>
