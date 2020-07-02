<template>
    <div>
        <div class="tab-bar-item" @click="itemClick">
            <div v-if="!isActive">
                <slot name="item-icon"></slot>
            </div>
            <div  v-else>
                <slot name="item-active"></slot>
            </div>
            <div :style="activeStyle">
                <slot name="item-text"></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            path:String,
            activeColor:{
                type:String,
                default:'red'
            }
        },
        data(){
            return {
            }
        },
        computed: {
            isActive(){
                // 活跃路由判断是否是活跃
                return this.$route.path.indexOf(this.path) !== -1
                return true
            },
            activeStyle(){
                return this.isActive ? {color:this.activeColor} : {}
            }
        },
        methods: {
            itemClick(){
                this.$router.push(this.path)
            }
        }
    }
</script>

<style scoped>
    .tab-bar-item{
        text-align: center;
        flex: 1;
        height: 49px;
        font-size:14px;
    }
    .tab-bar-item img{
        width:24px;
        height:24px;
        margin-top:3px;
        vertical-align: middle;
        margin-top:2px;
    }
    .active{
        color:red;
    }
</style>