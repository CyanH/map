import {
  loadCss,
  loadModules
} from "esri-loader";
import eventBox from "./event.js";
/**
 * 地图类
 * @date 2020-03-13
 * @param {any} id
 * @param {any} param
 * @returns {any}
 */
class map {

  /**
   * 构造函数
   * @constructor
   * @date 2020-03-13
   * @param {string} id 创建map对象的dom.id
   * @param {json} param 配置参数
   * @returns {Map} 返回地图对象
   */
  constructor(id, param) {
    this.id = id;
    // 地图实例
    this.map = null;
    // 配置参数
    this.param = param || {};
    // 图层类型
    this.layersType = param.layersType;
    // 预加载资源
    this.gisConstructor = [];
    // 地图完成之后
    this.onloadMap = new eventBox();
    // 创建底图
    this.createMap(id, param);
    return this;
  }

  /**
   * 创建地图实例入口
   * @date 2020-03-13
   * @param {string} id 创建map对象的dom.id
   * @param {json} param 配置参数
   */
  createMap(id, param) {
    // 初始化加载地图资源
    this.init(param);
  }

  /**
   * 开始加载地图所需要用的资源
   * @date 2020-03-13
   * @param {any} param
   * @returns {any}
   */
  init(param) {
    // 加载css;
    loadCss(param.initCss)
    // 加载模块
    loadModules(param.modules || [], {
      url: param.initJs
    }).then(this.TDTinstance.bind(this)).
    then(this.initMap.bind(this));
  }

  /**
   * 处理加载资源
   * @date 2020-03-13
   * @param {any} args
   * @returns {any}
   */
  TDTinstance(args) {
    for (const k in args) {
      const name = this.param.modules[k].split('/').pop();
      if (name === "geometryEngine") {
        esri.geometry.geometryEngine = args[k];
      }
      this.gisConstructor[name] = args[k];
    }
  }

  /**
   * 加载资源完毕对地图进行初始化
   * @date 2020-03-13
   * @returns {any}
   */
  initMap() {
    var param = {
      logo: false,
      slider: true,
    }
    var json = (this.param.mapParam || {});
    for (var i in json) {
      param[i] = json[i];
    }
    this.map = new esri.Map(this.id, param);
    // if(  !window.map || !window.map.addLayer ) window.map = this.map;
    this.createBase(this.param.baseMap);
    var key = setInterval(() => {
      if (this.map.loaded === true) {
        clearInterval(key)
        this.onloadMap(this.map);
      }
    }, 300)
  }

  /**
   * 生成底图
   * @date 2020-03-13
   * @param {string} url
   * @returns {any}
   */
  createBase(url) {
    var layer = null;
    if (this.layersType == 'gg') {
      layer = this.createGgLayer();
    } else if (this.layersType == 'yxt') {
      this.createYxtLayer()
    } else if (this.layersType == 'dy') {
      layer = new esri.layers.ArcGISDynamicMapServiceLayer(url || __config.baseMap, {
        id: "basemap"
      });
    } else {
      layer = new esri.layers.ArcGISTiledMapServiceLayer(url || __config.baseMap, {
        id: "basemap"
      });
    }
    if (layer) this.map.addLayer(layer);
  }

