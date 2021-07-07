<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    data(){
      return {
        scroll:null
      }
    },
    props:{
      probeType:{
        type:Number,
        //数字和字符串可以直接写，数组和对象需要default(){}
        default:0
      },
      pullUpLoad:{
        type:Boolean,
        default: false
      }
    }
    ,
    mounted(){
      this.scroll = new BScroll(this.$refs.wrapper,{
        // 该属性作用是：不用来回切换移动端界面就可以让拖拽滚动生效，但需要点击两次滚动区域的内容才能生效
        // observeDOM:true
        //该属性作用是：需要来回切换一次移动端界面才能让拖拽滚动生效，并且可以单击滚动区域的内容生效
        click:true,
        // 表示监听滚动的方式
        probeType: this.probeType,
        // 表示滚动到了底部
        pullUpLoad:this.pullUpLoad
      });
      //这里是发送滚动位置的处理，通过scroll方式发送事件、position参数,外层包裹了安全校验
      if(this.probeType === 2 || this.probeType === 3){
        this.scroll.on('scroll',(position)=>{
          this.$emit('scroll',position)
        })
      };
      //这里是发送处理上拉加载更多的事件
      if(this.pullUpLoad){
        this.scroll.on('pullingUp',()=>{
          this.$emit('pullingUp')
        })
      }
    },
    methods:{
      //置顶方法
      scrollTo(x,y,time=400){
        this.scroll.scrollTo(x,y,time)
      },
      //实现更多的上拉加载，因为pullingUp默认只会加载一次，最好加上this.scroll && 进行严谨判断
      finishPullUp(){
        this.scroll && this.scroll.finishPullUp()
      },
      reFresh(){
        this.scroll && this.scroll.refresh()
      },
      getScrollY(){
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>

<style scoped>
  .wrapper{
    position: relative;
  }
</style>
