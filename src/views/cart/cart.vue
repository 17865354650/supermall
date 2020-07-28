<template>
    <div class='cart'>
        <NavBar class="cart-nav"><div slot="center">购物车({{length}})</div></NavBar>
        <Scroll class="cartContent" ref="cart">
            <ItemList/>
        </Scroll>
        <div class="cartBot">
            <div class="checkout" :class="{isActive:isSellectAll}" @click="itemClick()"></div>全选
            <span style="margin-left:20px;">总计：{{totalPrice}}</span>
            <span style="margin-left:50px;">去计算（{{goodsNum}}）</span>
        </div>
    </div>
</template>
<script>
    import NavBar from 'components/common/navbar/NavBar'
    import Scroll from "components/common/scroll/Scroll"

    import ItemList from "./childComps/itemList"

    //辅助函数mapGetter 仅仅是将getters 映射到局部计算属性中
    import { mapGetters } from "vuex" 

    export default {
        components:{
            NavBar,
            ItemList,
            Scroll
        },
        activated(){
             //数据更新了需要刷新
            this.$refs.cart.refresh()
        },
        methods:{
            itemClick(){
                //1、当全选中
                if(this.isSellectAll){
                    this.cartList.forEach(element => {
                        element.checked = false
                    });
                }else{ //有一个未选中，或都未选中
                    this.cartList.forEach(element => {
                        element.checked = true
                    })
                }
            }
        },
        computed:{
            // 拿到vuex中定义的函数（写法一）
            // ...mapGetters(['cartLength'])
            // 写法二
            ...mapGetters({
                length:'cartLength',
                cartList:'cartList'
            }),
            // 求和
            totalPrice(){
                return '¥' + this.cartList.filter(item=>{ //筛选
                    return item.checked
                }).reduce((preValue,item) => { //preValue:上一个值，item：当前值（求和）
                    return preValue + item.price * item.count
                },0).toFixed(2) //0:初始值
            },
            // 商品个数
            goodsNum(){
                return this.cartList.filter(item=>{ //筛选
                    return item.checked
                }).reduce((preValue,item) => { //preValue:上一个值，item：当前值（求和）
                    return preValue + item.count
                },0)
            },
            // 判断是否全选
            isSellectAll(){
                if(this.cartList.length === 0){
                    return false
                }
                return !this.cartList.find(item=> !item.checked)
            }
        }
    }
</script>
<style scoped>
.cart-nav{
    background:var(--color-tint);
    color:#fff;
}
.cart{
    position: relative;
}
.cartContent{
    height: calc(100vh - 93px - 40px);
    overflow: hidden;
}
.cartBot{
    height:40px;
    width:100%;
    background: yellowgreen;
    position:absolute;
    bottom:-40px;
    left:0;
    display: flex;
    align-items: center;
}
.checkout{
    height:20px;
    width:20px;
    border:1px solid red;
    border-radius:50%;
}
.isActive{
    background:orange;
}
</style>