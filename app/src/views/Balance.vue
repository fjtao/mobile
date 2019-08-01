<template>
  <div class="balance">
    <div class="bg">
        <my-header2>
            <div slot="title" @click="balance">余额查询</div>
        </my-header2>
    <!--上边的input框-->
    <div class="top">
      <div class="input">
        <span>账户:</span>
        <span>{{mobile}}</span>
      </div>
    </div>
    <!--bottom部分-->
    <div class="bottom">
      <div class="input">
        <span>话费余额:</span>
        <span>{{price}}</span>
      </div>
      <div style="border-bottom:1px solid #ddd; margin:0 0.5rem;"></div>
      <div class="input">
        <span>账户有效期:</span>
        
        <span>{{time}}</span>
      </div>
    </div>
    <!--温馨提示部分-->
    <div class="hint">
      <!-- <p>温馨提示:</p> -->
      <p v-html="p"></p>
    </div>
    </div>
   
    
  </div>
</template>
<script>
//引入第一个header组件
import header from "../components/header";
import Header2 from "../components/Header2.vue";
export default {
  data() {
    return {
      p:"",
      time:"",
      price:"",
      mobile:"",
    };
  },
  methods: {
    balan() {
      var mobile = window.localStorage.getItem("mobile");
      var ap_code=window.localStorage.getItem("ap_code");
      this.axios({
        url: "/api/mobile/get_mobile_info",
        method: "post",
        data: {
          ap_code:ap_code, 
          mobile: mobile,
        }
      })
        .then(res => {
          console.log(res.data.data);
          this.mobile=res.data.data.mobile;
          this.time=res.data.data.e_time;
          this.price=res.data.data.ka_mi_price+"元"
        })
        .catch(e => {
          console.log(e);
        });
    },
      back(){
            this.$router.go(-1);
        },
        balance(){
            this.$router.push("/balance");
        },
        billed(){
            this.$router.push("/billed");
        },
        wen(){
          var ap_code=window.localStorage.getItem("ap_code");
          this.axios({
        url: "/api/mobile/get_notice_info",
        method: "post",
        data: {
          ap_code:ap_code, 
          
        }
      })
        .then(res => {
          console.log(res.data.data)
          this.p=res.data.data;
        })
        .catch(e => {
          console.log(e);
        });
        },
  },
  created() {
    var ap_code=window.localStorage.getItem("ap_code");
     var mobile = window.localStorage.getItem("mobile");
    this.balan();
    this.wen();
  },
      //注册子组件
  components:{
    "my-header2":Header2
  },
};
</script>
<style lang="scss" scoped>
.balance {
  width: 100%;
  height: 100%
}
.bg{
 background: #f5f5f5;
 position: absolute;
 height: 100%;
 width: 100%;
}
// 文字账户
.input span {
  display: flex;
  align-items: center;
  font-size: 0.45rem;
}
.input {
  display: flex;
  background: #ffffff;
  border: 1px solid #ffffff;
  padding: 0.3rem 0.5rem;
  justify-content: space-between;
}
.input input {
  width: 50%;
  padding: 0.2rem;
  padding-left: 0.5rem;
  font-size: 0.45rem;
}
//top部分
.top {
  margin: 1rem 0;
}
// 温馨提示部分
.hint {
  font-size: 0.42rem;
  padding: 0 0.5rem;
  margin-top: 1rem;
 
}
.hint p {
  color: #828282;
  text-align: left;
  margin: 0.1rem 0;
  line-height: 0.5rem;
}
 header{
        width: 100%;
        height: 1.5rem;
        background: #bc141e;
        display: flex; 
        justify-content: space-around;
        line-height: 1.5rem;
        color: #fff;
        font-size: 0.45rem;
        
    }
</style>
