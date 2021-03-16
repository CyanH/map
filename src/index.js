var vue_map = require('./map/index.js');
var vue_map3d = require('./map3d/index.js');

const components = [ vue_map, vue_map3d ]

const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

module.exports = {
	install 
}