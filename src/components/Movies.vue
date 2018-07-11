<template>
  <div>
    <h1>This is Movies</h1>
      <div>
        <input v-model='postcode' />
        <span v-on:click='start'>click</span>

        <div v-if='cinemas.length>0'>
          <div class='cinema' v-for='cinema in cinemas' :key='cinema.id' :data-id='cinema.id' :style="{height:computedHeight}">
            <h4  @click='showFilms($event)'>{{cinema.name}}</h4>
            <ul v-if='films'>
              <li v-for='film in cinema.films' :key='film.id' class='film'>
                <h5>{{film.title}}</h5>
                <img :src='getImage(film.title)' width='80px' />
                <ul style='position:relative, margin-left:88px'>
                  <li v-for='time in film.times'>{{time}}</li>
                </ul>
              </li>
            </ul>

          </div>
        </div>
      </div>
  </div>
</template>

<script>

export default {
  name: 'Movies',
  data () {
    return {
      cinemas:[],
      postcode:'',
      cinemasUrl:'https://api.cinelist.co.uk/search/cinemas/postcode/',
      filmsUrl:'https://api.cinelist.co.uk/get/times/cinema/',
      postersUrl:'https://api.themoviedb.org/3/movie/now_playing?api_key=2371af018e391d0b17022b718aa9054c&language=en-US&page=1&region=GB',
      films:false,
      posters:[]

    }
  },
  props:[],
  methods:{
    async getCinemas() {
      try{
        const response = await fetch(this.cinemasUrl + this.postcode);
        return response.json();
      }catch(err){
        console.log(err)
      }
    },
    async getFilms(id) {
      try{
        const response = await fetch(this.filmsUrl + id);
        return response.json();
      }catch(err){
        console.log(err)
    }
  },
    async getPosters() {
      try{
        const response = await fetch(this.postersUrl)
        return response.json()
      }catch(err){
        console.log(err)
    }
  },
    start(){
      this.films = false
      this.getCinemas()
      .then(response => {
        this.cinemas = response.cinemas
      })
      .then(()=>{
        this.cinemas.forEach(cinema => {
          this.getFilms(cinema.id)
          .then(response => {
            let currCinema = this.cinemas.find(cine => cine.id == cinema.id)
            currCinema.films = response.listings
          })
        })
      })
    },

    setURL:function(index){
      return (this.imgShow === true ? this.filmsList[index].img : 'https://image.tmdb.org/t/p/w185//l1yltvzILaZcx2jYvc5sEMkM7Eh.jpg')
    },

    closeDivs:function(){
      let els = document.querySelectorAll('.cinema')
      els.forEach.call(els, function (el) {
        el.style.height = '34px'
        el.scroll({top:0, behavior:'smooth'})
      })
      this.films = true
    },

    showFilms: function(id){
      this.closeDivs()
      let el = event.target
      el.parentNode.style.height = el.parentNode.style.height === '34px' ? '214px' : '34px'
    },
    modify:function(address){
      return address.substring( 0, address.indexOf(","))
    },

    getImage:function(name){
      let film = this.posters.find(poster => poster.title === name)
      if (typeof film !== 'undefined'){
            return film.img
      }
    }
  },
  computed:{
    computedHeight:function(){
      return this.divHeight
    }

  },
  mounted(){
    this.getPosters()
    .then(response => {
      response.results.forEach((film => {
        this.posters.push({title:film.title, img:`https://image.tmdb.org/t/p/w185/${film.poster_path}`})
      }))
    })
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.scrolling-wrapper{
  position: relative;
  display:flex;
  width: 200px;
  height: 100%;
  margin: 0 auto;
  clip-path: inset(0% 0% 50% 0%);
}
#flex-container{
  display: flex;
  background-color: red;
  height:100%;
  flex-wrap: nowrap;
  overflow-x: auto;
  transition: margin 0.4s ease-out;

}
.movie-box{
  height: 200px;
  min-width: 200px;
  border:solid 1px #000;
  padding: 12px;
  box-sizing: border-box;
}
.cinema{
  border:solid 1px #666;
  border-radius: 8px;
  transition: height 0.7s;
  padding: 8px;
  margin:12px 0;
  overflow-y: scroll;
  height: 34px;
}
.film{
  position: relative;
  list-style: none;
  display: inline-block;
  width: 161px;
  vertical-align: text-top;
  border-radius: 4px;
  background-color: purple;
  margin-top: 6px;
  margin-right: 11px;
  margin-bottom: 12px;
  padding:8px;
  height: 168px;
  font-size: 0.8em;
}
.film h5{
  font-size: 0.9em;
  line-height: 1.2em;
  position: absolute;
  z-index: 10;
}
.film h4{
  margin-bottom: 8px;
}
.film img{
  position: absolute;
  top:32px;
  left:8px;
}
.film ul{
  margin-left: 100px;
  margin-top: 18px;
  list-style-type: none;
}

</style>
