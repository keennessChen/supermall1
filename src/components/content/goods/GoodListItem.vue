<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showImg" alt="" @load="imgLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodListItem",
    props:{
      goodsItem:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    computed:{
      showImg(){
        return this.goodsItem.image || this.goodsItem.show.img
      }
    },
    methods:{
      imgLoad(){
        this.$bus.$emit('finishLoad')
      },
      itemClick(){
        this.$router.push('/detail/' + this.goodsItem.iid)
      }
    },
    destroyed(){
      //取消itemImgListener（刷新的回调函数）
      this.$bus.$off('finishLoad',this.itemImgListener)
    }
  }
</script>

<style scoped>
  .goods-item {
    /*这里设置的是goods-info的显示高度*/
    padding-bottom: 40px;
    /*这里对应goods-info的absolute*/
    position: relative;

    /*对应上GoodList的flex-wrap: wrap*/
    width: 48%;
  }

  .goods-item img {
    width: 100%;
    /*图片圆角设置*/
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    /*隐藏溢出部分*/
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    /*下面两个结合使用，用...代替隐藏的部分*/
    overflow: hidden;
    /*ellipsis:省略号*/
    text-overflow: ellipsis;
    /*nowrap：不换行，在同行显示*/
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }


  .goods-info .collect {
    position: relative;
  }

  /*::before 伪元素*/
  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
