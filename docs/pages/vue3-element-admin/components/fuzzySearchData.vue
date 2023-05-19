<template>
  <div class="search-box">
    <input
      style="width: 100%"
      placeholder="输入岗位名称搜索"
      v-model="job_name"
      @focus="focusHandler"
      @blur="searchContentRef.style.transform = 'scale(0, 0)'"
      v-debounceDir:[event]="iptHandler"
      :disabled="disabled"
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
import { ref, watchEffect, nextTick } from "vue";
import { fuzzySearchBykeyword, debounce } from "../tools/tool";

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

const VDebounceDir = {
  mounted(el, binding) {
    // 指令参数
    // 格式：object {event:注册的事件,time:延时的时间}
    const args = binding.arg;
    if (!args) {
      throw Error('请传入类似于{time:1000,event:"click"}格式的指令参数');
    }
    el.addEventListener(args.event, debounce(binding.value, args.time));
  },
};

// emits
const emits = defineEmits(["selectedJob"]);

// ref
const searchContentRef = ref(null);

//获取整个容器高度
const height = ref();
nextTick(() => {
  height.value = searchContentRef.value.offsetHeight + "px";
});

// 显示的名称
const job_name = ref(props.defaultValue);
// 当前活动的tab
const activeIndex = ref(0);

// 所有数据时 右边内容 默认数组第一条子节点
const content = ref([]);
watchEffect(() => {
  content.value = props.data[0]?.child;
  job_name.value = props.defaultValue;
});

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
};

// 搜索框聚焦时
const focusHandler = () => {
  iptHandler(); // 聚焦时搜索一下当前文本框内容
  searchContentRef.value.style.transform = " scale(1,1)";
};

// 总的数据时---滑动切换右边内容
const mouseenterHandler = (index) => {
  activeIndex.value = index;
  content.value = props.data[index].child;
};
</script>

<style lang="scss" scoped>
$bg-color: #f2f2f2;
$color: #409eff;
$base-bg-color: #ecf5ff;
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
  transform-origin: top left;
  transition: transform 0.6s;
  width: 100%;
  height: v-bind(height);
}

// 没有数据时
.no-data {
  background-color: $base-bg-color;
  text-align: center;
}

// 模糊搜索时
.fuzey-data {
  display: flex;
  flex-wrap: wrap;
  background-color: $base-bg-color;
  padding: 10px;
  height: auto;
  max-height: 100%;
  overflow: scroll;
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
  background-color: $base-bg-color;

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
    // flex: 2;
    overflow: scroll;
    background-color: $bg-color;
    padding-left: 20px;
    margin-left: auto;
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
