<template>

<div>


    <div id='welcome'>
      <div class='avatar'>
        <div class='avatars'>
          <div class="butt" @click='slideRight'>
            >
          </div>
          <span v-for='avatar in avatars' :key='avatar.id'>
            <img  :src='avatar.src' :data-img='avatar.name' height="120px" />
          </span>
        </div>

        <input @keyup.enter = "changeName" v-model='person.name' @focus='clearText'/>
      </div>
      <div v-if='visited'>
        <h1>Hi {{ person.name }}, welcome back</h1>
        <p>
          There's nothing saved in your Calendar for today.
        </p>
        <p>
          Why not have a look at some of the mini projects by clicking on the icons in the scrolling menu on the right.
        </p>
      </div>
      <div v-else>
        <h1>Welcome {{ person.name }}, is this your first visit?</h1>
        <p>
          If you would like to be remembered when you come back, choose an avatar, tell us your name and press enter on your keyboard.
        </p>
        <p>
          You can then use the calendar to add events and we will store them for when you return.
        </p>
        <p>
          Please explore the site by clicking on the icons in the scrolling menu on the right.
        </p>

      </div>

    </div>

    <div id="clock">
      <p class="date">{{ date }}</p>
      <p class="time">{{ time }}</p>
    </div>

    <div class="calendar">
      <div v-for="mon in person.cal.months">
        <div class='month'>
          {{mon.month}}
        </div>
        <div class="column" v-for='day in mon.days'>
          <div class='day'>
            {{day.day}}
          </div>
          <div class='date' v-on:click='showEntry($event)'>
            {{day.date}}
          </div>
        </div>
        <div id='entry'><span contenteditable="true"></span><div  v-on:click='addEntry($event)'>+</div></div>
      </div>
    </div>

