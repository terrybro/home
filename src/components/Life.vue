<template>
  <div>
    <h1>This is Life</h1>
    <button v-on:click="setStyle"> click</button>
    <div v-for='div in arr' class='cell'>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Life',
  data () {
    return {
      arr:[]

    }
  },
  props:[],
  methods:{
    setStyle:function(){
      console.log('hi')
      let nodes = document.getElementsByClassName('cell')
      Array.prototype.forEach.call(nodes, child => {
        child.className += this.random()
      })
    },

    random:function(){
      return ' style' + Math.round(Math.random())
    }

  },
  computed:{

  },
  mounted:function(){
    this.arr = new Array(100)
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .cell{
    display: inline-block;
    float: left;
    width: 8px;
    height: 8px;
    border:solid 1px #fff;
    margin: 0;
    font-size: 0;
    line-height: 0;
  }
  .style0{
    background-color: red;
  }
  .style1{
    background-color: yellow;
  }

</style>
