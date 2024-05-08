<!--
 * @Author: zanjiahao
 * @LastEditors: zanjiahao
 * @Description: 充电动效
-->
<template>
  <div style="width: 100%">
    <div class="container">
      <ModuleTitle title="充电动效" />
      <div class="number">30.02%</div>
      <div class="contrast">
        <div class="circle"></div>
        <ul class="bubbles">
          <li
            v-for="(_, index) in list"
            :key="index"
            :style="{
              width: `${Math.random() * 15 + 15}px`,
              height: `${Math.random() * 15 + 15}px`,
              left: `${Math.random() * 70 + 15}px`,
              animation: `bubbleMoveToTop ${Math.random() * 5 + 2}s ease-in-out -${
                (Math.random() * 5000) / 1000
              }s infinite`
            }"
          ></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ModuleTitle from './ModuleTitle.vue'
import { onBeforeMount } from 'vue'

const list = new Array(15).fill(0)

onBeforeMount(() => {
  document.styleSheets[0].insertRule(`@keyframes bubbleMoveToTop{ 90% {
      opacity: 1;
    }
    100% {
      opacity: 0.1;
      transform: translate(-50%, -260px);
    }}`)
})
</script>

<style scoped lang="scss">
.container {
  display: flex;
  position: relative;
  flex: 1;
  padding-top: 100px;
  height: 600px;
  background-color: #000;
  justify-content: center;

  .number {
    position: absolute;
    z-index: 10;
    top: 32%;
    width: 300px;
    color: #fff;
    font-size: 32px;
    text-align: center;
  }

  .contrast {
    width: 300px;
    height: 500px;
    background-color: #000;
    overflow: hidden;
    animation: hueRotate 10s infinite linear;
    filter: contrast(10) hue-rotate(0);

    .circle {
      position: relative;
      width: 300px;
      height: 300px;
      border: 1px solid red;
      box-sizing: border-box;
      filter: blur(8px);

      &::before {
        content: '';
        position: absolute;
        top: 40%;
        left: 50%;
        width: 200px;
        height: 200px;
        background-color: #00ff6f;
        border-radius: 42% 38% 62% 49% / 45%;
        transform: translate(-50%, -50%) rotate(0);
        animation: rotate 10s infinite linear;
      }

      &::after {
        content: '';
        position: absolute;
        top: 40%;
        left: 50%;
        z-index: 10;
        width: 176px;
        height: 176px;
        background-color: #000;
        border-radius: 50%;
        transform: translate(-50%, -50%);
      }
    }

    .bubbles {
      position: absolute;
      left: 50%;
      bottom: 0;
      width: 100px;
      height: 40px;
      background-color: #00ff6f;
      border-radius: 100px 100px 0 0;
      transform: translate(-50%, 0);
      filter: blur(5px);

      li {
        position: absolute;
        top: 50%;
        background-color: #00ff6f;
        border-radius: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
  @keyframes rotate {
    50% {
      border-radius: 45% / 42% 38% 58% 49%;
    }

    100% {
      transform: translate(-50%, -50%) rotate(720deg);
    }
  }

  @keyframes hueRotate {
    100% {
      filter: contrast(15) hue-rotate(360deg);
    }
  }
}
</style>
