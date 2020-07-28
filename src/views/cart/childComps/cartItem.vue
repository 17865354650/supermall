<template>
    <div class='cartItem'>
        <div class="checkout" :class="{isActive:cartDetail.checked}" @click="itemClick()"></div>
        <img :src="cartDetail.image" alt="">
        <div class="title">{{cartDetail.title}}</div>
        <div class="price">{{cartDetail.price}}</div>
        <h3 class="count">{{cartDetail.count}}</h3>
    </div>
</template>

<script>
    export default {
        props:{
            cartDetail:{
                type:Object,
                default(){
                    return {}
                }
            }
        },
        methods:{
            itemClick(){
                this.cartDetail.checked = !this.cartDetail.checked
            }
        }
    }
</script>
<style scoped>
.cartItem img{
    height:100px;
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