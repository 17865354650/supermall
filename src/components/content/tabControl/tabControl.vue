<template>
    <div class="control">
        <div v-for="(item,index) in titles" :key="index" class="tab-item" :class="{active:index === currentIndex}" @click="itemClick(index)">
            <span>{{item}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                currentIndex:0
            }
        },
        props:{
            titles:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        methods:{
            itemClick(index){
                this.currentIndex = index
                // 向外部传递事件
                this.$emit('tabClick',index)
            }
        }
    }
</script>

<style scoped>
    .control{
        display:flex;
        justify-content: space-around;
        height:40px;
        line-height: 40px;
    }
    .tab-item{
        text-align: center;
    }
    .active{
        color:var(--color-high-text);
    }
</style>
