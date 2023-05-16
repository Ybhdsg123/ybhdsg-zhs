<template>
  <div class="content">
    <div class="crash-ball-loading">
      <div class="ball left-ball"></div>
      <div class="ball right-ball"></div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.content {
  position: relative;
  width: 200px;
  height: 300px;
  background-color: #f6f6f6;
}
.crash-ball-loading {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .ball {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  .left-ball {
    background-color: aqua;
    animation: leftBallRuning 3s linear infinite alternate;
    // transition: all 0.3s;
  }
  .right-ball {
    background-color: aquamarine;
    animation: rightBallRuning 3s linear infinite alternate;
    // transition: all 0.3s;
  }
  @keyframes leftBallRuning {
    0% {
      border-radius: 50%;
      transform: translate(-50%, -50%) rotate(0deg);
    }
    30% {
      border-radius: 0px;
      transform: translate(-80px, -50%) rotate(360deg);
    }
    40% {
      border-radius: 50%;
      transform: translate(-50%, -50%) rotate(0deg);
    }
    60% {
      border-radius: 50%;
      transform: translate(-30px, -50%) rotate(0deg);
    }
    80% {
      border-radius: 50%;
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      border-radius: 0px;
      transform: translate(-80px, -50%) rotate(360deg);
    }
  }
  @keyframes rightBallRuning {
    0% {
      border-radius: 50%;
      transform: translate(-50%, -50%) rotate(0deg);
    }
    30% {
      border-radius: 0px;
      transform: translate(80px, -50%) rotate(360deg);
    }
    40% {
      border-radius: 50%;
      transform: translate(-50%, -50%) rotate(0deg);
    }
    60% {
      border-radius: 50%;
      transform: translate(30px, -50%) rotate(0deg);
    }
    80% {
      border-radius: 50%;
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      border-radius: 0px;
      transform: translate(80px, -50%) rotate(360deg);
    }
  }
}
</style>
