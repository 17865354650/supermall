<template>
   <div class='detail'>
      <detailNavBar @titleClick="titleClick" ref="nav"/>
      <Scroll class="content" ref="scroll" :probeType="3" @scrollClick="contenScroll">
         <div>
            <img class="topImg" :src="topImg" alt="">
         </div>
         <detailInfo :goods="goods"/>
         <detailImage :images="images" @imagesLoad="imagesLoad" />
         <div class="goodsParams" style="height:500px;" ref="params">商品参数</div>
         <div class="goodsParams" style="height:200px;border:1px solid red;" ref="recommend">
            商品评论
            <span>{{time | showDate}}</span>
         </div>
         <!-- 推荐商品 -->
         <GoodsList :goodsData="recommendData" ref="goods"/>
      </Scroll>
      <div class="bottomBar">
         <span>客服</span>
         <span>店铺</span>
         <span>收藏</span>
         <span @click="addCart()">加入购物车</span>
         <span>购买</span>
      </div>
       <!--组件不能直接监听点击 -->
      <back-top @click.native="backClick" v-show="isShowBackTop"/>
   </div>
</template>

<script>
   import { getDetail,Goods,getRecommend } from "network/detail.js"

   import Scroll from "components/common/scroll/Scroll"
   import GoodsList from 'components/content/goods/GoodsList'

   import detailNavBar from "./childComps/detailNavBar"
   import detailInfo from "./childComps/detailInfo"
   import detailImage from "./childComps/detailImage"

   import {formatDate} from "common/utils.js"
   import { itemListenerMixin , backTopMixin} from "common/mixin.js"
   import {debounce} from 'common/utils';

   export default {
      name:"detail",
      components:{
         detailNavBar,
         detailInfo,
         detailImage,
         Scroll,
         GoodsList,
      },
      mixins:[itemListenerMixin,backTopMixin],
      data(){
         return{
            topImg:"",
            goods: {}, //注意当你向组件传递这种参数时，组件需要哪种类型，你就定义哪种
            images:[],
            time:1535694719,
            recommendData:[],
            themeTopY:[],
            getThemeTopY:null, //定义防抖函数
            currentIndex:0,
         }
      },
      created(){
         this.getDetail(this.iid)
         this.getRecommend()

         // 使用防抖函数
         this.getThemeTopY = debounce(()=>{
            this.themeTopY = []
            // 组件要加$el 非组件不加
            this.themeTopY.push(0)
            this.themeTopY.push(this.$refs.params.offsetTop - 44)
            this.themeTopY.push(this.$refs.recommend.offsetTop - 44)
            this.themeTopY.push(this.$refs.goods.$el.offsetTop - 44)
         })
      },
      methods:{
         getDetail(iid){
            getDetail(iid).then(res=>{
               const data = res.result
               this.topImg = data.itemInfo.topImages[0]
               this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
               this.images = data.detailInfo.detailImage[0].list
            })
         },
         // 获取推荐商品
         getRecommend(){
            getRecommend().then(res=>{
               this.recommendData = res.data.list
            })
         },

         //监听方法 
         imagesLoad(){
            // 方法一
            // this.$refs.scroll.refresh()

            // 方法二：防抖，在mixin里
            this.refresh()

            // 图片加载完调用防抖函数
            this.getThemeTopY()
         },
         titleClick(index){
            this.$refs.scroll.scrollTo(0,-this.themeTopY[index],300)
         },
         // 监听滚动
         contenScroll(position){
            let positionY = - position.y
            /*
               [0, 2702, 3202, 3402]
               0 < position <= 2702  index 0
               2702 < position <= 3202  index 1
               3202 < position <= 3402  index 2
               3402 <   index 3
            */ 
           let length = this.themeTopY.length
            for( var i = 0 ; i < length ; i++){
               // this.currentIndex != i  防止多次打印
               if(this.currentIndex != i && ((i < length -1 && positionY >= this.themeTopY[i] && positionY < this.themeTopY[i + 1]) || (i == length - 1 && positionY >= this.themeTopY[i]))){
                  this.currentIndex  = i
                  this.$refs.nav.currentIndex = this.currentIndex
               }
            }

            this.isShowBackTop = (-position.y) > 1000;
         },

         // 将商品添加到购物车里（使用vuex）
         addCart(){
            const product = {}
            product.image = this.topImg;
            product.title = this.goods.title;
            product.price = this.goods.realPrice
            product.iid = this.iid

            // this.$store.commit('addGoods',product)  //mutations 触发方法
            this.$store.dispatch('addGoods',product)
         }
      },
      computed: {
         iid(){
            return this.$route.query.iid
         }
      },
      filters:{
         showDate(value){
            // 1.将时间转成Date 对象
            const date = new Date(value * 1000)
            // 2.将date进行格式化
            return formatDate(date,'yyyy-MM-dd hh:mm:ss')
         }
      },
      destroyed(){
         // 取消全局事件的监听
         this.$bus.$off('imgUpload',this.itemImgListener)
      }
   }
</script>
<style scoped>
.topImg{
   width:100%;
   height:300px;
}
/* 用于覆盖首页导航 */
.detail{
   position: relative;
   z-index: 9;
   background:#fff;
}
.content{
   height: calc(100vh - 44px - 49px);
   overflow: hidden;
}
.bottomBar{
   background:var(--color-tint);
   display: flex;
   height: 49px;
   width:100%;
   position:fixed;
   bottom:0;
   left:0;
   justify-content: space-around;
   line-height: 49px;
   color:#fff;
}
</style>