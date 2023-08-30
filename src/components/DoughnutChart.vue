<template>
  <div>
    <h3>COMPOSICIÓN DE LAS FINANZAS</h3>
  </div>

  <div style="height: 31.25rem">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>
  
<script>
import Chart from "chart.js/auto";

export default {
  props: {
    labels: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    this.renderDoughnut();
  },
  watch: {
    labels: "updateDoughnut",
    data: "updateDoughnut",
  },
  methods: {
    renderDoughnut() {
      const dataDoughnut = {
        labels: this.labels,
        datasets: [
          {
            data: this.data,
            backgroundColor: ["#143F6B", "#F55353", "#FEB139","#F6F54D","#0079FF", "#00DFA2", "#FF0060", "#8B1874", "#54B435"],
          },
        ],
      };

      const optionsDoughnut = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'left',
            labels: {
              color: 'black',
              font: { size: 15 },
            },
          },
        },
      };

      this.doughnut = new Chart(this.$refs.chartCanvas, {
        type: "doughnut",
        data: dataDoughnut,
        options: optionsDoughnut,
      });
    },
    updateDoughnut() {
      if (this.doughnut) {
        this.doughnut.data.labels = this.labels;
        this.doughnut.data.datasets[0].data = this.data;
        this.doughnut.update();
      } else {
        this.renderDoughnut();
      }
    },
  },
  beforeUnmount() {
    if (this.doughnut) {
      this.doughnut.destroy();
    }
  },
};
</script>