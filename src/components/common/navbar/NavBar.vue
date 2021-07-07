<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "NavBar"
  }
</script>

<style scoped>
  .nav-bar{
    display: flex;
    height: 44px;
    /*这个应该需要出现内容，高度才能撑起来*/
    line-height: 44px;
    text-align: center;
  }
  .left , .right{
    width: 66px;
  }
  .center{
    /*当左右插槽设置了宽度，那么使用flex会将剩余的位置设置给它*/
    flex:1px;
  }
</style>
