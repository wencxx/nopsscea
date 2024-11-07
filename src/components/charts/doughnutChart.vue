<template>
    <Pie
        id="my-chart-id"
        :options="chartOptions"
        :data="chartData"
        class="!w-full aspect-square"
    />
</template>

<script setup>
import { defineProps } from 'vue'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js'
import { Pie } from 'vue-chartjs'

const props = defineProps({
    labels: Array, 
    data: Array, 
    label: String
})

ChartJS.register(ArcElement, Tooltip, Legend, Title)

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
            labels: {
                font: {
                    size: 18
                },
            }
        },
        title: {
            display: true,
            text: props.label || 'Total No.',
            font: {
                size: 20, 
                weight: 'light'
            },
            padding: {
                bottom: 15
            }
        },
        tooltip: {
            bodyFont: {
                size: 14
            }
        }
    }
}
</script>
