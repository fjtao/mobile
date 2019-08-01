<template>
    <div style="margin:0.3rem; font-size:0.4rem;">
        输入主叫号码
        <input type="text" style="border:1px solid #333; padding:0.3rem;" v-model="mobile" ><br>
        <button @click="get" >测试</button>
    </div>
</template>
<script>
export default {
    data(){
        return{
            mobile:""
        }
    },
    methods:{
        get(){
            var mobile=this.mobile;
            this.axios({
        url: "/api/mobile/get_members_by_mobile",
        method: "post",
        data: {
          mobile:mobile,
        }
      })
        .then(res => {
            console.log(res.data);
          this.$toast(res.data.msg);
          var mobile = window.localStorage.setItem("mobile",res.data.data.mobile);
        })
        .catch(e => {
          console.log(e);
        });
        this.$router.go(-1);
        }
    },
    created(){
         
    }
}
</script>
<style lang="scss" scoped>
    button{
        margin-top:2rem;
    }
     button{
        background: #ff8936;
        color: #fff;
        padding: 0.2rem 1rem;
        border-radius: 0.2rem;
        font-size: 0.6rem; 
    }
</style>
