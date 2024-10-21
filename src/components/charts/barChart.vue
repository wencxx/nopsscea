<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

const props = defineProps({
    labels: Array, 
    data: Array, 
    label: String
})

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const chartData = {
    labels: props.labels,
    datasets: [
        {
        backgroundColor: ['#b91c1c', '#1e3a8a'],
        data: props.data,
        borderWidth: 1
        }
    ],
}

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
                size: 14
            }
        },
    },
    devicePixelRatio: 4
}
</script>