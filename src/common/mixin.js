
import {debounce} from './Utils'
import BackTop from "components/content/backtop/BackTop";

export const itemListenerMixin = {

  data(){
    return {
      itemImgListener:null,
      newRefresh:null,
    }
  },
  mounted(){
    this.newRefresh = debounce(this.$refs.scroll.reFresh,100)
    this.itemImgListener = ()=>{this.newRefresh()}
    this.$bus.$on('finishLoad',this.itemImgListener)
  },

}

export const backTopMixin = {
  components:{
    BackTop
  },
  data(){
    return {
      isShow:false,
    }
  },
  methods:{
    backClick(){//这个是置顶操作
      this.$refs.scroll.scrollTo(0,0)
    },
    listenShowBackTop(position){
      this.isShow = (-position.y) > 1000
    }
  }
}
