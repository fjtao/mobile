<template>
    <div class="header">
        <header>
            <p @click="balance">余额查询</p>
            <p @click="login">商家登录</p>
            <p @click="recharge">卡密充值</p>
        </header>
    </div>
</template>
<script>
export default {
    data(){
        return {}
    },
    methods:{
        login(){
            this.$router.push("/login");
        },
        balance(){
            this.$router.push("/balance");
        },
        recharge(){
            this.$router.push("/recharge");
        }
    }
}
</script>
<style scoped>
    
    .header header{
        width: 100%;
        height: 1.5rem;
        background: #bc141e;
        display: -webkit-box;
        display: -moz-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex; 
        justify-content: space-around;
        line-height: 1.5rem;
        color: #fff;
        font-size: 0.45rem;
    }
</style>

