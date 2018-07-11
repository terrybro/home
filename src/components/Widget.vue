<template>
  <div>
    <transition-group name="widgets" tag='div'>
      <div v-for='widget in widgets' v-bind:key='widget.id' class="widget">
        <img :src='`./src/assets/images/${widget.img}`' v-on:click='emitGlobalClickEvent(widget.title)' height='66px'>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { EventBus } from './../event-bus.js';
export default {
  name: 'Widget',
  data () {
    return {
      active:''

    }
  },
  props:['widgets'],
  methods:{
    slideUp:function(event){
      this.widgets.push(this.widgets.splice(0, 1)[0])
    },
    slideDown:function(event){
      this.widgets.unshift(this.widgets.pop())
    },
    emitGlobalClickEvent(e) {
      this.clickCount++;
      EventBus.$emit('i-got-clicked', e);
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.filler{
  margin-bottom: auto;
}
button{
  position: absolute;
  top:60px;
  left:300px;
}
.widget{
  height:91px;
  padding: 12px;
  transition: transform 0.4s ease-in-out, opacity 2.6s;
  cursor: pointer;
  margin-top: 4px;
  opacity: 0.9;
  text-align: center;
  padding: 6px 8px 10px;
  border: solid 6px rgb(8, 87, 101);
  border-radius: 4px
}
.widget:first-of-type {
  opacity: 0;
  margin-bottom: 53px;
}

.widget:last-of-type {
  opacity: 0;
}
.widget:nth-of-type(8) {
  opacity: 0;
    margin-top: 53px;
}
.widgets-enter-active, .widgets-leave-active {
  opacity:0;
}
.widgets-enter, .widgets-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity:0;
}
.widget:hover{
  border-color: rgb(63, 1, 42);
  background-color: #000;
}


</style>
