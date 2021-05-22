import { Chart, registerables } from 'chart.js';

var chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};

function randomScalingFactor() {
    return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
}

function onReceive(event) {
    window.myChart.config.data.datasets[event.index].data.push({
        x: event.timestamp,
        y: event.value
    });
    window.myChart.update('quiet');
}

var timeoutIDs = [];

function startFeed(index) {
    var receive = function() {
        onReceive({
            index: index,
            timestamp: Date.now(),
            value: randomScalingFactor()
        });
        timeoutIDs[index] = setTimeout(receive, Math.random() * 1000 + 500);
    };
    timeoutIDs[index] = setTimeout(receive, Math.random() * 1000 + 500);
}

function stopFeed(index) {
    clearTimeout(timeoutIDs[index]);
}

var color = "#000"
var config = {
    type: 'line',
    data: {
        datasets: [{
            label: 'Dataset 1 (linear interpolation)',
            backgroundColor: "red",
            borderColor: "red",
            fill: false,
            borderDash: [8, 4],
            data: []
        }, {
            label: 'Dataset 2 (cubic interpolation)',
            backgroundColor: "blue",
            borderColor: "blue",
            fill: false,
            cubicInterpolationMode: 'monotone',
            data: []
        }]
    },
    options: {
        scales: {
            x: {
                type: 'realtime',
                realtime: {
                    duration: 20000,
                    delay: 2000,
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'value'
                }
            }
        },
        interaction: {
            intersect: false
        },
        plugins: {
            title: {
                display: true,
                text: 'Push data feed sample'
            }
        }
    }
};

window.onload = function() {
    var ctx = document.getElementById('myChart').getContext('2d');
    window.myChart = new Chart(ctx, config);
    startFeed(0);
    startFeed(1);
};

document.getElementById('randomizeData').addEventListener('click', function() {
    config.data.datasets.forEach(function(dataset) {
        dataset.data.forEach(function(dataObj) {
            dataObj.y = randomScalingFactor();
        });
    });
    window.myChart.update();
});

var colorNames = Object.keys(chartColors);
document.getElementById('addDataset').addEventListener('click', function() {
    var colorName = colorNames[config.data.datasets.length % colorNames.length];
    var newColor = chartColors[colorName];
    var newDataset = {
        label: 'Dataset ' + (config.data.datasets.length + 1),
        backgroundColor: color(newColor).alpha(0.5).rgbString(),
        borderColor: newColor,
        fill: false,
        data: []
    };

    config.data.datasets.push(newDataset);
    window.myChart.update();
    startFeed(config.data.datasets.length - 1);
});

document.getElementById('removeDataset').addEventListener('click', function() {
    stopFeed(config.data.datasets.length - 1);
    config.data.datasets.pop();
    window.myChart.update();
});

document.getElementById('addData').addEventListener('click', function() {
    var now = Date.now();
    config.data.datasets.forEach(function(dataset) {
        dataset.data.push({
            x: now,
            y: randomScalingFactor()
        });
    });
    window.myChart.update();
});