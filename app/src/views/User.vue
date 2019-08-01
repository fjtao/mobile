<template>
    <div class="user">
        <my-header2>
            <!--插槽修改导航栏中的标题文字-->
            <div slot="title">用户管理</div>
        </my-header2>
        <!--日期-->
        <div class="time">
            <!-- <div style="margin-top:0.1rem;">日期</div>
            <div>
                <select name="" id="" style="">
                    <option value=""></option>
                </select>
            </div>
            <div style="margin-top:0.1rem;">至</div>
            <div>
                <select name="" id="">
                    <option value=""></option>
                </select>
            </div> -->
        </div>
        <!--搜索部分-->
        <div class="has">
          <select >
              <option value="">手机号</option>
              <option value="">手机号</option>
              <option value="">手机号</option>
          </select> 
          <input type="text" v-model="mobile">
          <div @click="sousu">搜索</div>
       </div>
       <!--手机号  话费/现金券 等部分-->
       <div class="bottom">
           <div style="padding:0 0.6rem;">手机号</div>
           <div>话费</div>
           <div>
               <p>有效时间</p>
           </div>
           <div>
               <p>激活时间</p>
               <!-- <p>状态</p> -->
           </div>
       </div>
       <!--数据开始 -->
        <div>
            <ul v-for="item in list" :key="item.i"  class="ul">
                <li style="width:48%;">
                    <div>{{item.mobile}}</div>
                </li>
                <li style=" width:42%;">
                    <div>{{item.mobile_price}}元</div>
                </li>
                <li style=" width:31%;">
                    <div>{{item.term_time}}天</div>
                </li>
                <li style=" width:43%;">
                    <div>{{item.ji_huo_time}}</div>
                </li>
            </ul>
        </div>
       <!--数据结束-->
       
    </div>
</template>
<script>
//引入第二个header组件
import Header2 from "../components/Header2.vue";
export default {
    data(){
        return {
            list:[],
            mobile:"",
        }
    },
    methods:{
        //页面加载时直接加载后台返回来的数据
        manage(){
            var ap_code=window.localStorage.getItem("ap_code");
            this.axios({
            method:"post",
            url:"/api/shop/get_user_info",
            headers:{Accept: "application/json",
          token: window.localStorage.getItem("token")},
            data:{
                ap_code:ap_code,
            }
        }).then(res=>{
            console.log(res.data.data);
            this.list=res.data.data;
        });
        },
        sousu(){
           var ap_code=window.localStorage.getItem("ap_code");
            var mobile=this.mobile;
            this.axios({
            method:"post",
            url:"/api/shop/get_user_info",
            headers:{Accept: "application/json",
          token: window.localStorage.getItem("token")},
            data:{
                mobile:mobile,
                ap_code:ap_code,
            }
        }).then(res=>{
            console.log(res.data.data);
            this.list=res.data.data;
        });
        },
    },
    created(){
        var ap_code=window.localStorage.getItem("ap_code");
        var token = window.localStorage.getItem("token");
        this.manage();
    },
        //注册子组件
  components:{
    "my-header2":Header2
  },
}
</script>
<style lang="scss" scoped>
    .time{
        display: flex;
        justify-content: space-around;
        margin:0.3rem 0;
        font-size: 0.45rem;
    }
    .time select{
         border:1px solid #989898;
         width:3.5rem; 
         border-radius:0.2rem;
         font-size:0.45rem;
      appearance:none; /*去掉下拉箭头*/
       /*在选择框的最右侧中间显示小箭头图片*/
  background: url("../../public/img/xiala.png") no-repeat scroll right center transparent;
  background-size:0.8rem;
  padding-right: 0.2rem;

    }
    // 
     .has select{
        border:1px solid #989898;
        border-radius: 0.2rem;
        width: 25%;
        padding: 0.1rem;
        color:#333;
        font-size: 0.45rem;
         appearance:none; /*去掉下拉箭头*/
       /*在选择框的最右侧中间显示小箭头图片*/
  background: url("../../public/img/xiala.png") no-repeat scroll right center transparent;
  background-size:0.6rem;
  padding-right: 0.2rem;
    }
    .has{
        display: flex;
        justify-content: space-around;
        padding: 0 0.2rem;
        margin: 0.3rem 0;
    }
    .has input{
        width: 47%;
        border:1px solid #989898;
        border-radius: 0.2rem;
        padding: 0.2rem;
    }
    .has div{
        font-size:0.45rem;
        border: 1px solid #989898;
        padding: 0.2rem;
        border-radius: 0.2rem;
        color: #c3c3c3;
        line-height: 0.5rem;
    }
    // 手机号  话费/现金券 等部分
    .bottom{
        background: #efefef;
        font-size:0.4rem;
        color:#656565;
        padding: 0.2rem 0;
        display: flex;
        justify-content: space-around;
    }
    .bottom>div{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    //数据信息部分
   .ul {
       display:flex; margin:0.2rem 0;
   }
   .ul li{
       padding:0.2rem; 
       font-size:0.4rem;
       
   }
</style>
