<template>
  <div>
    <div>
      <h1>Exercise Charts</h1>
      <button v-on:click='buttons = !buttons, myChart = !myChart' >Hide</button>
    </div>
    <div class="row" v-for='(exercise, key) in exercises' v-show='buttons'>
      <div>{{key}}</div><div><button v-on:click="add(`${key}`)">add</button><input v-bind:value='exercise'/></div>
    </div>

           <line-chart  v-if='myChart' :chartdata='chartdata'></line-chart>


  </div>
</template>

<script>
import LineChart from './LineChart'
export default{
  name: 'Exercise',
  components:{
    LineChart
  },
  data () {
      return {
        chartdata:{
          labels:['January', 'February', 'March', 'April', 'May', 'June'],
          data:[2, 11, 3,4, 12, 6]
        },
        exercises:{
          face1:0,
          neck:0,
          squats:0,
          butterfly:0,
          shoulder:0,
          face2:0
        },
        buttons:true,
        myChart:false
      }
      },
    methods: {
      add(ex){
        this.exercises[ex] ++
      }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  button, input{
    position: static;
    width:44px;
    border-radius: 4px;
    padding:8px;
    height: 32px;
    float: none;
    margin-left: 12px;
    margin-top: 0;
    vertical-align: top;
    font-size:14px;
    text-align: center;
  }
  .row{
    margin-bottom: 8px;
    padding:4px;
  }
  .row div:nth-child(2){
    display: inline-block;
    width: 120px;
  }
  .row div:nth-child(1){
    display: inline-block;
    width: 200px;
  }
  #ex-chart{
    height: 260px;
  }

</style>
