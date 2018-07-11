<template>
  <div class='wrap'>
    <div class='search'>
      <h1>This is Weather</h1>
      <input v-model='city' />
      <input v-model='country' />
      <h5 @click='getWeather()'>Refresh</h5>
    </div>
    <div class='error' v-if='error.display'>
      {{error.message}}
    </div>
    <div v-if='!error.display' class='content'>
        <div class="condition-icon">
            <img  :src="getIcon()">
        </div>
        <div class="temp">
            {{temperature}}℃
        </div>
        <div class="info">
            <div class="cur-temp has-degs temp65 funits">The weather in {{city}} is {{description}}</div>
            <div class="high has-degs">Temperature High/Low: {{tempHigh}}℃ | {{tempLow}}℃</div>
            <div class="low has-degs">Wind speed/ dir: {{windSpeed}} | {{windDir}}</div>
            <div class="pop">
                <span class="pop-icon"></span><span>10%</span>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Weather',
  data () {
    return {
      city:'London',
      country:'UK',
      API_KEY:'6cbff35d35fce7a9111fd9c74bfee3df',
      temperature:'',
      humidity:'',
      description:'',
      tempHigh:'',
      tempLow:'',
      windSpeed:'',
      windDir:'',
      icons:{
        Rain:'http://icons.wxug.com/i/c/v4/rain.svg',
        Clouds:'http://icons.wxug.com/i/c/v4/partlycloudy.svg',
        Haze:'http://icons.wxug.com/i/c/v4/hazy.svg',
        Clear:'http://icons.wxug.com/i/c/v4/clear.svg',
        Mist:'http://icons.wxug.com/i/c/v4/fog.svg',
        Thunderstorm:'http://icons.wxug.com/i/c/v4/tstorms.svg',
        Snow:'http://icons.wxug.com/i/c/v4/snow.svg'
      },
      icon:'http://icons.wxug.com/i/c/v4/mostlysunny.svg',
      error:{
        display:false,
        message:'Please enter a valid city and country'
    }
  }
},
  props:[],
  methods:{
    getWeather:function(){
    const api_call = fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.country}&appid=${this.API_KEY}&units=metric`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      return data
    })
    .then((data) => {
      if (data.cod === "404") {
          this.showError(true)

        }else{
          this.temperature = Math.round(data.main.temp),
          this.humidity = data.main.humidity,
          this.description = data.weather[0].description,
          this.setIcon(data.weather[0].main),
          this.tempHigh = data.main.temp_max,
          this.tempLow = data.main.temp_min,
          this.windSpeed = data.wind.speed,
          this.windDir = data.wind.deg,
          this.showError(false)
        }
    })
  },
  setIcon:function(id){
    console.log(id)
    this.icon = this.icons[id]
  },
  getIcon:function(){
    return this.icon
  },
  showError:function(error){
    this.error.display = error
  }
  },
  mounted(){
    this.getWeather()
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrap{
  display:flex;
  flex-direction: column;
}
.search{
  flex:1;
  height:100px;
}
.search h1, input, h5{
  display: inline-block;
  width: 15%;
}
.search h1{
  width: 40%;
}
.error{
  font-size: 2em;
  font-weight: 600;
  color:red;
  margin:100px;
}
.content{
  display: flex;
  flex:1;
}
.condition-icon{
  flex:1;
  order: 1;
}
.temp{
  order:2;
  width:20%;
  font-size: 4em;
}
.info{
  margin-top: 16px;
  order:3;
  width:35%;
}

</style>
