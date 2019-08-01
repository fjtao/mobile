<template>
  <div class="app-home">
    <header>
      <p @click="balance">余额查询</p>
      <!--输入电话好后出现的input-->
      <!-- <input
        v-if="isShow"
        type="text"
        style="background:#bc141e; color:#fff; width:40%;font-size:0.6rem;"
        v-model="phone"
      /> -->
      <p @click="recharge">卡密充值</p>
      <p @click="login" >商家登录</p>
      

      
      <div @click="billed">通话记录</div>
    </header>
    <div class="img">
      <div v-if="isShow" style="height:5.8rem; margin:auto; display:flex; flex-direction: column;
  justify-content: space-around;" >
        <input type="text"  v-model="phone" style="width:100%; text-align:center; font-size:0.6rem; padding:0.1rem 0; height:2rem;"  >
      </div>
      <div v-if="!isShow" class="swiper-container" style="height:5.8rem; margin:auto;">
        <div class="swiper-wrapper" style="color:#fff; width:100%;">
          <div class="swiper-slide" v-for="item in images" :key="item.i" style="background-size: cover;background-repeat: no-repeat;">
            <img :src="item.img" height="100%;" />
          </div>
        </div>
      </div>
    </div>
    <!--按钮部分-->
    <div class="button">
      <div class="math" v-for="item in list" :key="item.i" @click="button(item.num)">
        <p class="each">{{item.num}}</p>
        <p class="en">{{item.leter}}</p>
      </div>
      <div class="math" >
        <p class="green" @click="reset">重置</p>
        <p class="en"></p>
      </div>
      <div class="math" @click="button(0)">
        <p class="each">0</p>
        <p class="en">+</p>
      </div>
      <div class="math">
        <p
          class="iconfont"
          style="margin-top:0.3rem; color:#16c579; font-size:0.9rem;"
          @click="del"
        >&#xe602;</p>
      </div>
    </div>
    <!--phone按钮-->
    <div style="padding:0.3rem 0;">
      <span class="iconfont" style="color:#16c579; font-size:1rem;" @click="dial" :class="{ active: classA}">&#xe675;</span>
    </div>

  </div>
