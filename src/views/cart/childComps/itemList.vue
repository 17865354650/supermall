<template>
    <div class='itemList'  v-show="cartList.length">
        <CartItem v-for="(item,index) in cartList" :key="index" :cartDetail="item"></CartItem>
    </div>
</template>

<script>
    import { mapGetters } from "vuex"
    import CartItem from "./cartItem"
    export default {
        name:"itemList",
        components:{
            CartItem
        },
        computed:{
            ...mapGetters(['cartList'])
        }
    }
</script>
<style scoped>
    
</style>