<template>
    <div class="recharge">
        <div class="bg">
        <my-header2>
      <!--插槽修改导航栏中的标题文字-->
      <div slot="title" style="margin:auto;">卡密充值</div>
    </my-header2>
        <!--input框-->
        
            <div class="from">
            <div>
                <span class="iconfont">&#xe6ad;</span>
                <input type="text" class="input" placeholder="请输入手机号" v-model="mobile" @blur="Phone">
            </div>
            <div>
                <span class="iconfont">&#xe634;</span>
                <input type="text" class="input" placeholder="请输入充值卡卡号" v-model="number">
            </div>
            <div>
                <span class="iconfont">&#xe60b;</span>
                <input type="text" class="input" placeholder="请输入充值卡密码" v-model="pass">
            </div>
        </div>
        <!--button-->
        <button @click="btn">充值</button>
        <!--文字部分-->
        <p>仅支持充值卡进行充值，请输入正确的卡号和密码。可从合作商户获得。</p>
        </div>
        
    </div>
</template>
<script>
//引入第二个header组件
import Header2 from "../components/Header2.vue";
export default {
    data(){
        return {
            mobile:"",
            number:"",
            pass:""
        }
    },
    methods:{
        Phone(){
            var p=this.mobile;
            var ureg=/^1[3456789]\d{9}$/;
            if(!ureg.test(p)){
            //    console.log("请输入正确的手机号");
               this.$toast.center("请输入正确的手机号");
                return;
            }  
        },
        btn(){
            var mobile=this.mobile;
            var number=this.number;
            var pass=this.pass;
            var ap_code=window.localStorage.getItem("ap_code");
            this.axios({
        url: "/api/mobile/ka_mi_recharge",
        method: "post",
        data: {
          mobile: mobile,
          number:number,
          pass:pass,
          ap_code:ap_code,
        }
      })
        .then(res => {
          console.log(res);
        
              console.log(res.data.msg)
              this.$toast.center(res.data.msg);
            if(res.data.code==0){
                this.$toast.center(res.data.msg);
                this.mobile="";
                this.number="";
                this.pass="";
            }
        })
        .catch(e => {
          console.log(e);
        });
        }
    },
    created(){
        var ap_code=window.localStorage.getItem("ap_code");
         var token = window.localStorage.getItem("token");
         var mobile = window.localStorage.getItem("mobile");
         this.mobile=mobile;
    },
   //注册子组件
  components: {
    "my-header2": Header2
  }
}
</script>
<style scoped>

::-webkit-input-placeholder{
    color:#aaa;
    font-size: 0.45rem;
   
}
/*背景颜色*/
.recharge{
    
   width: 100%;
     height: 100%;
  
}
.bg{
    background: #eee;
    position: absolute;
 height: 100%;
 width: 100%;
}
    .from{
        padding: 0.5rem 0.1rem;
       
    }
    .from>div{
       
        position: relative;
    }
    .from .input{
        width: 80%;
        height: 1.3rem;
        margin: 0.2rem 0;
       
        padding-left: 1.3rem;
        font-size: 0.45rem;
    }
    .from>div span{
        position: absolute;
        top:0.5rem;
        color: #ccc;
        font-size: 0.8rem;
        left:0.5rem;
    }
    button{
        width: 93%;
        padding: 0.2rem;
        background: #ff8936;
        border-radius: 0.1rem;
        color:#fff;
        text-align: center;
        font-size: 0.5rem;
    }
    p{
      font-size:0.4rem;
      margin-top:0.5rem;
      padding: 0 0.3rem;
      text-align: left;
      color:#aaa;
      line-height: 0.7rem;
    }
</style>
