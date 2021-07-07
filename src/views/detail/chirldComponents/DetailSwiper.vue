<template>
    <swiper class="sw">
      <swiper-item v-for="item in topImages" @click="DSImgLoad">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
</template>

<script>
    import {Swiper,SwiperItem} from 'components/common/swiper'
  export default {
    name: "DetailSwiper",
    components:{
      Swiper,
      SwiperItem
    },
    props:{
      topImages:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return {
        isLoad:false
      }
    },
    methods:{
      DSImgLoad(){
        if (!this.isLoad){
          this.$emit('DSImgLoad')
          this.isLoad = true
        }
      },
    },

  }
</script>

<style scoped>
  .sw{
    height: 300px;
  }
</style>
