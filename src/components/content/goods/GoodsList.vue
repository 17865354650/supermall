<template>
    <div class="goods" >
        <GoodsListItem class="goodsItem" v-for="(item,index) in goodsData" :key="index" :itemData="item" />
    </div>
</template>

<script>
    import GoodsListItem from "./GoodsListItem"
    export default {
        components: {
            GoodsListItem
        },
        props:{
            goodsData:{
                type:Array,
                default(){
                    return []
                }
            }
        }
    }
</script>

<style scoped>
    .goods{
        display: flex;
        flex-wrap:wrap;
        justify-content: space-around;
        padding:2px;
    }
    .goodsItem{
        width: 48%;
    }
</style>
