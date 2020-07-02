<template>
    <div class="recommend">
        <div v-for="(item,index) in recommend" :key="index" class="recommend-item">
            <a :href="item.link">
                <img :src="item.image" alt="" @load="imgRecommd">
                <div>{{item.title}}</div>
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                isLoad:false
            }
        },
        props:{
            recommend: {
                type:Array,
                default(){
                    return []
                }
            }
        },
        methods: {
            imgRecommd(){
                if(!this.isLoad){
                    this.$emit('recommdImgUpload')
                    this.isLoad = true //防止多次发送
                }
            }
        }
    }
</script>

<style scoped>
    .recommend{
        display: flex;
        justify-content: space-around;
        padding:20px 0;
        border-bottom:5px solid #ccc;
    }
    .recommend-item img{
        width:65px;
        height:65px;
    }
</style>
