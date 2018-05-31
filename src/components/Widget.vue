<template>
  <div>
    <transition-group name="widgets" tag='div'>
      <div v-for='widget in widgets' v-bind:key='widget.id' class="widget">
        <h1 v-on:click='emitGlobalClickEvent(widget.title)'>{{widget.title}}</h1>
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
  height:100px;
  transition: transform 0.3s ease-in-out, opacity 0.1s;
  cursor: pointer;
  border:solid 1px #666;
  margin-top: 12px;
}
.widget:first-of-type {
  opacity: 0;
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
