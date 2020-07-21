<template>
    <div class="nav-bar">
        <div class="left">
            <slot name="left"></slot>
        </div>
         <div class="center">
            <slot name="center"></slot>
        </div>
         <div class="right">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script>
    export default {
    }
</script>

<style scoped>
    .nav-bar{
        height: 44px;
        width: 100%;
        line-height: 44px;
        display: flex;
        box-shadow: 0px 1px 1px rgba(100, 100, 100, .1);
        text-align: center;
        /* position: fixed;
        top:0;left:0; */
        z-index: 10;
    }
    .left,.right{
        width:60px;
    }
    .center{
        flex: 1;
    }
</style>