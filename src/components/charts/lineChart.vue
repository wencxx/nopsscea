<template>
  <Line :data="chartData" :options="chartOptions" />
</template>

<script setup>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line } from 'vue-chartjs'
import { computed } from 'vue'

const props = defineProps({
  labels: Array, 
  data: Array, 
  label: String
})

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      label: props.label || 'Total #',
      backgroundColor: ['#1e3a8a'],
      data: props.data,
      borderWidth: 1,
      borderColor: '#1e3a8a', 
      backgroundColor: 'rgba(30, 58, 138, 0.3)',
      fill: true 
    }
  ]
}))

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: props.label || 'Total #',
      font: {
        size: 18, 
        weight: 'normal'
      },
      padding: {
        bottom: 15
      }
    },
    tooltip: {
      bodyFont: {
        size: 6
      }
    },
  },
  devicePixelRatio: 4
}
</script>