  /**
   * 生成谷歌底图
   * @date 2020-03-16
   * @returns {layers} GoogleMapLayer
   */
  createGgLayer() {
    typeof GoogleMapLayer !== "undefined" || dojo.declare('GoogleMapLayer', esri.layers.TiledMapServiceLayer, { // create WMTSLayer by extending esri.layers.TiledMapServiceLayer
      constructor: function () {
        this.spatialReference = new esri.SpatialReference({
          wkid: 102113
        })
        this.fullExtent = new esri.geometry.Extent(-20037508.342787, -20037508.342787, 20037508.342787, 20037508.342787, this.spatialReference)
        // this.initialExtent = new esri.geometry.Extent(11501488.165446503, 3695866.152885527, 11678516.32295504, 3728734.075048165, this.spatialReference)
        this.initialExtent = new esri.geometry.Extent(14618082.998191215, 10704507.149991233, 4098580.096440325, 2374160.7383272075, this.spatialReference)
        this.tileInfo = new esri.layers.TileInfo({
          'spatialReference': {
            'wkid': '3857'
          },
          'rows': 256,
          'cols': 256,
          'origin': {
            'x': -20037508.342787,
            'y': 20037508.342787
          },
          'lods': [{
            'level': 0,
            'scale': 591657527.591555,
            'resolution': 156543.033928
          }, {
            'level': 1,
            'scale': 295828763.795777,
            'resolution': 78271.5169639999
          }, {
            'level': 2,
            'scale': 147914381.897889,
            'resolution': 39135.7584820001
          }, {
            'level': 3,
            'scale': 73957190.948944,
            'resolution': 19567.8792409999
          }, {
            'level': 4,
            'scale': 36978595.474472,
            'resolution': 9783.93962049996
          }, {
            'level': 5,
            'scale': 18489297.737236,
            'resolution': 4891.96981024998
          }, {
            'level': 6,
            'scale': 9244648.868618,
            'resolution': 2445.98490512499
          }, {
            'level': 7,
            'scale': 4622324.434309,
            'resolution': 1222.99245256249
          }, {
            'level': 8,
            'scale': 2311162.217155,
            'resolution': 611.49622628138
          }, {
            'level': 9,
            'scale': 1155581.108577,
            'resolution': 305.748113140558
          }, {
            'level': 10,
            'scale': 577790.554289,
            'resolution': 152.874056570411
          }, {
            'level': 11,
            'scale': 288895.277144,
            'resolution': 76.4370282850732
          }, {
            'level': 12,
            'scale': 144447.638572,
            'resolution': 38.2185141425366
          }, {
            'level': 13,
            'scale': 72223.819286,
            'resolution': 19.1092570712683
          }, {
            'level': 14,
            'scale': 36111.909643,
            'resolution': 9.55462853563415
          }, {
            'level': 15,
            'scale': 18055.954822,
            'resolution': 4.77731426794937
          }, {
            'level': 16,
            'scale': 9027.977411,
            'resolution': 2.38865713397468
          }, {
            'level': 17,
            'scale': 4513.988705,
            'resolution': 1.19432856685505
          }, {
            'level': 18,
            'scale': 2256.994353,
            'resolution': 0.597164283559817
          }, {
            'level': 19,
            'scale': 1128.497176,
            'resolution': 0.298582141647617
          }]
        })
        this.loaded = true
        this.onLoad(this)
      },
      getTileUrl: function (level, row, col) {
        var url = 'http://mt0.google.cn/vt/lyrs=s,h&hl=zh-CN&gl=cn&' +
          'x=' + col + '&' +
          'y=' + row + '&' +
          'z=' + level + '&s='
        return url
      }
    })
    return new GoogleMapLayer()
  }


  /**
   * 生成天地影像图
   * @date 2020-12-16
   * @returns {layers} mapLayer
   */
  createYxtLayer() {
    var tiandituBaseUrl = "http://{subDomain}.tianditu.gov.cn"; //天地图服务地址
    var token = "f04ece8bf0ff9c1117526a29a96bb2e1"; //天地图token
    // 矢量地图
    var vecLayer = esri.layers.WebTiledLayer(
      tiandituBaseUrl + '/img_w/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=img&STYLE=default&FORMAT=tiles&TILEMATRIXSET=w&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=' + token, {
        subDomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7']
      })

    var labelLayer = esri.layers.WebTiledLayer(
      tiandituBaseUrl + '/cia_w/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=cia&STYLE=default&FORMAT=tiles&TILEMATRIXSET=w&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=' + token, {
        subDomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7']
      })
    // 矢量注记图层
    this.map.addLayer(vecLayer)
    this.map.addLayer(labelLayer)
  }
}



export default map