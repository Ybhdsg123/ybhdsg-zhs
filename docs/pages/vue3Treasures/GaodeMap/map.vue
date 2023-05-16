<!--
  描述：拖放地图组件，默认尺寸是 500 * 300
  接收属性参数：
    lat: 纬度
    lng: 经度
  自定义事件：
    drag: 拖放完成事件
  示例：
    <mapDrag @drag="dragMap" lat="22.574405" lng="114.095388" />
-->
<template>
  <div class="m-map">
    <div class="search" v-if="placeSearch">
      <el-input
        placeholder="请输入关键字"
        v-model.trim="searchKey"
        @keyup.enter.native="handleSearch"
      >
        <el-button slot="append" @click="handleSearch">搜索</el-button>
      </el-input>
      <div :id="resultId" v-show="searchKey" class="result"></div>
    </div>
    <div :id="containerId" class="map">正在加载地图...</div>
  </div>
</template>

<script>
// import remoteLoad from '@/utils/remoteLoad'
export default {
  props: ["lat", "lng"],
  data() {
    return {
      MapKey: "67b921252e9029839ec9ade6f87cb2aa", // 高德key
      MapCityName: "", // 限制搜索城市 例如：杭州
      containerId: "js-container-" + new Date().getTime(), // 地图容器id
      resultId: "js-result-" + new Date().getTime(), // 搜索容器id
      searchKey: "", // 搜索内容
      placeSearch: null,
      dragStatus: false,
      AMapUI: null,
      AMap: null,
    };
  },
  watch: {
    searchKey() {
      if (this.searchKey === "") {
        this.placeSearch.clear();
      }
    },
  },
  methods: {
    clearMap() {
      this.searchKey = "";
    },
    handleSearch() {
      // 搜索
      if (this.searchKey) {
        this.placeSearch.search(this.searchKey);
      }
    },
    // 实例化地图
    initMap() {
      // 加载PositionPicker，loadUI的路径参数为模块名中 'ui/' 之后的部分
      let AMapUI = (this.AMapUI = window.AMapUI);
      let AMap = (this.AMap = window.AMap);
      AMapUI.loadUI(["misc/PositionPicker"], (PositionPicker) => {
        let mapConfig = {
          zooms: [16, 18],
          zoom: 18,
          cityName: this.MapCityName,
        };
        if (this.lat && this.lng) {
          mapConfig.center = [this.lng, this.lat];
        }
        let map = new AMap.Map(this.containerId, mapConfig);
        // 加载地图搜索插件
        AMap.service("AMap.PlaceSearch", () => {
          this.placeSearch = new AMap.PlaceSearch({
            pageSize: 5,
            pageIndex: 1,
            citylimit: true,
            city: this.MapCityName,
            map: map,
            panel: this.resultId,
          });
        });
        // 启用工具条、获取当前定位
        AMap.plugin(["AMap.ToolBar", "AMap.Geolocation"], () => {
          map.addControl(
            new AMap.ToolBar({
              position: "RB",
            })
          );
          if (!this.lat && !this.lng) {
            // 没有经纬度主动定位
            let geolocation = new AMap.Geolocation({
              timeout: 6000,
              GeoLocationFirst: false,
            });
            map.addControl(geolocation);
            geolocation.getCurrentPosition();
          }
        });
        // 创建地图拖拽
        let positionPicker = new PositionPicker({
          mode: "dragMap", // 设定为拖拽地图模式，可选'dragMap'、'dragMarker'，默认为'dragMap'
          map: map, // 依赖地图对象
        });
        // 拖拽完成发送自定义 drag 事件
        positionPicker.on("success", (positionResult) => {
          // 过滤掉初始化地图后的第一次默认拖放
          if (!this.dragStatus) {
            this.dragStatus = true;
          } else {
            this.$emit("drag", positionResult);
          }
        });
        // 启动拖放
        positionPicker.start();
      });
    },
  },
  async created() {
    // 已载入高德地图API，则直接初始化地图
    // if (window.AMap && window.AMapUI) {
    //   this.initMap()
    // }
    // 未载入高德地图API，则先载入API再初始化，生产环境被浏览器禁止，转为 index.html 主动加载
    // 在 index.html 里面加入下面两个链接
    // } else {
    //   await remoteLoad(`https://webapi.amap.com/maps?v=1.3&key=${this.MapKey}`)
    //   await remoteLoad('https://webapi.amap.com/ui/1.0/main.js')
    //   this.initMap()
    // }
  },
};
</script>

<style lang="less">
.m-map {
  min-width: 500px;
  min-height: 300px;
  position: relative;
  .map {
    width: 100%;
    height: 100%;
  }
  .search {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 285px;
    z-index: 1;
  }
  .result {
    max-height: 300px;
    overflow: auto;
    margin-top: 10px;
  }
}
</style>
