<template>
  <div class="goods">
    <good-list-item v-for="item in goods" :goods-item = "item"/>
  </div>
</template>

<script>
  import GoodListItem from "./GoodListItem";
  export default {
    name: "GoodList",
    components: {GoodListItem},
    props:{
      goods:{
        type:Array,
        default(){
          return []
        }
      }

    }
  }
</script>

<style scoped>
  .goods{
    display: flex;
    /*这个是水平分布后，根据每一项的width进行分行显示*/
    flex-wrap: wrap;
    /*这个是所有空白区域根据每一项的周围进行均等分，这样就会形成，两边空白区域相加等于中间空白区域*/
    justify-content: space-around;
    /*这里是设置整个商品列表的外边距*/
    padding:3px;
  }
</style>
