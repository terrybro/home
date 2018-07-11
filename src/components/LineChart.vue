
<script>
import Chart from 'chart.js'
import {Line} from 'vue-chartjs'
export default {
  name: 'LineChart',
  extends: Line,
  data () {
    return {

    }
  },
  props:['chartdata', 'exercises'],
  methods:{

  },
  mounted () {
    this.renderChart({
      labels: this.chartdata.labels,
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#FC2525',
          data: this.chartdata.data
        },{
          label: 'Data Two',
          backgroundColor: '#05CBE1',
          data: [60, 55, 32, 10, 2, 12, 53]
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
