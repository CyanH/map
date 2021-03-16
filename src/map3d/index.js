let Map = require('./src/main');
if( Map.default ) Map = Map.default;
/* istanbul ignore next */
Map.install = function(Vue) {
  Vue.component(Alert.name, Alert);
};

module.exports = Map;

