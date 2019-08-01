<template>
  <div class="billed">
    <my-header2>
      <!--插槽修改导航栏中的标题文字-->
      <div slot="title">通话记录</div>
    </my-header2>
    <!--被叫 时间 时长 消费-->
    <div class="top">
      <ul>
        <li style="width:30%;">被叫</li>
        <li style="width:27%;">时间</li>
        <li>时长</li>
        <li>消费</li>
      </ul>
    </div>
    <div>
      <ul style="border-bottom:1px solid #333;" v-for="item in list" :key="item.i">
        <li style="width:30%; display:flex;justify-content: space-around; ">
          <span class="iconfont" style="color:#16c579; font-size:0.2rem;" >&#xe675;</span>
          <span @click="bo($event)"  >{{item.callnumber}}</span>
        </li>
        <li style="width:27%;">{{item.create_time}}</li>
        <li>{{item.duration}}</li>
        <li>{{item.price}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
//引入第二个header组件

import Header2 from "../components/Header2.vue";
export default {
  data() {
    return {
      list: [],
      callnumber: "", //被叫
      duration: "", //时长
      create_time: "", //时间
      price: "", //消费
      
    };
  },
  methods: {
    
    // 拨号
    bo(e) {
      
      var mobile = window.localStorage.getItem("mobile");
      var p = e.target.innerHTML;
       var ap_code=window.localStorage.getItem("ap_code");
       this.$router.push({
            path: "/online",query: { phone: p,}
          });
      this.axios({
        url: "/api/mobile/mobile",
        method: "post",
        data: {
          mynumber: mobile, //主叫号码
          callnumber: p, //被叫号码
          ap_code:ap_code,
        }
      })
        .then(res => {
          console.log(res.data.data);
          this.$router.push({
            path: "/online",
            query: { phone: phone}
          });
        })
        .catch(e => {
          console.log(e);
        });
    },
    get() {
      var mobile = window.localStorage.getItem("mobile");
       var ap_code=window.localStorage.getItem("ap_code");
      this.axios({
        url: "/api/mobile/get_mobile_log",
        method: "post",
        data: {
          mobile: mobile,
          ap_code:ap_code,
        }
      })
        .then(res => {
          console.log(res.data.data);
         
          this.list = res.data.data;
          console.log(this.list);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  created() {
    var ap_code=window.localStorage.getItem("ap_code");
    var mobile = window.localStorage.getItem("mobile");
    var token = window.localStorage.getItem("token");
    this.get();
  },
  //注册子组件
  components: {
    "my-header2": Header2
  }
};
</script>
<style lang="scss" scoped>
ul {
  margin: 0.3rem 0;
  display: flex;
  font-size: 0.45rem;
  justify-content: space-around;
  border-bottom: 0.1rem solid #ddd;
  padding: 0.2rem 0;
}
li {
  font-size: 0.45rem;
}
</style>
