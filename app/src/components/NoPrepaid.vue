<template>
  <div class="no" >
    <div class="card">
      <p>卡号/卡密</p>
      <p>套餐</p>
      <p>有效期</p>
    </div>
    <!--卡号 话费 时间 状态的内容部分-->
    <div class="content" v-for="item in list1" :key="item.i"  >
      <div class="number">
        <div>
          <span>卡号:</span>
          <span>{{item.number}}</span>
        </div>
        <div class="km">
          <div>
            <span>卡密:</span>
            <span>{{item.pass}}</span>
          </div>
          <div class="cz" @click="pay(item.number,item.pass);">
            <button>充值</button>
          </div>
        </div>
      </div>
      <div style="margin-top:0.4rem;">{{item.price}}元话费</div>
      <div style="margin-top:0.2rem;">
        <p>{{item.end_time}}</p>
        <!-- <p>23:59:59</p> -->
      </div>
     <div class="tan" v-show="PhoneBox">
        <div style="font-size:0.4rem;">请输入手机号进行充值</div>
        <input v-model="mobile" type="text" placeholder="请输入手机号码" style="width:98%; font-size:0.4rem;border:1px solid #efefef; border-left:0; border-right:0; margin:0.2rem 0; height:0.8rem; padding-left:0.1rem;">
        <div style="display:flex; justify-content: space-around;">
          <button @click="ensur">确定</button>
        <button @click="annul">取消</button>
        </div>
        
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:["list1"],
 
  data() {
    return {
      PhoneBox:false,
      number:"",
      pass:"",
      mobile:""
    };
  },
  methods:{
    child() {
            console.log("child");
        this.$emit('no');
  },
  // 子组件中的方法，在父组件中使用$refs来调用
  pay(number,pass){
   
    this.number=number;
    this.pass=pass;
    this.PhoneBox=true;
  },
  ensur(){
     var mobile=this.mobile
      var number=this.number;
        var pass=this.pass;
        console.log(mobile, number,pass);
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
                this.PhoneBox=false;
            }
             this.mobile="";
        })
        .catch(e => {
          console.log(e);
        });
    
  },
  annul(){
    this.PhoneBox=false;
  },
},
created(){
  var token = window.localStorage.getItem("token");
  //this.child();
},
}
</script>
<style lang="scss" scoped>
// 卡密 套餐 有效期 状态
.card {
  margin: 0.3rem 0;
  padding: 0.3rem 0;
  font-size: 0.45rem;
  display: flex;
  justify-content: space-around;
  background: #efefef;
}
// 卡号 话费 时间 状态的内容部分
.content {
  display: flex;
  font-size: 0.4rem;
  justify-content: space-around;
   padding:  0.2rem;
   position: relative;
}
.content > div {
  width: 25%;
}
.content .number {
  text-align: left;
  width: 36%;
}
//卡密部分
.content .km {
  display: flex;
  justify-content: space-between;
}
//conten下的button
.content .cz button {
  background: #ff8936;
  color: #fff;
  font-size: 0.1rem;
  padding: 0.1rem 0.2rem;
  border-radius: 0.1rem;
}
.tan{
   background: rgba(0, 0, 0, 0.2);
   color:#fff;
  width: 80% !important;
  padding: 0.2rem;
 position: fixed;
  top:30%;
  margin:auto;
  z-index: 99;
  border-radius: 0.2rem;
  height:3rem;
}
.tan button{
  margin:0.2rem 0;
   background: #ff8936;
        color: #fff;
        padding: 0.1rem;
        border-radius: 0.1rem;
        font-size: 0.3rem;
        width: 40%;
}
::-webkit-input-placeholder{
    color:#aaa;
    padding-left:0.1rem;
}

</style>
