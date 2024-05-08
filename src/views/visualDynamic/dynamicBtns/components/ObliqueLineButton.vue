<!--
 * @Author: zanjiahao
 * @LastEditors: zanjiahao
 * @Description: 斜线按钮
-->
<template>
  <div class="container">
    <button>
      Button
      <span></span>
    </button>
  </div>
</template>

<style scoped lang="scss">
@import '../buttonVariables.scss';
.container {
  button {
    display: flex;
    position: relative;
    z-index: 1;
    width: $dynamicButtonsWidth;
    height: $dynamicButtonsHeight;
    color: $buttonColor;
    font-size: 24px;
    line-height: 24px;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    overflow: hidden;
    cursor: pointer;
    border: 0 !important;
    box-sizing: border-box;

    span {
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      border: 4px solid $buttonColor;
      box-sizing: border-box;

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 8%;
        height: 400%;
        background-color: #04111b;
        transform: translate(-50%, -50%) rotate(-60deg);
        transition: all 0.3s;
      }
    }

    &:hover {
      color: #fff;

      span::after {
        background-color: $buttonColor;
        width: 100%;
      }
    }
  }
}
</style>
