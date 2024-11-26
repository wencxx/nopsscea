<template>
    <Pie
        id="my-chart-id"
        :options="chartOptions"
        :data="chartData"
        class="!w-full aspect-square"
    />
</template>

<script setup>
import { defineProps, computed } from 'vue'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { Pie } from 'vue-chartjs'

const props = defineProps({
    labels: Array,
    data: Array,
    label: String
})

// Register the necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels)

const chartData = computed(() => ({
    labels: props.labels,
    datasets: [
        {
            backgroundColor: ['#b91c1c', '#1e3a8a'],
            data: props.data,
            borderWidth: 1
        }
    ]
}));

const chartOptions = {
    responsive: true,
    plugins: {
        legend: {
            labels: {
                font: {
                    size: 17
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
            callbacks: {
                label: function(tooltipItem) {
                    const dataset = tooltipItem.dataset.data;
                    const currentValue = dataset[tooltipItem.dataIndex];
                    const total = dataset.reduce((sum, value) => sum + value, 0);
                    const percentage = ((currentValue / total) * 100).toFixed(2);
                    return `${tooltipItem.label}: ${currentValue} (${percentage}%)`;
                }
            },
            bodyFont: {
                size: 14
            }
        },
        datalabels: {
            formatter: (value, context) => {
                const total = context.dataset.data.reduce((sum, val) => sum + val, 0);
                const percentage = ((value / total) * 100).toFixed(2);
                return `${percentage}%`;
            },
            color: '#fff',
            font: {
                size: 14,
                weight: 'bold'
            },
            anchor: 'center',
            align: 'center'
        }
    }
}
</script>
