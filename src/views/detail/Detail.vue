<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"
                    @titleClick="titleClick"
                    ref="navbar"
    />
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentPos"
    >
      <detail-swiper :top-images="topImages" @DSImgLoad="DSImgLoad"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo" @paramImgLoad="paramImgLoad" ref="param"/>
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <good-list :goods="recommends" ref="recommend"/>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"/>
    <back-top @click.native = "backClick" v-show="isShow"/>
  </div>
</template>

<script>
  import DetailNavBar from "./chirldComponents/DetailNavBar";
  import DetailSwiper from "./chirldComponents/DetailSwiper";
  import DetailBaseInfo from "./chirldComponents/DetailBaseInfo";
  import DetailShopInfo from "./chirldComponents/DetailShopInfo";
  import DetailGoodsInfo from "./chirldComponents/DetailGoodsInfo";
  import DetailParamInfo from "./chirldComponents/DetailParamInfo";
  import DetailCommentInfo from "./chirldComponents/DetailCommentInfo";
  import DetailBottomBar from "./chirldComponents/DetailBottomBar";

  import Scroll from "components/common/scroll/Scroll";
  import GoodList from "components/content/goods/GoodList";
  import BackTop from "components/content/backtop/BackTop";

  import {getDetail,getRecommends,Goods,Shop,GoodsParam} from "network/detail";
  import {itemListenerMixin,backTopMixin} from 'common/mixin'
  import {debounce} from "common/Utils";

  import { mapActions } from 'vuex'

  export default {
    name: "Detail",
    components: {
      BackTop,
      DetailBottomBar,
      GoodList,
      DetailCommentInfo,
      DetailParamInfo, DetailGoodsInfo, Scroll, DetailShopInfo, DetailBaseInfo, DetailSwiper, DetailNavBar,DetailParamInfo},
    data(){
      return{
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommends:[],
        themeTopY:[],
        getThemeTopY:null

      }
    },
    mixins:[itemListenerMixin,backTopMixin],
    created() {
      //保存商品的iid
      this.iid = this.$route.params.iid
      //根据iid请求详情页数据
      getDetail(this.iid).then(res=>{//先找到res里轮播图的信息位置，然后再获取
        const data = res.result
        this.topImages = data.itemInfo.topImages
        //获取商品信息，即轮播图和店铺信息中间区域的信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        //获取店铺信息
        this.shop = new Shop(data.shopInfo)
        //保存商品的详细数据
        this.detailInfo = data.detailInfo
        //获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
        //获取评论信息
        //cRate是总评论数，list数组是存放一条评论数据的位置
        if (data.rate.cRate != 0){
          this.commentInfo = data.rate.list[0]
        }
        //获取详情页每个区域的高度
        this.getThemeTopY = debounce(()=>{
          this.themeTopY = []
          this.themeTopY.push(0)
          this.themeTopY.push(this.$refs.param.$el.offsetTop)
          this.themeTopY.push(this.$refs.comment.$el.offsetTop)
          this.themeTopY.push(this.$refs.recommend.$el.offsetTop)
        },100)
      })
      //获取推荐数据
      getRecommends().then((res)=>{
        this.recommends = res.data.list
      })
    },
    methods:{
      ...mapActions(['addCart']),
      DSImgLoad(){
        this.$refs.scroll.reFresh()
      },
      imageLoad(){
        // this.$refs.scroll.reFresh()
        this.newRefresh()
        this.getThemeTopY()
      },
      paramImgLoad(){
        this.$refs.scroll.reFresh()
      },
      titleClick(index){
        this.$refs.scroll.scrollTo(0,-this.themeTopY[index],500)
      },
      contentPos(position){
        this.listenShowBackTop(position)
        const positionY = -position.y
        this.themeTopY.forEach((item,index)=>{
          if (positionY>=item){
            this.$refs.navbar.currentIndex = index
          }
        })
      },
      //添加商品到购物车
      addToCart(){
        //1、获取购物车需要的商品信息
        const product  = {}
        product.image = this.topImages[0]
        product.desc = this.goods.desc
        product.title = this.goods.title
        //之前是newPrice,看看后面会不会出错
        product.lowPrice = this.goods.realPrice
        product.iid = this.iid
        //2、将商品添加到购物车
        // this.$store.dispatch('addCart',product).then(res => {
        //   console.log(res);
        // } )
        this.addCart(product).then(res => {
          this.$toast.show(res,2000)
        })
      }
    }
  }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #f6f6f6;
    /*100vh指的是当前视口高度*/
    height: 100vh;
  }
  .detail-nav{
    position:relative;
    z-index: 9;
  }
  .content{
    overflow: hidden;
    /*100%指的是父元素detail高度，它的高度会被内容撑高，因此需要给detail设置固定高度*/
    height:calc(100% - 44px - 58px);
    background-color: #f6f6f6;
  }
</style>
