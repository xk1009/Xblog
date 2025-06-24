<template>
  <div class="background-image-wrapper">
    <slot></slot> <!-- 渲染子组件 -->
  </div>
</template>
 
<style scoped>
.background-image-wrapper {
    background-image: url('./assets/images/bjd.png');
    background-size: cover;
    background-position: center;
    padding: 20px; /* 根据需要调整 */
}
</style>