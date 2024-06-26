<template>
  <view>
    <view class="ljs-tree-select-treeOne" v-for="(item, i) in data" :key="i">
      <view
        class="ljs-tree-select-treeOne-one"
        :class="{
          active: chooseMode === 'line' && item.choose,
          disabled: item.disabled,
        }"
        @click.stop="select(item)"
      >
        <template
          v-if="
            item[props.children] !== undefined
              ? item[props.children].length > 0
                ? true
                : false
              : false
          "
        >
          <image
            class="ljs-tree-select-treeOne-jt"
            @click.stop="open(item)"
            :src="
              require('./images/ico_jt_' + (!item.openTag ? 'r' : 'b') + '.png')
            "
          ></image>
        </template>
        <template v-else>
          <view class="ljs-tree-select-treeOne-null"></view>
        </template>
        <image
          v-if="chooseMode === 'ico' && item.choose"
          class="ljs-tree-select-treeOne-chooseTag"
          :src="require('./images/ico_choose.png')"
        >
        </image>
        <text class="ljs-tree-select-treeOne-label">{{
          item[props.label]
        }}</text>
      </view>
      <view
        class="ljs-tree-select-treeOne-children"
        v-if="item.openTag && item[props.children] !== undefined"
      >
        <treeSelectOne
          :props="props"
          @getChooseValue="getValue"
          @openTagChange="openTagChange"
          :data="item[props.children]"
          :allData="allData"
          :checkStrictly="checkStrictly"
          :multiple="multiple"
          :chooseMode="chooseMode"
          :showAllLevels="showAllLevels"
        ></treeSelectOne>
      </view>
    </view>
  </view>
</template>

<script>
import treeSelectOne from "./treeSelectOne.vue";
export default {
  name: "treeSelectOne",
  data() {
    return {};
  },
  props: {
    data: Array,
    allData: Array, // 完整的树数据
    // 是否严格的遵守父子节点不互相关联
    checkStrictly: {
      type: Boolean,
      default: false,
    },
    // 是否多选
    multiple: {
      type: Boolean,
      default: false,
    },
    // 是否返回完整路径数据集
    showAllLevels: {
      type: Boolean,
      default: true,
    },
    // 选择模式，默认line，勾选模式ico
    chooseMode: {
      type: String,
      default: "line",
    },
    // 配置选项，具体见下表
    props: {
      type: Object,
      default: function () {
        return {
          label: "label", // 指定选项的值为选项对象的某个属性值
          id: "id", // 指定选项的值为选项对象的某个属性值
          children: "children", // 指定选项的子选项为选项对象的某个属性值
        };
      },
    },
  },
  updated() {
    // console.log(this.data)
  },
  components: {
    treeSelectOne: treeSelectOne,
  },
  methods: {
    // 获取
    getValue(ids, oldChoose) {
      // 错误数据
      // ids.push(this.chooseValue.id);
      this.$emit("getChooseValue", ids, oldChoose); // 继续向上传递
    },
    openTagChange(ids, openTag) {
      this.$emit("openTagChange", ids, openTag);
    },
    // 打开下级菜单
    open(item) {
      const ids = this.findFid(this.allData, item[this.props.id], []);
      // 推完整路径，解决小程序，展开后选中父节点自动收起问题。
      this.$emit("openTagChange", ids, !item.openTag);
    },
    // 点击选中一级
    select(item) {
      if (item.disabled) {
        uni.showToast({
          title: "不可选择",
          duration: 2000,
          icon: "none",
        });
        return;
      }
      let tag = false;
      // 是否严格的遵守父子节点不互相关联
      if (this.checkStrictly) {
        tag = true;
      } else {
        if (
          !item[this.props.children] ||
          item[this.props.children].length === 0
        ) {
          tag = true;
        }
      }
      if (tag) {
        const ids = this.findFid(this.allData, item[this.props.id], []);
        // 是否返回完整路径数据集
        if (this.showAllLevels) {
          // 推完整路径
          this.$emit("getChooseValue", ids, item.choose);
        } else {
          // 只推当前层
          this.$emit("getChooseValue", [item[this.props.id]], item.choose);
        }
      }
    },
    // 通过选中的对象id获取其整个id的数据集，包括其所有的父级对象的id
    findFid(data, id, ids) {
      const nums = data.length;
      for (let i = 0; i < nums; i++) {
        if (data[i][this.props.id] === id) {
          ids.unshift(data[i][this.props.id]);
          return ids;
        }
        if (data[i][this.props.children] !== undefined) {
          ids = this.findFid(data[i][this.props.children], id, ids);
          if (ids.length > 0 && ids[ids.length - 1] === id) {
            ids.unshift(data[i][this.props.id]);
            return ids;
          }
        }
      }
      return ids;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./treeSelectOne.scss";
</style>
