<!--
 * @Author: zanjiahao
 * @LastEditors: zanjiahao
 * @Description: 边框旋转动效
-->
<template>
  <div style="width: 100%">
    <div class="container">
      <ModuleTitle title="边框旋转动效" />
      <div class="content">
        <div class="btn1">Reflect</div>
        <div class="btn2">Reflect</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ModuleTitle from './ModuleTitle.vue'
</script>

<style scoped lang="scss">
.container {
  display: flex;
  position: relative;
  flex: 1;
  height: 600px;
  background-color: #000;
  justify-content: center;

  .content {
    display: flex;
    width: 400px;
    justify-content: space-between;
    align-items: center;

    $color: #0ebeff;

    @mixin btn {
      position: relative;
      z-index: 0;
      margin: auto;
      width: 160px;
      height: 80px;
      line-height: 80px;
      color: $color;
      font-size: 24px;
      text-align: center;
      border-radius: 10px;
      overflow: hidden;
      transform: translateY(-40px);
      cursor: pointer;
      transition: 0.3s;
      -webkit-box-reflect: below 10px linear-gradient(transparent, rgba(0, 0, 0, 0.4));

      &:hover {
        color: #fff;
        box-shadow: 0 0 5px $color, 0 0 25px $color;

        &::after,
        &::before {
          transition: 0.3s;
          background-color: $color;
        }
      }

      &::before {
        content: '';
        position: absolute;
        z-index: -2;
        left: 50%;
        top: 50%;
        width: 150%;
        height: 300%;
        transform: translate(-50%, -50%);
        background-color: #000;
        background-repeat: no-repeat;
        background-size: 50% 50%;
        background-position: 0 0;
        background-image: conic-gradient($color, $color);
        box-sizing: border-box;
        animation: rotate 2s linear infinite;
      }
    }

    .btn1 {
      @include btn;

      &::after {
        content: '';
        box-sizing: border-box;
        position: absolute;
        z-index: -1;
        left: 2px;
        top: 2px;
        width: calc(100% - 4px);
        height: calc(100% - 4px);
        background-color: #000;
        border-radius: 10px;
      }
    }

    .btn2 {
      @include btn;
      filter: hue-rotate(90deg);
    }

    @keyframes rotate {
      100% {
        transform: translate(-50%, -50%) rotate(1turn);
      }
    }
  }
}
</style>
