<!--
 * @Author: zanjiahao
 * @LastEditors: zanjiahao
 * @Description: 过渡背景按钮
-->
<template>
  <div class="container">
    <button>Button</button>
  </div>
</template>

<style scoped lang="scss">
@import '../buttonVariables.scss';
.container {
  button {
    width: $dynamicButtonsWidth;
    height: $dynamicButtonsHeight;
    border: 0;
    border-radius: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    cursor: pointer;
    color: #ffffff;
    background: linear-gradient(to right, #c635fe 50%, $buttonColor 50%);
    background-size: 200% 100%;
    background-position: 100% 0%;
    transition: all 0.5s ease;

    &:hover {
      background-position: 0% 0%;
    }
  }
}
</style>
