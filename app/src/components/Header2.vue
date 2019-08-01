<template>
    <div class="header2">
        <header>
            <div class=" iconfont" style="margin-left:0.2rem;font-size: 0.7rem;" @click="back" >&#xe620;</div>
            <div class="login">
                <slot name="title"></slot>
            </div>
        </header>
    </div>
</template>
<script>
export default {
    data(){
        return {
            
        }
    },
    methods:{
        back(){
            this.$router.go(-1);
        }
    },
    created(){
        
    },
}
</script>
<style lang="scss" scoped>
    .header2 header{
        width: 100%;
        height: 1.5rem;
        background: #bc141e;
        
        display: flex; 
        line-height: 1.5rem;
        color: #fff;
        font-size: 0.45rem;
    }
    .header2 header .login{
        margin-left: 3rem;
    }
</style>
