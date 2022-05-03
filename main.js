//import { Heatmrowap } from './HeatmapMatrix.mjs'
const Heatmap = require('./HeatmapMatrix');

var hm = new Heatmap(10,10,2);

hm.debug = true;
hm.quarterToFull(hm.addHeat(10,5,5));
