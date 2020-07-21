import {debounce} from './utils';

export const itemListenerMixin = {
    data(){
        return {
            itemImgListener:null,
            refresh:""
        }
    },
    mounted(){
         /*
            为了解决图片加载过慢导致better-scroll获取高度不正确
            通过图片加载完成后的，刷新重新获取高度解决此问题
            GoodsListItem bus总线 发送过来事件
        */ 
        //使用防抖函数  this.$refs.scroll.refresh:拿到scroll的函数
        this.refresh = debounce(this.$refs.scroll.refresh,200)
        this.itemImgListener = ()=>{
            this.refresh()
        }
        this.$bus.$on('imgUpload', this.itemImgListener)
    }
}

import BackTop from "components/content/backTop/BackTop"
// 回到顶部
export const backTopMixin = {
    components:{
        BackTop
    },
    data(){
        return {
            isShowBackTop:false,
        }
    },
    methods:{
        backClick(){
            // this.$refs.scroll：拿到这个组件 后面是里面的方法
            this.$refs.scroll.scrollTo(0,0,500)
        },
    }
}