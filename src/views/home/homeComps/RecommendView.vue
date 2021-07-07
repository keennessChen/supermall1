<template>
  <div class="recommend-view">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
      </a>
      <div>{{item.title}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RecommendView",
    props:{
      recommends:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .recommend-view{
    display: flex;
    text-align: center;
    /*padding的使用方式，上 右 下 左/上 左右 下!**/
    padding:10px 0 20px;
    /*底边框：width（高度的设置） style color*/
    border-bottom: 10px solid #eee;
  }
  .recommend-item{
    flex:1px;
  }
  .recommend-item img{
    width: 65px;
    height: 65px;
    margin-bottom: 6px;
  }
</style>
