<template>
  <div class="shop-info">

    <div class="shop-top">
      <img :src="shop.logo" alt="">
      <span class="title">{{shop.name}}</span>
    </div>

    <div class="shop-middle">

      <div class="middle-item middle-left">
        <div class="info-sells">
          <div class="sells-count">
            {{shop.sells | sellCountFilter}}
          </div>
          <div class="sells-text">总销量</div>
        </div>
        <div class="info-goods">
          <div class="goods-count">
            {{shop.goodsCount}}
          </div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>

      <div class="middle-item middle-right">
        <table>
          <tr v-for="(item,index) in shop.score" :key="index">
            <td>{{item.name}}</td>
            <td class="score" :class="{'score-better' : item.isBetter}">{{item.score}}</td>
            <td class="better" :class="{'better-more' : item.isBetter}"><span>{{item.isBetter ? '高' : '低'}}</span></td>
          </tr>
        </table>
      </div>

    </div>

    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>

  </div>

</template>

<script>
  export default {
    name: "DetailShopInfo",
    props:{
      shop:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    filters:{
      sellCountFilter(value){
        if(value<10000) return value;
        return (value/10000).toFixed(1) + '万'
      }
    }
  }
</script>

<style scoped>
  .shop-info{
    padding : 25px 8px;
    border-bottom: 5px solid #f6f6f6;
  }
  .shop-top{
    line-height: 45px;
    display: flex;
    align-items: center;
  }
  .shop-top img {
    width: 45px;
    height: 45px;
    border-radius : 50%;
    border: 1px solid rgba(0,0,0,.1);
  }
  .shop-info .title{
    margin-left: 10px;
    vertical-align: center;
  }

  .shop-middle{
    margin-top: 15px;
    display: flex;
    align-items: center;
  }
  .middle-item{
    flex:1px;
  }
  .middle-left{
    display: flex;
    /*space-evenly: 均匀排列每个元素,每个元素之间的间隔相等*/
    /*space-between: 均匀排列每个元素,首个元素放置于起点,末尾元素放置于终点*/
    justify-content: space-evenly;
    text-align: center;
    border-right: 1px solid rgba(0,0,0,.1);
    color:#333
  }
  .sells-count , .goods-count{
    font-size: 20px;
  }
  .sells-text, .goods-text{
    font-size: 15px;
    margin-top: 10px;
  }

  .middle-right{
    font-size: 15px ;
    color:#333;
  }
  .middle-right table{
    width: 120px;
    margin-left: 45px;
  }
  .middle-right table td{
    padding: 5px 0;
  }
  .middle-right .score{
    color: #5ea732;
  }
  .middle-right .score-better{
    color:#f13e3a;
  }
  .middle-right .better span{
    background-color: #5ea732;
    color:#f6f6f6;
    text-align: center;
  }
  .middle-right .better-more span{
    background-color: #f13e3a;
  }

  .shop-bottom{
    margin-top:10px;
    text-align: center;
  }
  .enter-shop{
    /*行内块元素*/
    display:inline-block;
    font-size: 14px;
    background-color: #f2f5f8;
    width: 150px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 10px;
  }
</style>
