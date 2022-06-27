<template>
    <div class="curve-cell cell">
        <h1>{{ title }}</h1>
        <canvas id="graph"></canvas>
        <span>{{ subtitle }}</span>
    </div>
</template>

<script>
import Vue from 'vue'
import Chart from 'chart.js'

export default Vue.extend({
    data() {
        return {
            chart: null
        }
    },
    props: {
        points: {type:Array, default:()=>[]},
        title: {type:String, default:""},
        legend: {type:String, default:""},
        subtitle: {type:String, default:""}
    },
    mounted() {
        this.update();
        window.updateChart = this.update;
    },
    watch: {
        points: function() {
            this.update();
        },
        legend: function() {
            this.update();
        }
    },
    methods: {
        update() {
            this.chart = new Chart(document.getElementById("graph").getContext("2d"), {
                type: "line",
                data: {
                    datasets: [{
                        label: '$',
                        data: this.points,
                        borderColor: "#fff",
                        borderWidth: 2,
                        pointRadius: 0
                    }],
                    indexAxis: "x",
                },
                options: {
                    title: {
                        display: this.legend,
                        text: this.legend
                    },
                    scales: {
                        xAxes: [{
                            type: "time",
                            time: {
                                unit: "day",
                                displayFormats: {
                                    day: 'D MMM'
                                },
                                tooltipFormat: "D MMM YYYY"
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                //beginAtZero: true,
                                stepSize: Math.max(...this.points.map(e=>e.y))/2
                            }
                        }]
                    },
                    legend: {
                        display: false
                    },
                    tooltips: {
                        callbacks: {
                            label: function(tooltipItem, data) {
                                var label = data.datasets[tooltipItem.datasetIndex].label || '';
                                label += Math.round(tooltipItem.yLabel * 100) / 100;
                                return label;
                            }
                        }
                    }
                }
            });
        }
    }
});
</script>

<style>
.curve-cell {
    color: #fff;
    padding: 1.5rem 10%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.curve-cell h1 {
    font-size: 1.2em;
}
</style>