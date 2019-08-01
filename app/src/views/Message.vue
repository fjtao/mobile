<template>
  <div class="message">
    <my-header2>
      <!--插槽修改导航栏中的标题文字-->
      <div slot="title">商家信息</div>
    </my-header2>
    <!--input框部分-->
    <div class="input">
      <div class="flex">
        <div class="name">商家帐号</div>
        <input type="text" v-model="user_login"/>
        <div class="name">不可改</div>
      </div>
      <!--商家名字-->
      <div class="sj">
        <div class="name" style="margin:0.2rem;">商家名字</div>
        <input type="text" v-model="user_nickname" />
      </div>
      <div class="sj">
        <div class="name" style="margin:0.2rem;">修改密码</div>
        <input type="password" v-model="user_pass" />
      </div>
      <div class="sj">
        <div class="name" style="margin:0.2rem;">确认密码</div>
        <input type="password" v-model="re_user_pass" />
      </div>
      <!-- <div class="sj">
        <div class="name" style="margin:0.2rem;">商家类型</div>
        <select
          style="padding-left:1.6rem; width:55%"
          v-model="shop_type"
          @change="changeShop($event)"
        >
          <option :value="item.id" v-for="item in cate" :key="item.i">{{item.name}}</option>
        </select>
      </div> -->
      <!--商家店标-->
      <div class="sj">
        <div class="name" style="margin:0.2rem;">商家店标</div>
        <div style=" display:flex; margin-right:0.2rem;">
          <!-- <img src="../../public/img/2.png" alt=""> -->
          <img :src="shop_logo" alt  style=" height:3rem; "/>
        </div>
        <div class="name" >
          <label>
            <input type="file" accept="image/*" @change="logo" style="display:none;" />
            <span
              style="display:block;border:1px solid #989898; background:#fff; padding: 0.1rem 0.2rem;border-radius:0.2rem; font-size:0.4rem;"
            >上传</span>
          </label>
        </div>
      </div>
      <!--商家地址-->
      <!-- <div class="sj">
        <div class="name" style="margin:0.2rem; width:3.8rem;">商家地址</div>
        <div style="width:3rem;">
          <img src="../../public/img/3.png"  style="width:100%;" />
        </div>
        <div
          class="name"
          style="margin-left:0.2rem; font-size:0.4rem; padding:0.2rem;"
        >河南省郑州市商务内环路商务东一街</div>
      </div> -->
    </div>
    <!--商家示图-->
    <!-- <div class="st">
      <p style="text-align:left; margin-left:0.2rem; margin-top:0.2rem;">商家示图</p> -->
      <!--图片部分-->
      <!-- <div class="img" style=" display:flex; flex-wrap: wrap;">
        <div style="display:flex; width:4rem;  margin:0.2rem 0.3rem;" v-for="(item,i) in shop_imgs" :key="item.i"> -->
          <!-- <img src="../../public/img/4.png" alt=""> -->
          <!-- <p style=" position: relative;" @click="delImg(i)">
            <span class="iconfont" style="font-size:0.5rem;font-weight:900; color:red;  position: absolute;top:0; right:0;" >&#xe607;</span>
            <img :src="item"  style=" height:3rem; margin-left:0.2rem;"/>
          </p>
          
        </div>
        <div style=" background: #efefef;">
          <label>
            <input type="file" accept="image/*"  style="display:none;"  @change="sketch"/>
            <span class="iconfont" style="color:#dde0df; font-size:3rem;">&#xe62c;</span>
          </label>
        </div>
      </div> -->
      <!--营业时间-->
      <!-- <div class="sj">
        <div class="name" style="margin:0.2rem;">营业时间</div>
        <input type="text" style="width:68%;" v-model="start_shop_time" />
      </div> -->
      <!--客服电话-->
      <!-- <div class="sj">
        <div class="name" style="margin:0.2rem;">客服电话</div>
        <input type="text" style="width:68%;" v-model="server_mobile" />
      </div> -->
      <!--商家介绍-->
      <!-- <div>
        <div style="margin:0.2rem; display:flex; justify-content: flex-start; ">商家介绍</div>
        <textarea
          v-model="shop_info "
          id
          cols="35"
          rows="2"
          style="border:1px solid #989898; border-radius:0.2rem; padding:0.2rem;"
        ></textarea>
      </div> -->
      <button class="submit" @click="submit">提交修改</button>
      <button class="submit" @click="clear">退出登录</button>
    <!-- </div> -->
  </div>
