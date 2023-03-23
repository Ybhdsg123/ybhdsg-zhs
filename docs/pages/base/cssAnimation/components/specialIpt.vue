<template>
  <div class="wrapper">
    <div class="input-data">
      <input
        type="email"
        :modelValue="modelValue"
        @input="emits('update:modelValue', $event.target.value)"
      />
      <div
        class="underline"
        :class="[modelValue ? 'underline-active' : 'underline']"
      ></div>
      <label :class="[modelValue ? 'ipt-have-value' : '']" ref="labelRef">
        您的姓名
      </label>
      <div v-if="verificationPassed" class="error-info">
        {{ rules.message }}
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
const props = defineProps({
  // 绑定值
  modelValue: {
    required: true,
  },
  rules: {
    type: Object,
    dfault: () => {},
  },
});

const emits = defineEmits(["update:modelValue"]);

// 是否验证通过
const verificationPassed = ref(false);

// 失去焦点时
const blurHandler = (e) => {
  const value = e.target.value; // 输入框的值
  emits("update:modelValue", value);
  console.log(value);
  return;
  const rule = props.rules; // 严重规则
  // 是否在失去焦点时验证
  if (rule.trigger === "blur") {
    if (rule.requried && e.target.value === "") {
      verificationPassed.value = true;
    } else {
      verificationPassed.value = false;
    }
  }
  console.log(props.rules);
};
</script>
<style lang="scss" scoped>
.wrapper {
  // 错误提示信息
  .error-info {
    font-size: 12px;
    color: red;
  }
  .input-data {
    /* 相对定位 */
    position: relative;
    width: 100%;
    height: 40px;
    /* 输入框 */
    input {
      width: 100%;
      height: 100%;
      border: none; // 未点击前显示的边框
      font-size: 17px;
      border-bottom: 2px solid #c0c0c0;
      box-sizing: border-box; // 设置怪异盒
      // 防止设置 placeholder，样式混乱，直接给透明值
      &::placeholder {
        color: transparent;
      }
      &:focus {
        outline: none; // 取消聚焦后的边框
      }
      /* 输入框获得焦点时 label*/
      &:focus ~ label {
        /* label上移，同时改变字号、字体颜色 */
        transform: translateY(-25px);
        font-size: 15px;
        color: #2c6fdb;
      }

      /*输入框聚焦时 underline */
      &:focus ~ .underline {
        /* 沿X轴放大 */
        transform: scaleX(1);
      }
    }
    // 输入框有值时
    .ipt-have-value {
      transform: translateY(-25px);
      color: #2c6fdb;
    }
    /* lable*/
    label {
      /* 绝对定位 */
      position: absolute;
      bottom: 10px;
      left: 0px;
      color: #808080;
      /* 这个属性可以使点击label穿透到输入框 */
      pointer-events: none;
      /* 现在动画有点生硬，在这里需要给动画加个过渡 */
      transition: all 0.3s ease;
    }
    /* underline */
    .underline {
      position: absolute;
      bottom: 0px;
      height: 2px;
      width: 100%;
      background-color: #2c6fdb;
      /* 沿X轴缩小 */
      transform: scaleX(0);
      /* 这里同样给动画加个过渡 */
      transition: all 0.3s ease;
    }
    // 有值时
    .underline-active {
      /* 沿X轴缩小 */
      transform: scaleX(1);
    }
  }
}
</style>
