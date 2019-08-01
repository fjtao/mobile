<template>
    <div>
        <header>
           <div class=" iconfont" style="margin-left:0.2rem;font-size: 0.7rem;" @click="back" >&#xe620;</div>
            <div class="login">
                <slot name="title">商家中心</slot>
            </div>
        </header>
        <!--商家信息部分-->
        <div class="top">
            <div style="width:35%; height:3rem; margin-left:0.3rem; padding:0.3rem 0; padding-top:0.4rem;">
                <img :src="shop_logo" alt=""  style="width:100%; height:2.7rem;">
            </div>
            <div class="right">
                <div class="flex">
                    <p>用户名:</p>
                    <p class="p">{{user_login}}</p>
                </div>
                <div class="flex">
                    <p>商家名:</p>
                    <p class="p">{{user_nickname}}</p>
                </div>
                <!-- <div class="flex">
                    <p>可提现余额:</p>
                    <p class="p">{{balance}}元</p>
                </div> -->
                <div>
                     <button class="submit" @click="clear">退出登录</button>
                </div>
            </div>
        </div>
        <!--商家信息部分end-->
        <!--九宫格部分开始-->
        <div class="sudoku">
            <ul>
                <li @click="shop">
                    <div>
                        <img src="../../public/img/shop.png" alt="">
                    </div>
                    <p style="font-size:0.45rem; color:#686869; font-weight:600; margin-top:0.2rem;">商家信息</p>
                </li>
                <li @click="user">
                    <div>
                        <img src="../../public/img/user.png" alt="">
                    </div>
                    <p style="font-size:0.45rem; color:#686869; font-weight:600; margin-top:0.2rem;">用户管理</p>
                </li>
                <li @click="ad">
                    <div>
                        <img src="../../public/img/g.png" alt="">
                    </div>
                    <p style="font-size:0.45rem; color:#686869; font-weight:600; margin-top:0.2rem;">广告管理</p>
                </li>
                <li @click="manage">
                    <div>
                        <img src="../../public/img/km.png" alt="">
                    </div>
                    <p style="font-size:0.45rem; color:#686869; font-weight:600; margin-top:0.2rem;">卡密管理</p>
                </li>
                
            </ul>
        </div>
        <!--九宫格部分结束-->
    </div>
</template>
<script>
//引入第二个header组件
import Header2 from "../components/Header2.vue";
export default {
    data(){
        return{
            user_nickname:"",
            balance:"",
            level:"",
            shop_logo:"",
            user_login:"",
        }
    },
    methods:{
        back(){
            this.$router.push("/");
        },
        shop(){
            this.$router.push("/message");
        },
        user(){
            this.$router.push("/user");
        },
        ad(){
            this.$router.push("/ad");
        },
        manage(){
            this.$router.push("/manage");
        },
        // 退出登录
    clear(){
      window.localStorage.clear();
      this.$router.replace("/login");
    },
        get(){
           var ap_code=window.localStorage.getItem("ap_code");
            this.axios({
        method: "post",
        url: "/api/shop/get_shop_info",
        headers: {
          Accept: "application/json",
          token: window.localStorage.getItem("token")
        },
        data: {
            ap_code:ap_code,
        }
      }).then(res => {
        console.log(res);
        
        this.user_nickname=res.data.data.user_nickname;
        this.user_login=res.data.data.user_login;
        this.balance=res.data.data.balance;
        this.shop_logo=res.data.data.shop_logo;
        if(res.data.data.level==1){
            this.level="代理商";
        }else{
            this.level="商家"
        }
        if(res.data.code==403){
            this.$router.replace("/login");
            this.$toast.center(res.data.msg);
        }
      });
        }
    },
    created(){
        var ap_code=window.localStorage.getItem("ap_code");
         var token = window.localStorage.getItem("token");
         this.get();
    },
      //注册子组件
  components:{
    "my-header2":Header2
  },
}
</script>
<style lang="scss" scoped>
    .top{
        display: flex;
        font-size: 0.5rem;
        margin: 0.2rem 0;
        font-weight: 700;
        border-bottom: 0.4rem solid #efefef;
        padding: 0.2rem 0;
    }
    .top .right{
        text-align: left;
        margin-left: 0.2rem;  
    }
    .top .right .flex{
        margin: 0.4rem 0;
        display: flex;
        
    }
    .top .right .flex .p{
        margin-left: 0.2rem;
    }
    // 九宫格部分
    .sudoku ul{
        display: flex;
        justify-content: space-around;
        padding: 0 0.2rem;
    }
    .sudoku ul li{
        width: 20%;
    }
    .sudoku ul li div img{
        width:100%;
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
     header .login{
        margin-left: 3rem;
    }
    .submit {
  background: #ff8936;
  color: #fff;
  padding: 0.1rem 1.6rem;
  border-radius: 0.1rem;
  font-size: 0.5rem;
  font-weight: 900;
}
</style>