</template>
<script>
//引入第二个header组件
import Header2 from "../components/Header2.vue";
export default {
  data() {
    return {
      src: "",
      cate: "",
      user_nickname: "",
      user_pass: "",
      re_user_pass: "",
      shop_type: "", 
      shop_logo: "",//商家logo
      img:"",//商家图片
      shop_imgs: [], //商家图片集
      start_shop_time: "", //营业时间
      address: "", //商家地址
      server_mobile: "", //客服电话
      shop_info: "", //商家介绍
      user_login:"" //后台返回来的用户账户
    };
  },
  methods: {
    // 退出登录
    clear(){
      window.localStorage.clear();
      this.$router.push("/login");
    },
    changeShop(e) {
      this.shop_type = e.target.value;
      console.log(this.shop_type);
    },
    // 商家的logo 
    logo(event) {
     var ap_code=window.localStorage.getItem("ap_code");
      let file = event.target.files[0];
      let reader = new FileReader();
      let img = new Image();
      // 读取图片
      reader.readAsDataURL(file);
      // 读取完毕后的操作
      reader.onloadend = e => {
        img.src = e.target.result;
        // 这里的e.target就是reader
        console.log(img.src);
        // reader.result就是图片的base64字符串
        this.base64 = reader.result;
         
        this.axios
          .post("/api/shop/upload", {
            image: this.base64,
            ap_code:ap_code,
          })
          .then(response => {
            
            console.log(response.data);
            
            this.shop_logo = response.data.data.upload_url;
          });
      };
    },
    //商家的示意图
    sketch(event){
      var ap_code=window.localStorage.getItem("ap_code");
        let file = event.target.files[0];
      let reader = new FileReader();
      let img = new Image();
      // 读取图片
      reader.readAsDataURL(file);
      // 读取完毕后的操作
      reader.onloadend = e => {
        img.src = e.target.result;
        // 这里的e.target就是reader
        console.log(img.src);
        // reader.result就是图片的base64字符串
        this.base64 = reader.result;
        this.axios
          .post("/api/shop/upload", {
            image: this.base64,
            ap_code:ap_code,
          })
          .then(response => {
            console.log(response.data);
            this.img = response.data.data.upload_url;
            this.shop_imgs = this.shop_imgs.concat(this.img);
     
            console.log(this.shop_imgs);
          });
      };
    },
    // 删除图片
    delImg(i){
       
          this.shop_imgs.splice(i,1);
                
      },
    // 商家类型
    shop() {
      var ap_code=window.localStorage.getItem("ap_code");
      this.axios({
        method: "post",
        url: "/api/shop/get_shop_cate",
        headers: {
          Accept: "application/json",
          token: window.localStorage.getItem("token")
        },
        data: {
          ap_code:ap_code,
        }
      }).then(res => {
        console.log(res);
        this.cate = res.data.data;
      });
    },
    // 提交
    submit() {
        var user_nickname=this.user_nickname;
        var user_pass=this.user_pass;
        var re_user_pass=this.re_user_pass;
        var shop_type=this.shop_type;
        var shop_logo=this.shop_logo;
        var shop_imgs=this.shop_imgs;
        var start_shop_time=this.start_shop_time;
        var address=this.address;
        var server_mobile=this.server_mobile;
        var shop_info=this.shop_info;
       var ap_code=window.localStorage.getItem("ap_code");
        console.log(user_nickname);
      this.axios({
        method: "post",
        url: "/api/shop/edit_shop",
        headers: {
          Accept: "application/json",
          token: window.localStorage.getItem("token")
        },
        data: {
          user_nickname: user_nickname,
          user_pass: user_pass,
          re_user_pass: re_user_pass,
          shop_type: shop_type,
          shop_logo: shop_logo,
          shop_imgs: shop_imgs,
          start_shop_time: start_shop_time, //营业时间
          address: address, //商家地址
          server_mobile: server_mobile, //客服电话
          shop_info: shop_info, //商家介绍
          ap_code:ap_code,
        }
      }).then(res => {
        console.log(res);
        this.$toast(res.data.msg);
        this.cate = res.data.data;
        console.log(res.data);
        if(res.data.code==0){
            window.localStorage.setItem('token','');
            this.$toast('token');
            this.$router.push("/login")
        }
        if(res.data.code==403){
            this.$toast(res.data.msg);
        }
      });
    },
    // 页面加载根据用户账号显示信息
    user(){
    var ap_code=window.localStorage.getItem("ap_code");
        this.axios({
            method:"post",
            url:"/api/shop/get_shop_info",
            headers:{Accept: "application/json",
          token: window.localStorage.getItem("token")},
            data:{
              ap_code:ap_code,
            }
        }).then(res=>{
            console.log(res.data);
            this.user_nickname=res.data.data.user_nickname;
        this.shop_type=res.data.data.shop_type;
        this.shop_logo=res.data.data.shop_logo;
        this.shop_imgs=res.data.data.shop_imgs;
        this.start_shop_time=res.data.data.start_shop_time;
        this.address=res.data.data.address;
        this.server_mobile=res.data.data.server_mobile;
        this.shop_info=res.data.data.shop_info;
        this.user_login=res.data.data.user_login;
        });
    }
  },
  created() {
    var ap_code=window.localStorage.getItem("ap_code");
    var token = window.localStorage.getItem("token");
    this.shop();
    this.user();
  },
  watch:{

  },
  //注册子组件
  components: {
    "my-header2": Header2
  }
};
</script>
<style lang="scss" scoped>
.message{
 
}
.input {
  padding: 0 0.3rem;
  // border-bottom: 5px solid #eee;
}
.flex {
  display: flex;
  justify-content: space-around;
  margin: 0.5rem 0;
  font-size: 0.5rem;
}
input,
select {
  border: 1px solid #989898;
  padding: 0.1rem 0.2rem;
  border-radius: 0.2rem;
  text-align: center;
  width: 50%;
  background: #fff;
}

// input框两边的字体居中
.name {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
//统一样式的商家名字等部分
.sj {
  display: flex;
  font-size: 0.5rem;
  margin: 0.5rem 0;
}
// 商家示意图部分
.st {
  padding: 0.2rem;
  font-size: 0.5rem;
}
.st .img {
  display: flex;
  margin: 0.3rem 0;
}
.st .img > div {
  margin: 0 0.2rem;
}
// 提交按钮
.submit {
  background: #ff8936;
  color: #fff;
  padding: 0.2rem 1rem;
  border-radius: 0.2rem;
  font-size: 0.45rem;
  width: 90%;
  margin-top: 0.5rem;
}
</style>
