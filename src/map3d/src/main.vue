<template>
	<div class='mapBox'>
		<div :id='mapId'></div>
	</div>
</template>

<script type="text/babel">

  import { map } from "../../../lib/map3d.js";
  export default {
    name: 'JKMap3d',
    props: {
      mapId: {
        type: String,
        default: "map_baseMap",
      },
      load : {
        type : Function,
        default : new Function
      }
    },
    mounted() {
      this.map = new map(this.mapId);
      this.map.onloadMap(this.load);
    },
  };
</script>
<style>
	.mapBox,.mapBox > div { width: 100%; height: 100%; }	
</style>
