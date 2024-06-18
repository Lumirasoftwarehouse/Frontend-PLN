<template>
    <apexchart
      type="line"
      height="350"
      :options="chartOptions"
      :series="series"
    ></apexchart>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
// import { createApp } from 'vue';


export default {
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      series: [
        {
          name: "Desktops",
          data: [10, 8, 15, 5, 20, 10, 10, 19, 18], // Data dummy
        },
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
        },
        // title: {
        //   text: "Product Trends by Month",
        //   align: "left",
        // },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"], // Data dummy
        },
      },
    };
  },
};
</script>
