<template>
  <view class="content">
    <view class="title">单选(带数据回显)：</view>
    <ljs-treeChoose
      v-model="ljs_tree1.department"
      :ids="ljs_tree1.chooseIds"
      :props="ljs_tree1.props"
      :keywordsFilter="true"
      @getChooseValue="ljs_tree1GetChooseValue"
    >
    </ljs-treeChoose>

    <view class="title">多选，返回最后一级路径：</view>
    <ljs-treeChoose
      v-model="ljs_tree2.department"
      :ids="ljs_tree2.chooseIds"
      :multiple="ljs_tree2.multiple"
      :showAllLevels="ljs_tree2.showAllLevels"
      @getChooseValue="ljs_tree2GetChooseValue"
    >
    </ljs-treeChoose>

    <view class="title">单选，任意级都可选：</view>
    <ljs-treeChoose
      v-model="ljs_tree3.department"
      :ids="ljs_tree3.chooseIds"
      :checkStrictly="ljs_tree3.checkStrictly"
      chooseMode="ico"
      @getChooseValue="ljs_tree3GetChooseValue"
    >
    </ljs-treeChoose>
    <!-- <view @click="go()" class="but">nvue Dome</view> -->
  </view>
</template>

<script>
export default {
  data() {
    return {
      ljs_tree1: {
        department: [],
        chooseIds: [100, 101, 103], // 选择tree的id数据结果集合
        props: { label: "name", id: "value", children: "children" },
      },
      ljs_tree2: {
        departmentTag: false,
        department: [],
        multiple: true, // 是否多选
        showAllLevels: false, // 是否返回完整路径数据集
        chooseIds: [[103], [104]], // 选择tree的id数据结果集合
      },
      ljs_tree3: {
        departmentTag: false,
        department: [],
        departmentName: "",
        checkStrictly: true, // 任意级都可选
        chooseIds: [100, 101], // 选择tree的id数据结果集合
      },
    };
  },
  onLoad() {
    // 原始数据
    setTimeout(() => {
      this.ljs_tree1.department = [
        {
          value: 100,
          name: "九山科技",
          type: null,
          children: [
            {
              value: 101,
              name: "深圳总公司",
              type: null,
              children: [
                { value: 103, name: "研发部门", disabled: true, type: null },
                { value: 104, name: "市场部门", type: null },
                { value: 105, name: "测试部门", type: null },
                { value: 106, name: "财务部门", type: null },
                { value: 107, name: "运维部门", type: null },
              ],
            },
            {
              value: 102,
              name: "长沙分公司",
              type: null,
              children: [
                { value: 108, name: "市场部门", type: null },
                { value: 109, name: "财务部门", type: null },
              ],
            },
            { value: 200, name: "西安分公司", type: null, children: [] },
          ],
        },
      ];
    }, 1000);
    // this.ljs_tree1.department = [{"value":100,"name":"九山科技","type":null,"children":[{"value":101,"name":"深圳总公司","type":null,"children":[{"value":103,"name":"研发部门","disabled":true,"type":null,},{"value":104,"name":"市场部门","type":null,},{"value":105,"name":"测试部门","type":null,},{"value":106,"name":"财务部门","type":null,},{"value":107,"name":"运维部门","type":null,}],},{"value":102,"name":"长沙分公司","type":null,"children":[{"value":108,"name":"市场部门","type":null,},{"value":109,"name":"财务部门","type":null,}],},{"value":200,"name":"西安分公司","type":null,"children":[{"value":202,"name":"人事部","type":null,},{"value":201,"name":"研发部","type":null,}],}],}];
    // 原始数据
    setTimeout(() => {
      this.ljs_tree2.department = [
        {
          id: 100,
          label: "九山科技",
          disabled: false,
          type: null,
          children: [
            {
              id: 101,
              label: "深圳总公司",
              disabled: false,
              type: null,
              children: [
                { id: 103, label: "研发部门", disabled: false, type: null },
                { id: 104, label: "市场部门", disabled: false, type: null },
                { id: 105, label: "测试部门", disabled: false, type: null },
                { id: 106, label: "财务部门", disabled: false, type: null },
                { id: 107, label: "运维部门", disabled: false, type: null },
              ],
            },
            {
              id: 102,
              label: "长沙分公司",
              disabled: false,
              type: null,
              children: [
                { id: 108, label: "市场部门", disabled: false, type: null },
                { id: 109, label: "财务部门", disabled: false, type: null },
              ],
            },
            {
              id: 200,
              label: "西安分公司",
              disabled: false,
              type: null,
              children: [
                { id: 202, label: "人事部", disabled: false, type: null },
                { id: 201, label: "研发部", disabled: false, type: null },
              ],
            },
          ],
        },
      ];
    }, 3000);
    // this.ljs_tree2.department = [{"id":100,"label":"九山科技","disabled":false,"type":null,"children":[{"id":101,"label":"深圳总公司","disabled":false,"type":null,"children":[{"id":103,"label":"研发部门","disabled":false,"type":null},{"id":104,"label":"市场部门","disabled":false,"type":null},{"id":105,"label":"测试部门","disabled":false,"type":null},{"id":106,"label":"财务部门","disabled":false,"type":null},{"id":107,"label":"运维部门","disabled":false,"type":null}]},{"id":102,"label":"长沙分公司","disabled":false,"type":null,"children":[{"id":108,"label":"市场部门","disabled":false,"type":null},{"id":109,"label":"财务部门","disabled":false,"type":null}]},{"id":200,"label":"西安分公司","disabled":false,"type":null,"children":[{"id":202,"label":"人事部","disabled":false,"type":null},{"id":201,"label":"研发部","disabled":false,"type":null}]}]}];
    // 原始数据
    this.ljs_tree3.department = [
      {
        id: 100,
        label: "九山科技",
        disabled: false,
        type: null,
        children: [
          {
            id: 101,
            label: "深圳总公司",
            disabled: false,
            type: null,
            children: [
              { id: 103, label: "研发部门", disabled: false, type: null },
              { id: 104, label: "市场部门", disabled: false, type: null },
              { id: 105, label: "测试部门", disabled: false, type: null },
              { id: 106, label: "财务部门", disabled: false, type: null },
              { id: 107, label: "运维部门", disabled: false, type: null },
            ],
          },
          {
            id: 102,
            label: "长沙分公司",
            disabled: false,
            type: null,
            children: [
              { id: 108, label: "市场部门", disabled: false, type: null },
              { id: 109, label: "财务部门", disabled: false, type: null },
            ],
          },
          {
            id: 200,
            label: "西安分公司",
            disabled: false,
            type: null,
            children: [
              { id: 202, label: "人事部", disabled: false, type: null },
              { id: 201, label: "研发部", disabled: false, type: null },
            ],
          },
        ],
      },
    ];
  },
  methods: {
    // 单选 - 获取
    // ids: 集合
    // items: 节点对象集合
    ljs_tree1GetChooseValue(ids, items) {
      console.log(ids, items);
      this.ljs_tree1.chooseIds = ids;
    },

    // 多选 - 获取
    // ids: 集合
    // items: 节点对象集合
    ljs_tree2GetChooseValue(ids, items) {
      console.log(ids, items);
      this.ljs_tree2.chooseIds = ids;
    },

    // 单选，任意级都可选 - 获取
    // ids: 集合
    // items: 节点对象集合
    ljs_tree3GetChooseValue(ids, items) {
      console.log(ids, items);
      this.ljs_tree3.chooseIds = ids;
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  padding: 30upx 30upx 0 30upx;
}
</style>
