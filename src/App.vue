<template>
  <div id="app">
    <!-- 防止销毁重新创建 exclude 去除哪些（name）需要二次进入时需要重新加载-->
    <keep-alive exclude="detail">
      <router-view></router-view>
    </keep-alive>
    <TabBar>
      <TabBarItem path="/home" activeColor="red">
        <img slot="item-icon" src="~assets/img/common/home1.png" alt />
        <img slot="item-active" src="~assets/img/common/home2.png" alt />
        <div slot="item-text">首页</div>
      </TabBarItem>
      <TabBarItem path="/cart">
        <img slot="item-icon" src="~assets/img/common/cart1.png" alt />
        <img slot="item-active" src="~assets/img/common/cart2.png" alt />
        <div slot="item-text">购物车</div>
      </TabBarItem>
      <TabBarItem path="/my">
        <img slot="item-icon" src="~assets/img/common/my1.png" alt />
        <img slot="item-active" src="~assets/img/common/my2.png" alt />
        <div slot="item-text">个人</div>
      </TabBarItem>
    </TabBar>
  </div>
</template>

<script>
import TabBar from "components/common/tabbar/tabBar";
import TabBarItem from "components/common/tabbar/tabBarItem";
export default {
  name: "App",
  components:{
    TabBar,
    TabBarItem
  }
};
</script>

<style>
/* 这边路径简写（在vue.config.js配置了） */
@import "assets/css/base.css";
</style>
