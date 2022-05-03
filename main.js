//const Heatmap = require('./HeatmapMatrix'); // For Node.js
import { Heatmap } from './HeatmapMatrix.mjs';

var width = 100, height = 100;
var rollOff = 1;

var heatmap = new Heatmap(width,height,rollOff);

heatmap.mergeType = heatmap.add;

for (var i = 0; i < 20; i++) {
  var heat = Math.floor(Math.random() * 40)+1
  var xPos = Math.floor(Math.random() * (width+1));
  var yPos = Math.floor(Math.random() * (height+1))
  heatmap.heat( heat, xPos, yPos);
}

var myPlot = document.getElementById('myDiv');

var colorscaleValue = [
  [0, '#0055AA'],
  [0.6, '#FF0000'],
  [0.8, '#FFAA00'],
  [0.90, '#FFFF00'],
  [0.93, '#FFFFFF'],
  [1, '#FFFFFF'],
];
var layout = {
  width: 1500,
  height: 1500,
  autosize: true,
  showlegend: false,
};


updatePlot();

function updatePlot(){
  var data = [{
    z: heatmap.heatmap,
    type: 'heatmap',
    colorscale: colorscaleValue,
  }];
  Plotly.newPlot('myDiv', data, layout,{staticPlot: false, editable: false, displayModeBar: true,});

  myPlot = document.getElementById('myDiv');

  myPlot.on('plotly_click', function(data){
      heatmap.heat( prompt("Heat:", 10), data.points[0].x, data.points[0].y);
      updatePlot();
  });
}
