<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
  export default {
    name: "BackTop"
  }
</script>

<style scoped>
  .back-top{
    /*使用了position后才能显示在页面最上层*/
    position: fixed;
    right: 7px;
    bottom: 51px;
  }
  .back-top img{
    width: 40px;
    height: 40px;
  }
</style>
