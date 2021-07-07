<template>
  <div class="cart">
<!--    导航-->
    <nav-bar class="nav-bar">
      <div slot="center">
        购物车({{getLength}})
      </div>
    </nav-bar>

    <!--      商品列表-->
    <cart-list/>

<!--    底部汇总-->
    <cart-bottom-bar/>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";

  import NavBar from "components/common/navbar/NavBar";

  import CartList from "./chirldComponents/CartList";
  import CartBottomBar from "./chirldComponents/CartBottomBar";

  export default {
    name: "Cart",
    components: {CartBottomBar, CartList, NavBar},
    computed:{
      //数组形式
      ...mapGetters([
        'getLength'
      ])
      //对象形式
      // ...mapGetters({
      //   length:'getLength'
      // })
    }
  }
</script>

<style scoped>
  .cart{
    height: 100vh;
  }
  .nav-bar{
    background-color: var(--color-tint);
    color:#eeeeee;
  }
</style>
