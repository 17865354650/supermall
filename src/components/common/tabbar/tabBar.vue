<template>
    <div>
        <div id="tab-bar">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
     #tab-bar{
        display: flex;
        justify-content: space-around;
        background: #fff;
        position: fixed;
        bottom: 0;left:0;
        width: 100%;
        box-shadow: 0px 3px 5px rgba(100, 100, 100,1);
    }
</style>