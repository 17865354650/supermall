<template>
    <div id="home">
        <NavBar class="home-nav"><div slot="center">首页</div></NavBar>
        <!-- 四个圆形导航 -->
        <Scroll 
            class="content" 
            ref="scroll" 
            :probe-type="3" 
            @scrollClick="getPosition"
            :pull-up-load="true"
            @upload="loadMore">
            <RecommendView :recommend="recommend" />
            <TabControl class="tabControl" :titles="['流行','新款','精选']" @tabClick="changGoods" />
            <GoodsList :goodsData="showGoods" />
        </Scroll> 
        <!--组件不能直接监听点击 -->
        <back-top @click.native="backClick" v-show="isShowBackTop"/>
    </div>
</template>

<script>
    import NavBar from 'components/common/navbar/NavBar'
    import Scroll from "components/common/scroll/Scroll" //引用滚动
    import TabControl from 'components/content/tabControl/tabControl'
    import GoodsList from 'components/content/goods/GoodsList'
    import BackTop from "components/content/backTop/BackTop"

    // 启用封装思想（childComps）
    import RecommendView from './childComps/homeRecommendView'

    import { getHomeMultidata, getHomeGoods } from 'network/home.js'
    export default {
        components:{
            NavBar,
            TabControl,
            RecommendView,
            GoodsList,
            Scroll,
            BackTop
        },
        data(){
            return {
                result:'',
                banner: [],
                recommend: [],
                goods: {
                    'pop':{list:[],page:0},
                    'new':{list:[],page:0},
                    'sell':{list:[],page:0}
                },
                currentType:'pop',
                isShowBackTop:false
            }
        },
        // 组件创建完执行
        created(){
            // 1.请求多个数据
            this.getHomeMultidata()
            //2、请求分类商品数据
            this.getHomeGoods('pop')
            this.getHomeGoods('new')
            this.getHomeGoods('sell')

        },
        mounted(){
            /*
                为了解决图片加载过慢导致better-scroll获取高度不正确
                通过图片加载完成后的，刷新重新获取高度解决此问题
                GoodsListItem bus总线 发送过来事件
            */ 
            //使用防抖函数      
            const refresh = this.debounce(this.$refs.scroll.refresh,200)
            this.$bus.$on('imgUpload',()=>{
                refresh()
            })
        },
        methods: {
            /*
                网络请求
            */
            getHomeMultidata(){
                getHomeMultidata().then(res=>{
                    this.banner = res.data.banner.list;
                    this.recommend = res.data.recommend.list;
                })
            },
            getHomeGoods(type){
                const page = this.goods[type].page + 1
                getHomeGoods(type,page).then(res=>{
                    // 将获取到的数据push到里面
                    this.goods[type].list.push(...res.data.list);
                    // 为了上拉加载更多时
                    this.goods[type].page += 1

                    this.$refs.scroll.finishPullUp();
                })
            },
            /*
                事件监听
            */ 
            //监听点击改变类型
            changGoods(index){
                switch(index){
                    case 0:
                        this.currentType = "pop"
                        break;
                    case 1:
                        this.currentType = "new"
                        break;
                    case 2:
                        this.currentType = "sell"
                        break
                }
            },
            backClick(){
                // this.$refs.scroll：拿到这个组件 后面是里面的方法
                this.$refs.scroll.scrollTo(0,0,500)
            },
            getPosition(position){
                this.isShowBackTop = (-position.y) > 1000
            },
            // 上拉加载更多
            loadMore(){
                this.getHomeGoods(this.currentType)
            },
            // 防抖函数
            debounce(func,delay){
                let timer = null;
                return function(...args){
                    if(timer) clearTimeout(timer)
                    timer = setTimeout(()=>{
                        func.apply(this, args)
                    }, delay)
                }
            }
        },
        // 当在上面展示的过长时，通过计算属性简化
        computed: { 
            showGoods(){
                return this.goods[this.currentType].list
            }
        }
    }
</script>

<style scoped>
    #home{
        padding-top:44px;
        height: 100vh;
        position: relative;
    }
    .home-nav{
        background: var(--color-tint);
        color:#fff;
    }
    .tabControl{
        background: #fff;
        position:sticky;
        top:44px;
    }
    .content{
        /* height:calc(100% -93px);
        margin-top:44px; */

        overflow: hidden;
        position: absolute;
        top:44px;
        bottom: 49px;
        left:0;
        right: 0;
    }
</style>
