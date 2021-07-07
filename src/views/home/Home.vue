<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
      :titles='["流行","新款","精选"]'
      @tabClick="tabClick"
      ref="tabControl1"
      clas="tab-control"
      v-show="tabIsFixed"
    />
    <scroll class="content"
            ref="scroll"
            @scroll="contentScroll"
            :probe-type="3"
            :pull-up-load = 'true'
            @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control
        :titles='["流行","新款","精选"]'
        @tabClick="tabClick"
        ref="tabControl2"
      />
      <good-list :goods="showGoods"/>
    </scroll>

    <back-top @click.native = "backClick" v-show="isShow"/>

  </div>

</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodList from "components/content/goods/GoodList";
  import Scroll from "components/common/scroll/Scroll";

  import HomeSwiper from "./homeComps/HomeSwiper";
  import RecommendView from "./homeComps/RecommendView";
  import FeatureView from "./homeComps/FeatureView";

  import {getHomeMultiData , getHomeGoods} from "network/home";
  import {itemListenerMixin,backTopMixin} from 'common/mixin'

  export default {
    name: "Home",
    components: { Scroll, GoodList, TabControl, FeatureView, RecommendView, NavBar,HomeSwiper},
    data(){
      return {
        banners:[],
        recommends:[],
        goods:{
          'pop':{ page:0 , list:[]},
          'new':{ page:0 , list:[]},
          'sell':{ page:0 , list:[]}
        },
        currentType : 'pop',
        //选项卡到顶部的距离
        tabOffsetTop : null,
        //决定选项卡是否吸顶
        tabIsFixed: false,
        //保存当前滚动的Y值
        saveY : 0
      }
    },
    mixins:[itemListenerMixin,backTopMixin],

    created() {
      //请求多个数据
     this.getHomeMultiData()
      //请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    mounted() {
      // //this.$refs.scroll.reFresh：表示传入的是函数，如果加了‘（）’表示传入返回值
      //   const refresh = debounce(this.$refs.scroll.reFresh,50)
      //
      // //监听item的图片加载完成，最好放在这里处理，如果放在created中监听，$refs、document的一些方法可能请求到的是null，出现寻求的方法undefined
      // this.$bus.$on('finishLoad',()=>{
      //   //这里是用到refresh方法，所以用‘（）’，上面是声明一个对象存储debounce返回的函数
      //   refresh()
      // })
    },
    activated() {
      //刷新必须放在前面，这样才真正避免切换其他页面回来时，当前页面不会滚回顶部，包括上拉加载后立马切换页面再回来出现的问题
      this.$refs.scroll.reFresh()
      this.$refs.scroll.scrollTo(0,this.saveY,0)
    },
    deactivated() {
      //1、保存滚动区域的y值
      this.saveY = this.$refs.scroll.getScrollY()
      //2、取消监听全局事件,itemImgListener可以直接调用是因为使用了mixin，然后它里面有定义到data，就会将里面的数据和home的data的数据合并
      this.$bus.$off('finishLoad',this.itemImgListener)
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    }
    ,
    methods:{
      /*
      下面是事件监听相关的方法
      */
      tabClick(index){//选项卡选择操作
        switch (index) {
          case 0 : this.currentType='pop'
            break
          case 1 : this.currentType='new'
            break
          case 2 : this.currentType='sell'
        }
        //解决两个tabControl的状态统一问题
        this.$refs.tabControl1.currentIndex =  index
        this.$refs.tabControl2.currentIndex =  index
      },
      contentScroll(position){//这个是置顶图标的显示隐藏方法
        //将isShow的判断封装成方法，放到mixin中了
        this.listenShowBackTop(position)
        //决定ta'bControl是否吸顶（position：fixed）
        this.tabIsFixed = (-position.y) > this.tabOffsetTop
      },

      loadMore(){//加载更多上拉的图片等数据
        this.getHomeGoods(this.currentType);
        console.log('上拉加载更多');
      },
      swiperImgLoad(){
        //获取tabControl中元素的offsetTop，因为只有元素才有这个属性，而$el是获取元素的方法
        // 这里是ref=tabControl2
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },

      /*
      下面是网络请求相关的方法
       */
      getHomeMultiData(){//请求获取轮播图、推荐图的数据
        getHomeMultiData().then(res=>{
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type){//该方法的type参数是为了可以根据商品类型多次调用此方法，来获得相应的数据
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res=>{
          console.log(res);
          //push(...res.data.list)其中‘...’的作用是将list列表中的数据一个个进行push
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          this.$refs.scroll.finishPullUp();
        })
      }

    }
  }
</script>

<style scoped>
  #home{
    /*因为导航栏固定置顶了，轮播图会遮盖掉它，因此给home组件一个和导航栏长度一致的上边距*/
    /*padding-top: 44px;*/
    /*设置的区域高度为视口的100%*/
    height: 100vh;
    position:relative;
  }
  .home-nav{
    background-color: var(--color-tint);
    /*这里是设置字体的颜色*/
    color:#ffffff;

    /*在使用浏览器原生滚动时，为了不让导航跟随一起滚动，后面的话是因为使用了better-scroll，所以这里的设置就可以不用了，并且为了解决选项卡吸顶的问题*/
    /*position:fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }
  .tab-control{
    /*用相对定位的话，它还会在原来的位置*/
    position:relative;

    /*这个是针对定位起效果的，不管什么定位*/
    z-index: 9;
  }


  .content{
    /*这个设置需要注意，在解决选项卡吸顶时，会将导航栏的脱标取消掉，那么这里的隐藏就有用了，超出滚动区域的内容都会隐藏，就不会遮盖导航栏了*/
    overflow: hidden;

    position:absolute;
    top:44px;
    bottom:49px;
    right:0px;
    left:0px;
  }
</style>
