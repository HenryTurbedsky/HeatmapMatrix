const Heatmap = require('./HeatmapMatrix');

var heatmap = new Heatmap(10,10,1);

heatmap.debug = false;

heatmap.mergeType = heatmap.add;

heatmap.heat(7, 3, 12);
heatmap.heat(4, 4, 3);

heatmap.display();