</template>
<script>
//引入第一个header组件
import header from "../components/header";
import api from "../../public/js/api.min";
import apilink from "../../public/js/apilink.min";
import Swiper from "swiper";
import "swiper/dist/css/swiper.css";
export default {
  data() {
    return {
      isShow: false,
      phone: "",
      list: [
        { num: 1, leter: "   " },
        { num: 2, leter: "ABC" },
        { num: 3, leter: "DEF" },
        { num: 4, leter: "GHI" },
        { num: 5, leter: "JKL" },
        { num: 6, leter: "MNO" },
        { num: 7, leter: "PQRS" },
        { num: 8, leter: "TUV" },
        { num: 9, leter: "WXYZ" }
      ],
      userInfo: "",
      mobile: "",
      images: [],
      classA:false,
    };
  },
  created() {
    this.getHome();
    var that = this;
    setTimeout(() => {
      that.getUserInfo();
    }, 300);
    var mobile = window.localStorage.getItem("mobile");
    var token = window.localStorage.getItem("token");
    var agent_level = window.localStorage.getItem("agent_level");
    if(window.location.search!=""){
      window.localStorage.setItem("ap_code",window.location.search.substring(1).split('=')[1])
      
    } else {
      var ap_code=window.localStorage.setItem("ap_code","")
    }
    var ap_code=window.localStorage.getItem("ap_code");
 
  },
  mounted() {
    this.get();
   this.$nextTick(() => {
          this.initSwiper()
   })
   
  },
  methods: {
    
    reset(){
      this.phone="";
      this.isShow=false;
    },
   
    // 轮播图
    initSwiper(){
       var mySwiper = new Swiper(".swiper-container", {
      observer: true,
      observeParents: true,
      observeParents: false,
      autoplay:true,
      autoplay: {
        disableOnInteraction: false
      },
      
    });
    },

    getUserInfo: function() {
      userApi.getUserInfoFun(this.setUserInfo);
    },
    setUserInfo: function(ret) {
      this.userInfo = ret.value.userInfo;
      this.mobile = ret.value.userInfo.data.mobile;
      window.localStorage.setItem("mobile", ret.value.userInfo.data.mobile);
      window.localStorage.setItem("agent_level", ret.value.userInfo.data.agent_level);
      
    },

    button(num) {
      // 
      // navigator.vibrate = navigator.vibrate ||
			// 		navigator.webkitVibrate ||
			// 		navigator.mozVibrate ||
			// 		navigator.msVibrate;
			// 	if(navigator.vibrate) {
			// 		// 支持
			// 		console.log("支持设备震动！");
			// 	}
			// 	navigator.vibrate([100, 200,]);

      // 
      this.isShow = true;
      if (this.phone.length < 12) {
        this.phone += num;
      }
    },
    dial() {
      this.classA=true;
      setTimeout(() => {
     this.classA=false;
    }, 1000);
      this.getUserInfo();
    var ap_code=window.localStorage.getItem("ap_code");
      var p = this.phone;
      var mobile = this.mobile;
      console.log(mobile);
      var ureg = /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/ ||/0\d{2,3}-\d{7,8}/ ;
      //  var reg=/0\d{2,3}-\d{7,8}/;
      if (!ureg.test(p)) {
        // console.log("手机号格式不正确");
        this.$toast.center("号码格式不正确");
        return;
      }
      

      this.axios({
        url: "/api/mobile/mobile",
        method: "post",
        data: {
          mynumber: mobile, //主叫号码
          callnumber: p, //被叫号码
          ap_code:ap_code
        }
      })
        .then(res => {
          console.log(res.data.data);
          this.$toast(res.data.msg);
          var img = res.data.data.img;
          var phone = res.data.data.mobile;
          
        
            this.$router.push({
            path: "/online",
            query: { phone: phone, img: img }
          });
          

          
        })
        .catch(e => {
          console.log(e);
        });
    },
    get() {
      var mobile = window.localStorage.getItem("mobile");
    var ap_code=window.localStorage.getItem("ap_code");
     var agent_level = window.localStorage.getItem("agent_level");
      this.axios({
        url: "/api/mobile/get_members_by_mobile",
        method: "post",
        data: {
          mobile: mobile,
          ap_code:ap_code,
          agent_level:agent_level,
        }
      })
        .then(res => {
          console.log(res.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    // 删除按妞
    del() {
      
      if(this.phone.length>1){
          this.phone = this.phone.substr(0, this.phone.length - 1);
          
        }else {
          this.isShow=false;
          this.phone="";
        };
       
console.log(this.phone.length);
        // this.phone = this.phone.substr(0, this.phone.length - 1);
        
    },
    login() {
      var token = window.localStorage.getItem("token");
      if(token!==""){
        this.$router.push("/business");
      }else{
        this.$router.push("/login");
      }
      
    },
    balance() {
      this.$router.push("/balance");
    },
    recharge() {
      this.$router.push("/recharge");
    },
     billed(){
            this.$router.push("/billed");
        },
    //轮播图
    getHome() {
      var mobile = window.localStorage.getItem("mobile");
    var ap_code=window.localStorage.getItem("ap_code");
      this.axios({
        url: "/api/mobile/get_home_banner",
        method: "post",
        data: {
          mobile: mobile,
          type: 1,
          ap_code:ap_code,
        }
      })
        .then(res => {
          console.log(res.data);
          this.images = res.data.data;
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  //注册子组件
  components: {
    "my-header1": header
  },
  watch:{
    
  },
};
</script>
<style lang="scss" scoped>
::-webkit-input-placeholder{
    color:#aaa;
    font-size: 0.45rem;
   text-align: center;
}
.app-home {
  height: 100%;
}
.app-home .img img {
  width: 100%;
  
}
.button {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.button .math {
  width: 33%;
  height: 1.5rem;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}

.button .math .each {
  color: #333;
  font-size: 0.5rem;
  margin-top: 0.5rem;
}
/*图标和粘贴的字体颜色*/
.button .math .green {
  color: #16c579;
  margin-top: 20px;
  font-size: 0.5rem;
}
.button .math .en {
  font-size: 0.45rem;
  color: #ddd;
}
// 头部
header {
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
  font-size: 0.43rem;
}
.active{
  color:rgba(35,125,47,1) !important;
}
</style>


