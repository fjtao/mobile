<template>
  <!--广告管理页面-->
  <div class="ad">
    <!--引入的公用头部导航栏-->
    <my-header2>
      <!--插槽修改导航栏中的标题文字-->
      <div slot="title">广告管理</div>
    </my-header2>
    <!--页面部分-->
    <div class="top">
      <div @click="display" :class="{active:num==1}">广告列表</div>
      <div @click="add" :class="{active:num==2}">添加广告</div>
    </div>
    <!--广告列表下的页面-->
    <div v-show="show">
      <!--拨号页面广告-->
      <div class="middle" @click="tone">
        <div class="font">拨号页面广告</div>
        <div
          v-if="unflod"
          class="iconfont"
          style="font-size: 0.8rem; color: #ddd;margin-right: 0.3rem;line-height: 1rem"
        >&#xe76a;</div>
        <div
          v-else
          class="iconfont"
          style="font-size: 0.8rem; color: #ddd;margin-right: 0.3rem;line-height: 1rem"
        >&#xe61c;</div>
      </div>
      <!--点击显示的图片-->
      <div
        v-show="block"
        style="width:90%; margin:auto; padding:0.3rem;"
        v-for="(item,i) in bh"
        :key="item.id"
      >
        <!-- <img :src="item.image"  style="width:100%;" alt=""> -->
        <p style=" position: relative;" @click="delImg(item.id,i)">
          <span
            class="iconfont"
            style="font-size:0.5rem;font-weight:900; color:red;  position: absolute;top:0; right:0; background:#fff;"
          >&#xe607;</span>
          <img :src="item.image" style="width:100%;" alt />
        </p>
        <div style="font-size:0.5rem; margin:0.2rem 0; text-align:left;">图片链接:{{item.url}}</div>
      </div>
      <!--回拨页面广告-->
      <div class="middle" @click="spread">
        <div class="font">回拨页面广告</div>
        <div
          v-if="hubo"
          class="iconfont"
          style="font-size: 0.8rem; color: #ddd;margin-right: 0.3rem;line-height: 1rem"
        >&#xe76a;</div>
        <div
          v-else
          class="iconfont"
          style="font-size: 0.8rem; color: #ddd;margin-right: 0.3rem;line-height: 1rem"
        >&#xe61c;</div>
      </div>
      <!--点击显示的图片-->
      <div
        v-show="hidden"
        style="width:90%; margin:auto; padding:0.3rem;"
        v-for="(item,i) in hu"
        :key="item.id"
      >
        <!-- <img :src="item.image" style="width:100%;" alt /> -->
        <p style=" position: relative;" @click="delhu(item.id,i)">
          <span
            class="iconfont"
            style="font-size:0.5rem;font-weight:900; color:red;  position: absolute;top:0; right:0; background:#fff;"
          >&#xe607;</span>
          <img :src="item.image" style="width:100%;" alt />
        </p>
        <div style="font-size:0.5rem; margin:0.2rem 0; text-align:left;">图片链接:{{item.url}}</div>
      </div>
    </div>
    <!--添加广告下的页面-->
    <div v-show="isShow">
      <!--添加拨号页面广告-->
      <div class="middle">
        <div class="font" style="font-weight:100;">
          <router-link :to="{path:'/add',query:{type:1}}" style=" color: #666;">拨号页面广告</router-link>
        </div>
      </div>
      <!--添加回拨页面广告-->
      <div class="middle">
        <div class="font" style="font-weight:100;">
          <router-link :to="{path:'/add',query:{type:2}}" style=" color: #666;">回拨页面广告</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//引入第二个header组件
import Header2 from "../components/Header2.vue";
export default {
  data() {
    return {
      show: true,
      isShow: false,
      num: 1,
      unflod: true,
      hubo: true,
      bh: [],
      hu: [],
      block: true,
      hidden: true
    };
  },
  methods: {
    // 删除拨号页面图片
    delImg(id,i) {
      this.bh.splice(i,1);
      var id = id;
      console.log(id);
      this.axios({
        url: "/api/shop/del_banner",
        method: "post",
        headers: {
          Accept: "application/json",
          token: window.localStorage.getItem("token")
        },
        data: {
          id: id
        }
      })
        .then(res => {
          if (res.data.code == 0) {
            this.$toast.center(res.data.msg);
          } else {
            this.$toast.center(res.data.msg);
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    delhu(id,i){
      this.hu.splice(i,1);
      var id = id;
      console.log(id);
      this.axios({
        url: "/api/shop/del_banner",
        method: "post",
        headers: {
          Accept: "application/json",
          token: window.localStorage.getItem("token")
        },
        data: {
          id: id
        }
      })
        .then(res => {
          if (res.data.code == 0) {
            this.$toast.center(res.data.msg);
          } else {
            this.$toast.center(res.data.msg);
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    // 拨号页面点击事件
    tone() {
      this.unflod = !this.unflod;
      var ap_code = window.localStorage.getItem("ap_code");
      this.axios({
        url: "/api/shop/get_banner",
        method: "post",
        headers: {
          Accept: "application/json",
          token: window.localStorage.getItem("token")
        },
        data: {
          ap_code: ap_code
        }
      })
        .then(res => {
          
          this.bh = res.data.data.bh;
          if (this.unflod == true) {
            this.block = false;
          } else {
            this.block = true;
          }
          // if(res.data.code=403){
          //    this.$toast.center(res.data.msg);
          // }
        })
        .catch(e => {
          console.log(e);
        });
    },
    // 回拨页面点击事件
    spread() {
      this.hubo = !this.hubo;
      var ap_code = window.localStorage.getItem("ap_code");
      this.axios({
        url: "/api/shop/get_banner",
        method: "post",
        headers: {
          Accept: "application/json",
          token: window.localStorage.getItem("token")
        },
        data: {
          ap_code: ap_code
        }
      })
        .then(res => {
          console.log(res.data.data);
          this.hu = res.data.data.hu;
          if (this.hubo == true) {
            this.hidden = false;
          } else {
            this.hidden = true;
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    display() {
      this.show = true;
      this.isShow = false;
      this.num = 1;
    },
    //添加的点击事件
    add() {
      this.show = false;
      this.isShow = true;
      this.num = 2;
    }
  },
  created() {
    var ap_code = window.localStorage.getItem("ap_code");
    var token = window.localStorage.getItem("token");
  },
  //注册子组件
  components: {
    "my-header2": Header2
  }
};
</script>
<style lang="scss" scoped>
.top {
  margin-top: 0.2rem;
  font-size: 0.5rem;
  display: flex;
  justify-content: space-around;
  border-bottom: 0.3rem solid #efefef;
}
// 广告列表的文字部分
.top > div {
  margin: 0.2rem 0;
  width: 30%;
  color: #626262;
  padding: 0.3rem 0.2rem;
}
.active {
  border-bottom: 1px solid #cf9369;
}
// .top>div:hover{
//      border-bottom:1px solid #cf9369;
// }
.middle {
  padding: 0.3rem 0;
  border-bottom: 0.3rem solid #efefef;
  height: 1rem;
  display: flex;
  justify-content: space-around;
}
.middle .font {
  font-size: 0.6rem;
  font-weight: 600;
  color: #666;
  margin: auto;
  margin-left: 3.2rem;
}
</style>
