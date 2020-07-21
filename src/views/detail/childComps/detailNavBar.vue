<template>
   <div class='detailNavBar'>
       <NavBar class="navbar">
           <div slot="left" class="left" @click="back()"> &lt; </div>
           <div slot="center" class="center">
               <div 
                    v-for="(item,index) in titles" 
                    :key="index"
                    :class="{active:index === currentIndex}"
                    @click="itemClick(index)">
                    {{item}}
                </div>
           </div>
       </NavBar>
   </div>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar"

    export default {
        data(){
            return {
               titles:["商品","参数","评论","推荐"],
               currentIndex:0
            }
        },
        components:{
            NavBar
        },
        methods:{
            itemClick(index){
                this.currentIndex = index;
                this.$emit("titleClick",index)
            },
            back(){
                this.$router.go(-1)
            }
        }
    }
</script>
<style scoped>
    .center{
        display: flex;
        font-size:14px;
    }
    .center>div{
        flex:1;
    }
    .active{
        color:var(--color-high-text);
    }
    .left{
        font-size: 18px;
        font-weight: bold;
    }
    .navbar{
        position: relative;
        background:#fff;
        z-index: 10;
    }
</style>