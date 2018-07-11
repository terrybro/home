<template>
<div>
  <h1>This is Movies</h1>
  <div>
    <input v-model='postcode' />
    <span v-on:click=''>click</span>

    <div v-if='cinemas.length>0'>
      <div class='cinema' v-for='cinema in cinemas' :key='cinema.id' :data-id='cinema.id' :style="{height:computedHeight}">
        <h4 @click='loadFilms(cinema.id, $event)'>{{cinema.name}}</h4>
        <ul>
          <li v-for='(film, index) in cinema.films' :key='index' class='film'>
            <h5>{{film.title}}</h5>
            <img :src='film.img' width='80px' />
          </li>
        </ul>

      </div>
    </div>
  </div>
</div>
</template>

<script>
let myObj = {};
let el = document.getElementById('flex-container');
let listLength = 0;
let pos = 0;

export default {
  name: 'Movies',
  data() {
    return {
      postcode: 'cm12pd',
      cinemasUrl: 'https://api.cinelist.co.uk/search/cinemas/postcode/',
      postersUrl: 'https://api.themoviedb.org/3/search/movie?api_key=2371af018e391d0b17022b718aa9054c&query=',
      imageUrl: 'https://image.tmdb.org/t/p/w185/',
      filmsUrl: `https://api.cinelist.co.uk/get/times/cinema/`,
      cinemas: [],
      divHeight: '34px',
      key: '2371af018e391d0b17022b718aa9054c',
      imgShow: false,

    }
  },
  props: [],
  methods: {
    async getPoster(name) {

      const response = await fetch(`${postersUrl + name}&page=1`)
      return response.json()

    },
    async getCinemas() {

      const response = await fetch(cinemasUrl + postcode);
      return response.json();

    },

    async getFilms(id) {

      const response = await fetch(filmsUrl + id);
      return response.json();

    },

    objectTemplate: function(cinema, i) {
      return {
        id: i,
        name: cinema.substring(0, cinema.indexOf(",")),
        films: []
      }
    },

    setURL: function(index) {
      return (this.imgShow === true ? this.filmsList[index].img : 'https://image.tmdb.org/t/p/w185//l1yltvzILaZcx2jYvc5sEMkM7Eh.jpg')
    },
    closeDivs: function() {
      let els = document.querySelectorAll('.cinema')
      els.forEach.call(els, function(el) {
        el.style.height = '34px'
      })
    },

    loadFilms: function(id) {
      this.closeDivs()
      let el = event.target
      console.log('element is', el.parentNode)
      el.parentNode.style.height = el.parentNode.style.height === '34px' ? '400px' : '34px'
    },
    computed: {
      computedHeight: function() {
        return this.divHeight
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.scrolling-wrapper {
  position: relative;
  display: flex;
  width: 200px;
  height: 100%;
  margin: 0 auto;
  clip-path: inset(0% 0% 50% 0%);
}

#flex-container {
  display: flex;
  background-color: red;
  height: 100%;
  flex-wrap: nowrap;
  overflow-x: auto;
  transition: margin 0.4s ease-out;

}

.movie-box {
  height: 200px;
  min-width: 200px;
  border: solid 1px #000;
  padding: 12px;
  box-sizing: border-box;
}

.cinema {
  border: solid 1px #666;
  border-radius: 8px;
  transition: height 0.7s;
  padding: 8px;
  margin: 12px 0;
  overflow: hidden;
  height: 34px;
}

.film {
  position: relative;
  list-style: none;
  display: inline-block;
  width: 161px;
  vertical-align: text-top;
  border-radius: 4px;
  background-color: purple;
  margin-right: 11px;
  margin-bottom: 12px;
  padding: 8px;
  height: 160px;
  font-size: 0.8em;
}

.film h5 {
  font-size: 0.9em;
  line-height: 1.2em;
  position: absolute;
  z-index: 10;
}

.film img {
  position: absolute;
  top: 32px;
  left: 8px;

}
</style>
