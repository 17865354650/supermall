<template>
    <div class="recommend">
        <div v-for="(item,index) in recommend" :key="index" class="recommend-item">
            <a :href="item.link">
                <img :src="item.image" alt="">
                <div>{{item.title}}</div>
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            recommend: {
                type:Array,
                default(){
                    return []
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
