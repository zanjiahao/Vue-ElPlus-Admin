<!--
 * @Author: zanjiahao
 * @LastEditors: zanjiahao
 * @Description: 莫比乌斯环循环圆点动效
-->
<template>
  <div style="width: 100%">
    <div class="container">
      <ModuleTitle title="莫比乌斯环循环圆点动效" />
      <div class="content">
        <div class="circle">
          <span v-for="(_, index) in list" :key="index" :class="`span${index}`"></span>
        </div>
        <div class="circle">
          <span v-for="(_, index) in list" :key="index" :class="`span${index}`"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ModuleTitle from './ModuleTitle.vue'
const list = new Array(20).fill(0)
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 360px;
  display: flex;
  justify-content: center;
  padding-top: 50px;
  position: relative;

  $circleWidth: 154px;
  $dotWidth: 16px;

  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    animation: changeColor 8s linear infinite;

    .circle {
      width: $circleWidth;
      height: $circleWidth;
      margin: 0 calc($dotWidth / -2);
      background-color: transparent;
      position: relative;

      @mixin span($i) {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transform: rotate(calc((360deg / $spanNum) * $i));

        &::after {
          content: '';
          width: $dotWidth;
          height: $dotWidth;
          position: absolute;
          right: 0;
          top: calc(50% - ($dotWidth / 2));
          background-color: #00ff0a;
          border-radius: 50%;
          box-shadow: 0 0 10px #00ff0a, 0 0 20px #00ff0a, 0 0 40px #00ff0a, 0 0 60px #00ff0a, 0 0 80px #00ff0a,
            0 0 100px #00ff0a;
          transform: scale(0.1);
          animation: animate 4s linear infinite;
          animation-delay: calc(0.1s * $i);
        }
      }

      $spanNum: 20;

      &:nth-child(1) {
        @for $i from 0 to $spanNum {
          .span#{$i} {
            @include span($i);
          }
        }
      }

      &:nth-child(2) {
        transform: rotate(calc(180deg + 360deg / $spanNum));

        @for $i from 0 to $spanNum {
          .span#{$i} {
            @include span($i);

            &::after {
              animation-delay: calc(-0.1s * $i);
            }
          }
        }
      }
    }
  }

  @keyframes animate {
    0% {
      transform: scale(1);
    }

    50%,
    100% {
      transform: scale(0.1);
    }
  }

  @keyframes changeColor {
    0% {
      filter: hue-rotate(0deg);
    }

    100% {
      filter: hue-rotate(360deg);
    }
  }
}
</style>
