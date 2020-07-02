<template>
    <!--  -->
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import BScroll from "better-scroll"
    export default {
        data(){
            return {
                scroll:null
            }
        },
        props:{
            probeType:{
                type:Number,
                default:0
            },
            pullUpLoad:{
                type:Boolean,
                default:false
            }
        },
        mounted(){
            /*
                probeType:侦测
                0，1不侦测当前滚动位置
                2:在手指滚动过程中侦测，惯性不滑动不侦测
                3:都侦测（包括惯性滚动）
                
                click:默认内部不允许单击事件
            */ 
            this.scroll = new BScroll(this.$refs.wrapper,{
                probeType:this.probeType, //为了不让所有页面都监听滚动事件消耗性能（传递变量）
                click:true,
                pullUpLoad:this.pullUpLoad //上拉加载
            })
            // 监听滚动
            this.scroll.on('scroll',(position)=>{
                this.$emit('scrollClick',position)
            })
            // 上拉加载更多
            this.scroll.on('pullingUp',()=>{
                this.$emit('upload')
            })
        },
        methods:{
            //这里定义方法外部可以拿到此方法
            // time=300 :默认值写300  
            scrollTo(x,y,time=300){
                // scrollTo :回到顶部，最后一个参数是时间
                // this.scroll && 防止scroll没有生成外部就调用
                this.scroll && this.scroll.scrollTo(x,y,time)
            },
            //要想再次触发上啦加载，必须调用此函数
            finishPullUp(){
                this.scroll.finishPullUp()
            },
            // 重新刷新，获取高度
            refresh(){
                console.log('---')
                this.scroll && this.scroll.refresh()
            }
        }
    }
</script>

<style scoped>

</style>
