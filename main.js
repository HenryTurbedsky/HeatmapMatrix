const Heatmap = require('./HeatmapMatrix');

var hm = new Heatmap(9,9,2);

hm.debug = false;
hm.heat(5,4,4);
hm.display();
this.heatmap
