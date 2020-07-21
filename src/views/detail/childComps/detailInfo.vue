<template>
   <div class='detailInfo'>
       <div>
           {{goods.title}}
       </div>
       <div class="price" style="color:red;font-size:20px;margin-top:10px;">
           {{goods.newPrice}}
       </div>
   </div>
</template>

<script>
   export default {
       props:{
            goods:{
                type:Object,
                default(){
                    return {}
                }
            }
       }
   }
</script>
<style scoped>
</style>