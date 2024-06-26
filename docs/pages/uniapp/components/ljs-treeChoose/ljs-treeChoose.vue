<template>
  <view class="ljs-tree">
    <view class="myInput" v-if="!multiple">
      <view @click="ljs_tree1Open" class="input" disabled>{{
        ljs_tree1.departmentName !== "" ? ljs_tree1.departmentName : "点击选择"
      }}</view>
    </view>
    <view class="myInput2" v-if="multiple">
      <view class="input" @click="ljs_tree2Open">
        <template v-if="ljs_tree2.chooseDatas.length > 0 && !departmentTag">
          <view class="one" v-for="(item, i) in ljs_tree2.chooseDatas" :key="i">
            <span v-for="(obj, j) in item" :key="j"
              >{{ obj[props.label]
              }}{{ j !== item.length - 1 ? "-" : "" }}</span
            >
          </view>
        </template>
        <template v-else>点击选择</template>
      </view>
    </view>
    <view class="ljs-tree-select" v-show="departmentTag">
      <view class="ljs-tree-select-box">
        <view class="ljs-tree-select-title">
          <text>{{ title }}</text>
          <view class="ljs-tree-select-closeBut" @click="close">
            <image
              class="ljs-tree-select-ico"
              :src="require('./images/ico_close.png')"
            ></image>
          </view>
        </view>
        <view class="ljs-tree-select-con">
          <input
            v-if="keywordsFilter"
            @input="KeywordFilter"
            v-model="search.key"
            class="ljs-tree-select-search"
            placeholder="输入关键字进行搜索"
          />
          <treeSelectOne
            :props="props"
            @getChooseValue="getValue"
            @openTagChange="openTagChange"
            :checkStrictly="checkStrictly"
            :multiple="multiple"
            :data="listData"
            :allData="listData"
            :chooseMode="chooseMode"
            :showAllLevels="showAllLevels"
          ></treeSelectOne>
        </view>
        <view class="ljs-tree-select-but">
          <button @click="save" class="ljs-tree-select-botton yes">
            {{ submitText }}
          </button>
          <button @click="close" class="ljs-tree-select-botton no">
            {{ cancelText }}
          </button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import treeSelectOne from "./treeSelectOne.vue";
import { getTreeParents, treeFilter } from "./base.js";

