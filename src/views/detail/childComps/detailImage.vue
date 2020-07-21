<template>
    <div class='detailImgage'>
       <img v-for="(item,index) in images" :key="index" :src="item" alt="" @load="imgLoad">
    </div>
</template>

<script>
    export default {
        data(){
            return {
                imgLength:0,
                counter:0
            }
        },
        props:{
            images:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        created(){
            this.getLength
        },
        methods:{
            // 当图片加载完成后发送事件 也可以用防抖节流（204集）
            imgLoad(){
                // 方法1:
                // if(++this.counter == this.imgLength){
                //     this.$emit("imagesLoad")
                // }
                // 方法二：防抖
                this.$emit("imagesLoad")
            }
        },
            // 监听属性的变化
        watch:{
            // 这个命名要是传递的参数
            images(){
                this.imgLength = this.images.length
            }
        }
    }
</script>
<style scoped>
    img{
        width:100%;
    }
</style>