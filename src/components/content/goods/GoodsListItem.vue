<template>
    <div class="goods-item" @click="goDetail()">
        <img v-lazy="showImage" alt="" @load="imgUpload">
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
            },
            goDetail(){
                if(this.$route.path.indexOf('/home') != -1){
                     this.$router.push({
                        path:'/Detail',
                        query:{
                            iid:this.itemData.iid
                        }
                    })
                }else{
                    alert("1222")
                }
               

            }
        },
        // 有detail和home两个页面调用，由于传递的参数不一样
        computed:{
            showImage(){
                return this.itemData.image || this.itemData.show.img
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
