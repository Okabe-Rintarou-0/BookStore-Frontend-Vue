<template>
    <ECharts :option="option" />
</template>

<script setup>
import "echarts";
import { defineProps } from 'vue';
import ECharts from 'vue-echarts'
const props = defineProps({
    books: Array
});

const option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    xAxis: {
        type: 'category',
        data: props.books.map(book => book.title),
        axisLabel: {
            interval: 0,
            formatter: title => title.length > 10 ? title.slice(0, 8) + '...' : title
        }
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            data: props.books.map(book => book.sales),
            type: 'bar'
        }
    ]
};
</script>