<template>
  <div id="clock">
      <p class="date">{{ date }}</p>
      <p class="time">{{ time }}</p>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      date:'',
      time:''

    }
  },
  props:[],
  methods:{
    update(){
      setInterval (() => {
        let days = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        let now = new Date()
        let day = days[now.getDay()]
        let num = this.addZero(now.getDate(), 2)
        let hour = this.addZero(now.getHours(), 2)
        let min = this.addZero(now.getMinutes(), 2)
        let sec = this.addZero(now.getSeconds(), 2)
        let year = this.addZero(now.getFullYear(),4)
        let month = this.addZero(now.getMonth(), 2)
        this.date = `${day} ${num} ${month} ${year}`
        this.time = `${hour} : ${min} : ${sec}`
      }, 1000)
    },

      addZero:function(num, digit) {
      var zero = '';
      for(var i = 0; i < digit; i++) {
          zero += '0';
      }
      return (zero + num).slice(-digit);
    }
  },
  mounted(){
    this.update()
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #clock{
    width: 100%;
    height:600px;
    text-align: center;
    margin-top: 44px;
  }
  .date{
    font-size: 1.6em;
  }
  .time{
    font-size: 4em;
  }

</style>
