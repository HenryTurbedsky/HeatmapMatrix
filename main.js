//import { Heatmrowap } from './HeatmapMatrix.mjs'
const Heatmap = require('./HeatmapMatrix');

var hm = new Heatmap(10,10,2);

hm.debug = false;
hm.heat(5,2,3);
hm.display();
