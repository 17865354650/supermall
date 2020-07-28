import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        cartList: []
    },
    /*
        mutations:修改state的状态
        mutations:中每个方法尽可能单一
    */ 
    mutations:{
        addCount(state,payload){
            payload.count += 1
        },
        addToCart(state,payload){
            payload.checked = true //添加否选择
            state.cartList.push(payload)
        }
    },
    actions:{
        addGoods(context,payload){
            console.log(payload)
            // 查找是否有重复商品
            let oldProduct = null
            for(let i in context.state.cartList){
                if(context.state.cartList[i].iid === payload.iid){
                    oldProduct = context.state.cartList[i]
                }
            }
            if(oldProduct){
                // oldProduct.count += 1  抽取到mutations
                context.commit('addCount',oldProduct)
            }else{
                payload.count = 1
                // context.state.cartList.push(payload)
                context.commit('addToCart',payload)
            }

        }
    },
    getters:{
        cartLength(state){
            return state.cartList.length
        },
        cartList(state){
            return state.cartList
        }
    }
})

export default store