<template>
    <div class="goods-item">
        <img :src="itemData.show.img" alt="" @load="imgUpload">
        <div class="info">
            <div class="title">{{itemData.title}}</div>
            <span class="price">{{itemData.price}}</span>
            <span class="collect">{{itemData.cfav}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            itemData:{
                type:Object,
                default(){
                    return {}
                }
            }
        },
        methods:{
            // 图片加载完成
            imgUpload(){
                this.$bus.$emit('imgUpload')
            }
        }
    }
</script>

<style scoped>
    .info .title{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .goods-item img{
        width:100%;
    }
</style>
