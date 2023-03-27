<template>
  <span :style="{ color: color }">{{ text }}</span>
</template>

<script setup>
const props = defineProps({
  text: String,
  color: {
    type: String,
    default: "#f40",
  },
});
</script>

<style lang="scss" scoped></style>
