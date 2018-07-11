<template>
  <div>
  {{quiz.title}}
  <div v-for="(question, index) in quiz.questions">
    <!-- Hide all questions, show only the one with index === to current question index -->
    <div v-show="index === questionIndex">
      <h2>{{ question.text }}</h2>
      <ol>
        <li v-for="response in question.responses">
           <input type="radio"
                  v-bind:value="response.correct"
                  v-bind:name="index"
                  v-model="userResponses[index]" />{{response.text}}
        </li>
      </ol>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Quiz',
  data () {
    return {
      quiz:{
  title: 'My quiz',
  questions: [
    {
      text: "Who shot JR?",
      responses: [
        {text: 'Bobby.'},
        {text: 'Kristen', correct: true},
      ]
    }, {
      text: "Who won the world cup in 1970?",
      responses: [
        {text: 'Brazil', correct: true},
        {text: 'Italy'},
      ]
    }
  ]
},
questionIndex:0,
userResponses: (this.quiz.questions).slice().fill(false)
    }
  },

    props:[],
    methods:{

    }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
