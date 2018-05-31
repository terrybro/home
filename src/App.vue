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
        <div id="app">
          <div id='flexbox'>

            <div id="stage">
              <transition name="fade"><component v-bind:is='activeWidget' ></component></transition>
            </div>
            <div id="widgets">
              <button v-on:click='slideUp'>click me</button>
              <button v-on:click='slideDown'>click me</button>
              <widget :widgets='widgets'></widget>
            </div>
          </div>
        </div>
      </div>
      <footer class="footerWrapper">
        <div class="footerApp">
          &copy; 2018 Terry Broughton
        </div>
        <div class='speaker'>

        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import mp3 from './assets/sounds/forest.mp3'
import Widget from './components/Widget'
import Home from './components/Home'
import Weather from './components/Weather'
import Movies from './components/Movies'
import Quiz from './components/Quiz'
import Spotify from './components/Spotify'
import Drums from './components/Drums'

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
    Drums
  },
  data(){
    return{
      msg:'hello',
      activeWidget:'home',
      widgets:[
        {
          id:1,
          title:'Home'
        },
        {
          id:2,
          title:'Movies'
        },
        {
          id:3,
          title:'Quiz'
        },
        {
          id:4,
          title:'Spotify'
        },
        {
          id:5,
          title:'Drums'
        },
        {
          id:6,
          title:'Weather'
        }


    ]
    }

  },

  methods:{
    init(){
      let sound = new Audio(mp3)
      sound.volume = 0.1
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #eee;
  margin-top: 0;
  height: 620px;
}
#flexbox{
  display: flex;
  background: #0f3854;
  background: radial-gradient(ellipse at center,  #0a2e38  0%, #000000 70%);
  background-size: 100%;
  opacity: 0.7;
  border-radius: 8px;
  margin-bottom: 22px;
}
#widgets{
  position: relative;
  top:0;
  flex: 2;
  height: 620px;
  min-width: 220px;
  margin-top: 0;
  overflow:hidden;
  border:solid 2px #fff;
}
#stage{
  flex: 1;
  height: 620px;
  min-width: 740px;
  margin-right: 12px;
  padding: 22px;
  border-radius: 8px;
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
  width:100%;
  max-width: 980px;
  height: 400px;
  margin:0 auto;
  padding:10px 0;
  color: #ccc;
  font-size: 11px;
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
button:first-of-type{
  position: absolute;
  top:92px;
  left:106px;
  z-index: 10;
}
button:last-of-type{
  position: absolute;
  bottom: -180px;
  left:106px;
  z-index: 10;
}
.widget{
  height:220px;
  padding:12px;
  transition: transform 0.3s ease-in-out, opacity 0.1s;
  cursor: pointer;
  border:solid 8px #fff;
  margin-top: 0;
}
.widget:first-of-type {
  opacity: 0;
  height:0;
}

.widget:last-of-type {
  opacity: 0;
}
.widgets-enter-active, .widgets-leave-active {
  opacity:0;
}
.widgets-enter, .widgets-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity:0;

}
</style>
