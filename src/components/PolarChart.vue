<template>
  <div id="app">
    <apexchart
      type="pie"
      height="350"
      :options="chartOptions"
      :series="series"
      v-if="tampilkan"
    ></apexchart>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";

export default {
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      tampilkan: false,
      series: [],
      chartOptions: {
        chart: {
          width: 380,
          type: 'pie',
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      },
    };
  },
  created() {
    // Data dummy
    const apiData = [
      { location: "40%", total: 40 },
      { location: "60%", total: 60 },
    ];

    const categories = apiData.map((item) => item.location);
    const dataForChart = apiData.map((item) => item.total);

    this.chartOptions.labels = categories; // Menggunakan lokasi sebagai label
    this.series = dataForChart;

    this.tampilkan = true;
  },
};
</script>
