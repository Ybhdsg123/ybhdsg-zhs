<template>
  <div class="search-box">
    <input
      style="width: 100%"
      placeholder="输入岗位名称搜索"
      v-model="job_name"
      @focus="focusHandler"
      @blur="blurHandler"
      :disabled="disabled"
      v-debounceDir:[event]="iptHandler"
      ref="iptRef"
    />
    <div
      class="search-suggestions"
      ref="searchContentRef"
      style="transform: scale(0, 0)"
    >
      <!-- 所有数据 -->
      <div v-if="data.length > 0 && job_name === ''" class="search-content">
        <div class="left" ref="leftRef">
          <span
            :class="[index === activeIndex ? 'left-item' : '']"
            v-for="(obj, index) in data"
            :key="obj.id"
            @mouseenter="mouseenterHandler(index)"
            @click="selected(obj)"
          >
            {{ obj.name }}
          </span>
        </div>
        <div class="right">
          <span
            class="left-item"
            v-for="(obj, index) in content"
            :key="obj.id"
            @click="selected(obj)"
          >
            {{ obj.name }}
          </span>
        </div>
      </div>
      <!-- 模糊搜索数据 -->
      <div v-if="fuzeyData.length > 0 && job_name !== ''" class="fuzey-data">
        <span
          class="fuzey-data-item"
          v-for="obj in fuzeyData"
          :key="obj.job_id"
          @click="selected(obj)"
          >{{ obj.name }}</span
        >
      </div>
      <!-- 没有数据时 -->
      <div
        class="no-data"
        v-show="
          data.length === 0 || (job_name !== '' && fuzeyData.length === 0)
        "
      >
        暂无数据
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect, watch, nextTick } from "vue";
import { fuzzySearchBykeyword } from "../tools/tool";

// props
const props = defineProps({
  // 数据
  data: {
    type: Array,
    default: () => [],
  },
  // 模糊搜索的延时时间
  delayTime: {
    type: Number,
    default: 300,
  },
  // 默认值
  defaultValue: {
    type: String,
    default: "",
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false,
  },
});

// 延时指令的参数
const event = {
  time: props.delayTime,
  event: "input",
};

// 防抖指令
const vDebounceDir = {
  onMounted(el, binding) {
    const args = binding.arg;
    if (!args) {
      throw Error('请传入类似于{time:1000,event:"click"}格式的指令参数');
    }
    // 注册点击事件，传入 binding.value => onClick，和延时时间 args.arg
    el.addEventListener(args.event, debounce(binding.value, args.time));
  },
};

// emits
const emits = defineEmits(["selectedJob"]);

// ref
const searchContentRef = ref(null);
const iptRef = ref(null);

//获取整个容器高度 以左边容器为主
const height = ref();

// 显示的名称
const job_name = ref(props.defaultValue);

// 当前活动的tab
const activeIndex = ref(0);

// 所有数据时 右边内容 默认数组第一条子节点
const content = ref([]);

watch(
  () => props.defaultValue,
  (newValue) => {
    job_name.value = props.defaultValue;
  },
  { immediate: true }
);

// 获取所有的模糊搜索数据
const fuzzySearchData = [];
const getAllFuzzySearchData = (data) => {
  data.forEach((obj) => {
    if (obj.child && obj.child.length > 0) {
      getAllFuzzySearchData(obj.child);
    }
    fuzzySearchData.push({ name: obj.name, job_id: obj.job_id });
  });
};
getAllFuzzySearchData(props.data);

// 获取模糊搜索结果
const fuzeyData = ref([]);
// 防抖指令进行防抖设置
const iptHandler = () => {
  if (job_name.value !== "") {
    fuzeyData.value = fuzzySearchBykeyword(job_name.value, fuzzySearchData);
  }
};

// 选中的数据发送出去
const selected = (obj) => {
  job_name.value = obj.name;
  emits("selectedJob", obj);
  // 选中数据时 将展示框缩小
  blurHandler();
};

// 搜索框聚焦时
const focusHandler = () => {
  iptHandler(); // 聚焦时搜索一下当前文本框内容
  content.value = props.data[0]?.child; // 默认右边内容为第一个
  height.value = searchContentRef.value.offsetHeight + "px"; // 获取整个容器高度
  searchContentRef.value.style.transform = " scale(1,1)";
};

// 搜索框失去焦点时
const blurHandler = () => {
  if (job_name.value !== "") {
    // 缩小到 0 太快，有可能数据没选中之前已失去焦点，导致数据无法选中，所以判断一下当前是否有值
    searchContentRef.value.style.transform = "scale(0, 0)";
  }
};

// 总的数据时---滑动切换右边内容
const mouseenterHandler = (index) => {
  activeIndex.value = index;
  content.value = props.data[index].child;
};

// 清空选中的值
const clearSelected = () => (job_name.value = "");

defineExpose({
  clearSelected,
});
</script>

<style lang="scss" scoped>
$bg-color: #f2f2f2;
$color: #409eff;
// 模糊数据
$fd-bd-color: #ecf5ff; // border
$fd-bg-color: #d9ecff; // bg
.search-box {
  width: 300px;
  position: relative;
}
.search-suggestions {
  position: absolute;
  z-index: 999;
  transform-origin: top left; // 变换的中心
  transition: transform 0.6s;
  width: 100%;
  height: v-bind(height);
}

// 没有数据时
.no-data {
  background-color: #fff;
  text-align: center;
}

// 模糊搜索时
.fuzey-data {
  display: flex;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 10px;
  height: auto;
  max-height: 100%;
  // overflow: scroll;
  overflow-x: hidden;
  overflow-y: scroll;
  // 修改滚动条样式 大小
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  // 滚动条样式
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #888;
  }
  // 轨道
  &::-webkit-scrollbar-track {
    border-radius: 10px;

    /*滚动条里面轨道*/
    // box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
  }

  .fuzey-data-item {
    padding: 0px 9px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    margin: 6px;
    background-color: $fd-bg-color;
    border: 1px solid $fd-bd-color;
    font-size: 12px;
    color: $color;
    cursor: pointer;
  }
}

// 所有数据
.search-content {
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #fff;

  .left,
  .right {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex: 1;
    height: 100%;
    cursor: pointer;
  }
  .right {
    background-color: $bg-color;
    padding-left: 20px;
    margin-left: auto;
    overflow-x: hidden;
    overflow-y: scroll;
    // 修改滚动条样式 大小
    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    // 滚动条样式
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: #888;
    }
    // 轨道
    &::-webkit-scrollbar-track {
      border-radius: 10px;

      /*滚动条里面轨道*/
      // box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
    }
  }
  .left-item {
    max-height: 100px;
    background-color: $bg-color;
    color: #666;
  }
  .left-item:hover {
    color: black;
  }
}
</style>