export default {
  data() {
    return {
      departmentTag: false,
      ljs_tree1: {
        departmentName: "",
      },
      ljs_tree2: {
        chooseDatas: [], // 数据集
      },

      chooseIds: [],
      chooseItems: [],
      listData: this.value,
      listDataFilterBackups: [],

      search: {
        timer: null,
        key: "",
      },
    };
  },
  props: {
    // 树（Tree）解构数据。
    value: Array,
    // 树（Tree），需要回显的数据，id的数组。注意multiple值需与回显值匹配。
    ids: {
      type: Array,
      default: function () {
        return [];
      },
    },
    // 是否严格的遵守父子节点不互相关联（true: 每一级都能选，false: 只能选最后一级）
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
    // 是否开启筛选模式
    keywordsFilter: {
      type: Boolean,
      default: false,
    },
    // 选择器标题
    title: {
      type: String,
      default: "部门选择",
    },
    // 确定按钮文字
    submitText: {
      type: String,
      default: "确定",
    },
    // 取消按钮文字
    cancelText: {
      type: String,
      default: "取消",
    },
    // 选择模式，默认line，勾选模式ico
    chooseMode: {
      type: String,
      default: "line",
    },
    // 是否只展示最后选中的数据
    isShowLast: {
      type: Boolean,
      default: false,
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
  components: {
    treeSelectOne,
  },
  watch: {
    // 弹窗打开后需要已选中的数据
    show: {
      handler(n) {
        this.showChooseResult();
      },
      deep: true,
    },
    // 弹窗打开后需要已选中的数据
    value: {
      handler(n) {
        this.init();
      },
      deep: true,
    },
    // 根据回显id集,回显数据
    ids: {
      handler(n) {
        this.showChooseResult();
      },
      deep: true,
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    // 关闭
    KeywordFilter() {
      if (this.search.timer !== null) {
        clearTimeout(this.search.timer);
      }
      this.search.timer = setTimeout(() => {
        this.getKeyword();
      }, 300);
    },
    getKeyword() {
      if (
        this.search.key === undefined ||
        this.search.key === null ||
        this.search.key === ""
      ) {
        this.listData = JSON.parse(JSON.stringify(this.listDataFilterBackups));
      } else {
        this.listData = treeFilter(this.props, this.listData, this.search.key);
      }
      this.showChooseResult();
    },

    // 关闭
    close() {
      this.departmentTag = false;
      this.search.key = "";
      this.getKeyword();
    },
    // 单选 - 打开
    ljs_tree1Open() {
      this.departmentTag = true;
      this.getKeyword();
    },
    // 多选 - 打开
    ljs_tree2Open() {
      this.departmentTag = true;
      this.getKeyword();
    },

    // 回显展示效果
    showChooseResult() {
      this.chooseIds = this.ids;
      this.chooseItems = [];
      // 单选
      if (!this.multiple) {
        this.changeValue(
          this.listData,
          JSON.parse(JSON.stringify(this.chooseIds))
        );
      } else {
        const chooseIds = JSON.parse(JSON.stringify(this.chooseIds));
        chooseIds.forEach((item) => {
          this.changeValue(this.listData, item);
        });
      }

      // 回显问题。
      if (this.chooseIds.length !== 0 && this.listData.length > 0) {
        if (!this.multiple) {
          const parents = getTreeParents(
            this.listData,
            this.ids[this.ids.length - 1],
            this.props.id,
            []
          );
          this.getDepartmentName(parents);
        }
        if (this.multiple) {
          const chooseDatas = [];
          this.chooseIds.forEach((item) => {
            const parents = getTreeParents(
              this.listData,
              item[item.length - 1],
              this.props.id,
              []
            );
            if (this.showAllLevels) {
              chooseDatas.push([parents]);
            } else {
              chooseDatas.push([parents[parents.length - 1]]);
            }
          });
          this.ljs_tree2.chooseDatas = chooseDatas;
        }
      }
    },
    // 推完整路径，解决小程序，展开后选中父节点自动收起问题。
    openTagChange(ids, openTag) {
      this.openTagDg(this.listData, ids[ids.length - 1], openTag);
    },
    // 递归改值
    // data：树数据
    // id：展开或收起的对象id
    // openTag：状态值
    openTagDg(data, id, openTag) {
      data.forEach((item, i) => {
        if (item[this.props.id] === id) {
          item.openTag = openTag;
        }

        if (item[this.props.children] !== undefined) {
          this.openTagDg(item[this.props.children], id, openTag);
        }
      });
    },
    // 选中的值
    save() {
      if (this.chooseIds.length > 0) {
        this.chooseItems = [];
        // 单选
        if (!this.multiple) {
          const item = this.chooseIds;
          const chooseItems = getTreeParents(
            this.listData,
            item[item.length - 1],
            this.props.id,
            []
          );
          if (this.showAllLevels) {
            this.chooseItems = chooseItems;
          } else {
            this.chooseItems.push(chooseItems[chooseItems.length - 1]);
          }
        } else {
          this.chooseIds.forEach((item, i) => {
            this.chooseItems.push([]);
            console.log(item);
            const chooseItems = getTreeParents(
              this.listData,
              item[item.length - 1],
              this.props.id,
              []
            );
            if (this.showAllLevels) {
              this.chooseItems[i].push(chooseItems);
            } else {
              this.chooseItems[i].push(chooseItems[chooseItems.length - 1]);
            }
          });
        }
        // 文本值
        if (!this.multiple) {
          this.getDepartmentName(this.chooseItems);
        }
        this.$emit(
          "getChooseValue",
          this.chooseIds,
          this.chooseItems,
          this.ljs_tree1.departmentName
        ); // 继续向上传递
        if (this.multiple) {
          this.ljs_tree2.chooseDatas = this.chooseItems;
        }
        this.close();
      } else {
        uni.showToast({
          title: "您还没有选择任何项目。",
          duration: 2000,
          icon: "none",
        });
      }
    },
    // 单选 得到选中的文本
    getDepartmentName(list) {
      if (this.isShowLast) {
        const chooseLastItems = list.at(-1);
        this.ljs_tree1.departmentName = chooseLastItems[this.props.label];
      } else {
        list.forEach((item, i) => {
          this.ljs_tree1.departmentName += item[this.props.label] + "-";
        });
        this.ljs_tree1.departmentName = this.ljs_tree1.departmentName.substring(
          0,
          this.ljs_tree1.departmentName.length - 1
        );
      }
    },
    // 获取tree选择的结果
    // ids的数组
    // oldChoose历史选中状态
    getValue(ids, oldChoose) {
      this.chooseItems = [];
      // 单选
      if (!this.multiple) {
        this.chooseIds = ids;
        this.changeValue(
          this.listData,
          JSON.parse(JSON.stringify(this.chooseIds))
        );
      } else {
        // 选中
        if (!oldChoose) {
          this.chooseIds.push(ids);
        } else {
          // 取消选中
          const nums = this.chooseIds.length;
          const tempids = ids.toString();
          let index = -1;
          for (let i = 0; i < nums; i++) {
            const temp = this.chooseIds[i].toString();
            if (temp === tempids) {
              index = i;
              break;
            }
          }
          if (index > -1) {
            this.chooseIds.splice(index, 1);
          }
        }
        this.multipleDataInit(this.listData);
        const chooseIds = JSON.parse(JSON.stringify(this.chooseIds));
        if (chooseIds.length === 0) {
          this.chooseItems = [];
        } else {
          chooseIds.forEach((item) => {
            const chooseItem = this.changeValue(this.listData, item, []);
            this.chooseItems.push(chooseItem);
          });
        }
      }
    },
    // 多选模式，一个都没选的重置
    multipleDataInit(data) {
      data.forEach((item, i) => {
        item.choose = false;
        if (item[this.props.children] !== undefined) {
          this.multipleDataInit(item[this.props.children]);
        }
      });
    },
    // 递归改值 - 只负责该值，不负责获取对象集
    // data：树数据
    // chooseIds：选择的树id数据集
    changeValue(data, chooseIds) {
      const nums = data.length;
      for (let i = 0; i < nums; i++) {
        const item = data[i];
        // 单选
        if (!this.multiple) {
          if (chooseIds[chooseIds.length - 1] === item[this.props.id]) {
            item.choose = true;
          } else {
            item.choose = false;
          }
        } else {
          if (chooseIds[chooseIds.length - 1] === item[this.props.id]) {
            item.choose = true;
          }
        }
        // 小程序选择bug优化。
        if (chooseIds[0] === item[this.props.id]) {
          chooseIds.splice(0, 1);
        }

        if (item[this.props.children] !== undefined) {
          this.changeValue(item[this.props.children], chooseIds);
        }
      }
    },
    // 初始化
    initValue(data) {
      data.forEach((item, i) => {
        item.choose = false;
        item.openTag = false;
        if (item[this.props.children] !== undefined) {
          item[this.props.children] = this.initValue(item[this.props.children]);
        }
      });
      return data;
    },
    init() {
      this.listData = JSON.parse(JSON.stringify(this.initValue(this.value)));
      this.showChooseResult();
      this.listDataFilterBackups = JSON.parse(JSON.stringify(this.listData));
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./ljs-treeChoose.scss";
</style>
