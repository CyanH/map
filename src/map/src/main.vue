<template>
  <div class="mapBox">
    <div :id="mapId"></div>
  </div>
</template>

<script type="text/babel">
import mapConfig from "../../../config/map.config.js";
import map from "../../../lib/map.js";
export default {
  name: "JKMap",
  props: {
    mapId: {
      type: String,
      default: "map_baseMap",
    },
    load: {
      type: Function,
      default: new Function()
    },
    mapParams: {
      type: Object,
      default: mapConfig
    },
  },

  mounted() {
    this.map = new map(this.mapId, this.mapParams);
    this.map.onloadMap(this.load);
  },

  methods: {
    getMap() {
      return this.map.map;
    },
  }
};
</script>
<style>
.mapBox,
.mapBox > div {
  width: 100%;
  height: 100%;
}
</style>
