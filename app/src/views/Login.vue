<template>
    <div class="login">
        <header>
           <div class=" iconfont" style="margin-left:0.2rem;font-size: 0.7rem;" @click="back" >&#xe620;</div>
            <div class="home">
                <slot name="title">商家登录</slot>
            </div>
        </header>
        <div class="body">
            <!--输入框-->
            <div class="account">
                 <p>帐号</p>
                 <input type="text" placeholder="请输入帐号" v-model="name">
            </div>
            <div class="account">
                 <p>密码</p>
                 <input type="password" placeholder="请输入密码" v-model="upwd" >
            </div>
            <!--登录按钮-->
            <div class="button">
                <button @click="login">商家登录</button>
            </div>
        </div>
        <div style="font-size:0.4rem; color:#aaa; margin-top:0.5rem; padding:0 0.3rem; text-align:left; line-height:0.6rem;">
            备注：商家请向您的促销卡供应商索取商家账号，可用来修改拨号页和回拨页广告。
        </div>
    </div>
</template>
<script>
//引入第二个header组件
import Header2 from "../components/Header2.vue";
export default {
    data(){
        return {
            name:"",
            upwd:"",
        }
    },
    methods:{
         back(){
            this.$router.replace("/");
        },
        //验证登录
        login(){
            var n=this.name;
            var p=this.upwd;
            var ureg=/^[a-z0-9_]{3,20}$/;
            if(!ureg.test(n)){
                // console.log("用户名格式不正确");
                 this.$toast.center("用户名格式不正确");
                return;
            }
            var preg=/^[a-z0-9]{3,16}$/;
            if(!preg.test(p)){
                // console.log("密码格式不正确");
                 this.$toast.center("密码格式不正确");
                return;
            }
             //发送ajax请求 axios
            //查看输入内容与数据库中内容进行对比
             var ap_code=window.localStorage.getItem("ap_code");
            this.axios({
                url:'/api/login/login',
                method:'post',
                data:{
                    s_name:n,
                    password:p,
                    ap_code:ap_code,
                }
            }).then(res=>{
                console.log(res.data)
                window.localStorage.setItem('token',res.data.data.token);
                if(res.data.code==0){
                     this.$toast.center(res.data.msg);
                    this.$router.replace("/business");
                  
                }else{
                     this.$toast.center(res.data.msg);
                }
            }).catch(e=>{
                console.log(e)
            })
        },
        
    },
    created(){
        var ap_code=window.localStorage.getItem("ap_code");
    },
    watch:{
    
    },
     //注册子组件
  components:{
    "my-header2":Header2
  },
 
}
</script>
<style lang="scss" scoped>

::-webkit-input-placeholder{
    color:#ddd;
    font-size: 0.45rem;
}
    .account{
        display: flex;
        font-size: 0.45rem;
        margin: auto;
        border-bottom: 1px solid #ddd;
        padding: 0.2rem 0;
    }
    // 文字帐号
    .account p{
        margin-top:0.35rem;
        font-size: 0.45rem;
    }
    .account input{
        width: 80%;
        font-size: 0.45rem;
        padding: 0.2rem 0.3rem;
        align-items: center;
    }
    .body{
        margin-top: 1.5rem;
        margin-left: 0.4rem;
        margin-right: 0.4rem;
    }
    //button登录按钮
    .button{
        margin-top:1.6rem;
    }
    .button button{
        background: #ff8936;
        color: #fff;
        padding: 0.2rem 1rem;
        border-radius: 0.2rem;
        font-size: 0.45rem; 
    }
    header{
        width: 100%;
        height: 1.5rem;
        background: #bc141e;
        
        display: flex; 
        line-height: 1.5rem;
        color: #fff;
        font-size: 0.45rem;
    }
     header .home{
        margin-left: 3rem;
    }
</style>
