<template>
  <div class="cart-bottom-bar">
    <div class="cb-left">
      <check-button
        class="check-button"
        :is-checked="isSelectAll"
        @click.native="checkClick"
      />
      <p>全选</p>
    </div>
    <div class="cb-center">
      合计：￥{{totalPrice}}
    </div>
    <div class="cb-right">
      去计算:({{checkedLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";
  import {mapGetters} from 'vuex'
  export default {
    name: "CartBottomBar",
    components: {CheckButton},
    computed:{
      ...mapGetters(['getList']),
      totalPrice(){
        return this.getList.filter(item => {
          return item.checked
        }).reduce((pre,item)=>{
          return pre + item.lowPrice * item.count
        },0).toFixed(2)
      },
      checkedLength(){
        return this.getList.filter(item => {return item.checked}).length
      },
      isSelectAll(){
        if (this.getList.length === 0) return false
        return !this.getList.find(item => !item.checked)
      }
    },
    methods:{
      checkClick(){
        if (this.isSelectAll){
          this.getList.forEach(item => item.checked = false)
        }else{
          this.getList.forEach(item => item.checked = true)
        }
      }
    }
  }
</script>

<style scoped>
  .cart-bottom-bar{
    display: flex;
    line-height: 40px;
    font-size: 15px;
    background: #eee;
  }
  .cb-left{
    display: flex;
    align-items: center;

    margin-left: 10px;
    width: 100px;
  }
  .check-button{
    width: 20px;
    height: 20px;
    margin-right:5px;
    line-height: 20px;
  }
  .cb-center{
    flex: 1;
  }
  .cb-right{
    width: 130px;
    text-align: center;
    color: #eeeeee;
    background-color: var(--color-tint);
  }
</style>