</div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      date:'',
      time:'',
      isActive:false,
      avatars:[
        {
          name:'buttons',
          src:'./src/assets/images/buttons.png',
          id:1
        },
        {
          name:'blackWidow',
          src:'./src/assets/images/blackWidow.png',
          id:2
        },
        {
          name:'harley',
          src:'./src/assets/images/harley.png',
          id:3
        },
        {
          name:'ironman',
          src:'./src/assets/images/ironman.png',
          id:4
        },
        {
          name:'hellboy',
          src:'./src/assets/images/hellboy.png',
          id:5
        },
        {
          name:'jason',
          src:'./src/assets/images/jason.png',
          id:6
        }

      ],
      person:{
        name:'Guest',
        avatar:'buttons',
        cal:{
          months:[
            {
              month:'June',
              days:[
                {
                  day:'Tue',
                  date:5,
                  entry:''
                },
                {
                  day:'Wed',
                  date:6,
                  entry:''
                },
                {
                  day:'Thu',
                  date:7,
                  entry:''
                },
                {
                  day:'Fri',
                  date:8,
                  entry:''
                },
                {
                  day:'Sat',
                  date:9,
                  entry:''
                },
                {
                  day:'Sun',
                  date:10,
                  entry:'go to dentist'
                },
                {
                  day:'Mon',
                  date:11,
                  entry:''
                },
                {
                  day:'Tue',
                  date:12,
                  entry:''
                },
                {
                  day:'Wed',
                  date:13,
                  entry:''
                },
                {
                  day:'Thu',
                  date:14,
                  entry:''
                },
                {
                  day:'Fri',
                  date:15,
                  entry:''
                },
                {
                  day:'Sat',
                  date:16,
                  entry:''
                },
                {
                  day:'Sun',
                  date:17,
                  entry:''
                },
                {
                  day:'Mon',
                  date:18,
                  entry:''
                },
                {
                  day:'Tue',
                  date:19,
                  entry:''
                },
                {
                  day:'Wed',
                  date:20,
                  entry:''
                },
                {
                  day:'Thu',
                  date:21,
                  entry:''
                },
                {
                  day:'Fri',
                  date:22,
                  entry:''
                },
                {
                  day:'Sat',
                  date:23,
                  entry:''
                },
                {
                  day:'Sun',
                  date:24,
                  entry:'go to dentist'
                },
                {
                  day:'Mon',
                  date:25,
                  entry:''
                },
                {
                  day:'Tue',
                  date:26,
                  entry:''
                },
                {
                  day:'Wed',
                  date:27,
                  entry:''
                },
                {
                  day:'Thu',
                  date:28,
                  entry:''
                },
                {
                  day:'Fri',
                  date:29,
                  entry:''
                },
                {
                  day:'Sat',
                  date:30,
                  entry:''
                }
              ]
            }
          ]
        }
      },
      myData:{},
      visited:false,
      currDay:{},
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
        let month = this.addZero(now.getMonth()+1, 2)
        this.date = `${day} ${num} ${month} ${year}`
        this.time = `${hour}:${min}:${sec}`
      }, 1000)
    },

    addZero:function(num, digit) {
      var zero = '';
      for(var i = 0; i < digit; i++) {
          zero += '0';
      }
      return (zero + num).slice(-digit);
    },

    changeName:function(e){
      e.target.blur()
      localStorage.setItem('person', JSON.stringify(this.person))
    },

    clearText:function(){
      if(this.person.name == 'Guest') {this.person.name = ''}
    },

    loadData:function(){
      this.myData = JSON.parse(localStorage.getItem('person'))
      if (!this.myData)  {
        this.visited = false
        return
      } else this.visited = true
      this.person = this.myData
      let i = this.avatars.findIndex(avatar => avatar.name == this.person.avatar.name)
      if (i === 0) return;

      let av = this.avatars.splice( i, 1 );
console.log(this.person.avatar)
      this.avatars.unshift( av )
      this.avatars[0].src = `./src/assets/images/${this.person.avatar.name}.png`
    },

    slideRight:function(event){
      this.avatars.push(this.avatars.splice(0, 1)[0])
      this.person.avatar = this.avatars[0]
      localStorage.setItem('person', JSON.stringify(this.person))
    },

    slideLeft:function(event){
      this.avatars.unshift(this.avatars.pop())
    },

    showEntry:function(event){
      let dates = document.querySelectorAll('.active')
      dates.forEach(function(item){item.classList.remove('active')})
      let val = event.target
      val.className += val.className ? ' active' : 'active';
      this.currDay = this.person.cal.months[0].days.find(function(el){
        return el.date == val.firstChild.nodeValue
      })
      let cell = document.getElementById('entry').firstChild
      cell.innerHTML=this.currDay.entry
    },

    addEntry:function(){
      let cell = document.getElementById('entry').firstChild
      this.currDay.entry = cell.textContent
      localStorage.setItem('person', JSON.stringify(this.person))
    }

  },
  mounted(){
    this.update()
    this.loadData()
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#welcome{
  font-family: 'Cuprum', sans-serif;
  padding-bottom: 44px;
}
#welcome h1, p{
  padding:8px 0;
}
#welcome input{
  text-align: center;
  color:rgb(8, 87, 101);
  padding:4px 8px;
  border-radius: 6px;
  border:1px solid #999;
  font-family: 'Cuprum';
  font-size: 1.1em;
  font-weight: 600;
  width: 76%;
  margin-top: 8px;
}
#welcome input:focus{
  border-radius: 6px;
  outline: 5px solid purple;

}
  #clock{
    clear: both;
    font-family: "digital-7";
    width: 100%;
    border:solid 1px #666;
    border-radius: 8px;
    padding: 12px;
    height: 160px;
    background-color: #000;
    opacity: 0.9;
  }
  .column{
    display: inline-block;
    width:30px;
  }
  .date{
    font-family: 'Oswald', sans-serif;
    text-align: center;
    font-size: 1.1em;
    clear: both;
    cursor: pointer;
    padding-bottom: 2px;
  }
  .time{
    text-align: center;
    font-family: 'Inconsolata', sans-serif;
    font-size: 5em;
    text-shadow: 0 0 20px rgba(10, 175, 230, 1),  0 0 20px rgba(10, 175, 230, 0);

  }
  .avatar{
    display: inline-block;
    padding: 14px 0 22px 0;
    float: left;
    width: 180px;
    text-align: center;
    background-color: rgb(8, 87, 101);
    border-radius: 32px;
    margin-right: 22px;
    margin-bottom: 32px;
  }
  .avatars{
    max-height: 120px;
    overflow:hidden;
    position: relative;
  }
  .butt{
    position: absolute;
    z-index: 10;
    top:32px;
    left:160px;
  }
  .calendar{
    text-align: center;
    font-family: 'Oswald', sans-serif;
    margin-top: 24px;
  }
  #entry{
    background-color: rgb(8, 87, 101);
    height:44px;
    border-radius: 6px;
    padding:8px;
    width:100%;
  }
    #entry:first-child{
      cursor:text;
    }
  #entry div{
    display: inline-block;
    width:22px;
    float: right;
    font-size: 2em;
    font-weight: 900;
    margin-top: -12px;
    cursor: pointer;
  }
  .month{
    color: rgb(15, 186, 216);
    font-size: 1.3em;
  }
  .active{
    background-color: rgb(8, 87, 101);
    transition: all 0.5s ease-out;
  }
  .butt{
    font-size: 1.4em;
    font-weight: 200;
    color: rgb(63, 1, 42);
    transform: scale(1, 4);
    cursor: pointer;
  }

</style>
