import {ADD_COUNTER,ADD_TO_CART} from './mutation-types'

export default { //这里放置复杂的处理方法
  addCart(context,payload){ //context可以写为{state,commit},叫做对象结构
    return new Promise((resolve,reject)=>{
      //1、查找之前数组中是否有该商品

      // let oldProduct = null
      // for(let item of this.cartList){
      //   if (item.iid === payload.iid){
      //     oldProduct = item
      //   }
      // }
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      //2、判断oldProduct是否有值
      if (oldProduct){
        context.commit(ADD_COUNTER,oldProduct)
        resolve('当前商品数量+1')
      }else{
        //这里是直接给传过来的对象添加了count的属性
        payload.count = 1
        context.commit(ADD_TO_CART,payload)
        resolve('商品已添加至购物车')
      }
    })
}
}
