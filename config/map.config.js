module.exports = {
  initJs: "http://cp.e-jiankun.com/arcgis_js_api/init.js",
  initCss: "http://cp.e-jiankun.com/esri/css/esri.css",
  layersType: "yxt",
  modules: [
    "esri/geometry/geometryEngine",
    "esri/map",
    "esri/graphic",
    "esri/Color",
    "esri/layers/TiledMapServiceLayer",
    "esri/SpatialReference",
    "esri/geometry/Extent",
    "esri/layers/WebTiledLayer",
    "esri/layers/TileInfo",
    "esri/geometry/Point",
    "esri/geometry/Polygon",
    "esri/geometry/Circle",
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/PictureMarkerSymbol",
    "esri/graphic",
    "esri/layers/GraphicsLayer",
    "esri/toolbars/edit",
    "esri/toolbars/draw",
    "dojo/_base/declare",
    "esri/layers/TiledMapServiceLayer",
    "esri/dijit/OverviewMap",
    "dojo/domReady!"
  ],
  mapParam: {
    slider: false,
    slidePosition: "bottom-right"
  }
};
