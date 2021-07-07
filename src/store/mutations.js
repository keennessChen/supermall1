import {ADD_COUNTER,ADD_TO_CART} from './mutation-types'

export default { //这里放置每个单一的处理方法，且唯一的目的是修改state
  [ADD_COUNTER](state,payload){
    payload.count ++
  },
  [ADD_TO_CART](state,payload){
    payload.checked = true
    state.cartList.push(payload)
  }
}
