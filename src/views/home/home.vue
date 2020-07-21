<template>
    <div id="home">
        <NavBar class="home-nav"><div slot="center">首页</div></NavBar>
        <TabControl ref="tabControl1" :titles="['流行','新款','精选']" @tabClick="changGoods" class="tabControl1" v-show="this.isShowTabControl"/>
        <Scroll 
            class="content" 
            ref="scroll" 
            :probe-type="3" 
            @scrollClick="getPosition"
            :pull-up-load="true"
            @upload="loadMore">
             <!-- 四个圆形导航 -->
            <RecommendView :recommend="recommend" @recommdImgUpload="recommdImgUpload" />
            <TabControl ref="tabControl2" :titles="['流行','新款','精选']" @tabClick="changGoods" />
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
    
    import { itemListenerMixin } from "common/mixin.js"

    export default {
        components:{
            NavBar,
            TabControl,
            RecommendView,
            GoodsList,
            Scroll,
            BackTop
        },
        mixins:[itemListenerMixin],
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
                isShowBackTop:false,
                tabOffsetTop:0,
                isShowTabControl:false,
                saveY:0,
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
                // this.$refs.tabControl.currentIndex 这个拿的是（tabControl）组件里data定义的变量currentIndex
                this.$refs.tabControl1.currentIndex = index;
                this.$refs.tabControl2.currentIndex = index
            },
            backClick(){
                // this.$refs.scroll：拿到这个组件 后面是里面的方法
                this.$refs.scroll.scrollTo(0,0,500)
            },
            getPosition(position){
                this.isShowBackTop = (-position.y) > 1000;
                this.isShowTabControl = (-position.y) > this.tabOffsetTop
            },
            // 上拉加载更多
            loadMore(){
                this.getHomeGoods(this.currentType)
            },
            // 他这个获取的高度要等图片加载完成后再去获取高度
            recommdImgUpload(){
                // 获取tabCotrol的offsetTop
                //所有的组件都有一个 $el:用于获取组件中的元素
                this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
            }
        },
        // 当在上面展示的过长时，通过计算属性简化
        computed: { 
            showGoods(){
                return this.goods[this.currentType].list
            }
        },

        // 当使用keepAlive后组件里可以使用他两，离开和进入组件触发的生命周期
        activated(){
            this.$refs.scroll.scrollTo(0,this.saveY,0)
            this.$refs.scroll.refresh(); //有时候会出现bug，刷新即可解决
        },
        deactivated(){
            // 保存y值
            this.saveY = this.$refs.scroll.getScrollY()

            // 取消全局事件的监听
            this.$bus.$off('imgUpload',this.itemImgListener)
        }
    }
</script>

<style scoped>
    #home{
        /* padding-top:44px; */
        height: 100vh;
        position: relative;
    }
    .home-nav{
        background: var(--color-tint);
        color:#fff;
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
    .tabControl1{
        background:#fff;
        /* z-index属性适用于定位元素：加psoition才能在上面 */
        position: relative; 
        z-index: 100
    }
</style>
