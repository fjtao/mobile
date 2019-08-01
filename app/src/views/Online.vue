<template>
  <div class="online">
    <div style="color:#fff; font-size:1rem; margin:0.6rem 0;">{{phone}}</div>
    <div>
      <div class="swiper-container" style="height:5.7rem; margin:auto;">
        <div class="swiper-wrapper" style="color:#fff; width:100%;">
          <div class="swiper-slide" v-for="item in list" :key="item.i" style="background-size: cover;background-repeat: no-repeat;">
            <img :src="item.img" alt height="100%;" />
          </div>
        </div>
      </div>
    </div>
    <div style="color:#fff; font-size:0.5rem; line-height:0.5rem; margin-top:0.5rem;">您即将收到以0838、028、0816开头的回拨电话，请放心接听！</div>
    <div style="margin:0.6rem 0;">
      <!-- <img src="../../public/img/end.png" width="20%" @click="back"  style="background:#fff;"/> -->
      <span class="iconfont" style="color:#fff; background:red;  border-radius: 50%; " @click="back" >&#xe630; </span>
    </div>
  </div>
</template>
<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.css";
export default {
  data() {
    return {
      img: this.$route.query.img,
      phone: this.$route.query.phone,
      timer: "",
      value: 0,
      list: []
    };
  },
  methods: {
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
    get() {
      this.value++;
      this.$router.go(-1);
    },

    back() {
      this.$router.go(-1);
    },
    get_home_banner() {
      var mobile = window.localStorage.getItem("mobile");
     var ap_code=window.localStorage.getItem("ap_code");
      this.axios({
        url: "/api/mobile/get_home_banner",
        method: "post",
        data: {
          mobile: mobile, //主叫号码
          type: 2,
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
    this.get_home_banner();
  },
  mounted() {
   this.$nextTick(() => {
          this.initSwiper()
   })
   

    this.timer = setTimeout(this.get, 7000);
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  }
};
</script>
<style lang="scss" scoped>
.online {
  background: #000;
  padding: 0.5rem;
  height: 100%;
  line-height: 2.5rem;
  padding-bottom: 3rem;
}


</style>
