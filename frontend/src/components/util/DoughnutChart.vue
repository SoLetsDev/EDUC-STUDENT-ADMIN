<script>
//../src/Chart.js
import { Doughnut, mixins } from 'vue-chartjs';

export default {
  extends: Doughnut,
  mixins: [mixins.reactiveProp],
  props: ['chartData', 'options'],
};
</script>
