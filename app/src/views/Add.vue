<template>
  <div class="add">
    <my-header2>
      <!--插槽修改导航栏中的标题文字-->
      <div slot="title" style="margin:auto;">添加广告</div>
    </my-header2>
    <!--图片部分-->
    <div class="pic">
      <div class="button">
        <!-- 预览图片 -->
        <!-- <canvas ref="imgPreview" height="0" width="0"></canvas> -->
        
           <img :src="upload_url" style="height:5rem; ">
        <!-- 选择图片 -->
        <label>
          <span v-if="isShow">编辑图片</span>
          <input type="file" accept="image/*" @change="chooseImg" style="display:none;" />
        </label>
      </div>
    </div>
    <input type="text" v-model="value" />
    <button class="confirm" @click="ok">确定</button>
  </div>
</template>
<script>
//引入第二个header组件
import Header2 from "../components/Header2.vue";
export default {
  data() {
    return {
      value: "",
      imgUrlFromServer: "src",
      src: "",
      base64: "",
      isShow: true,
      type:this.$route.query.type,
      upload_url:"",
    };
  },
  methods: {
   
    ok() {
      var value = this.value;
      var type=this.type;
      var src=this.src;
      var ap_code=window.localStorage.getItem("ap_code");
      console.log(type);
      this.axios({
        url: "/api/shop/add_banner",
        method: "post",
        headers: {
          Accept: "application/json",
          token: window.localStorage.getItem("token")
        },
        data: {
          image:src,
          add_type:type,
          url:value,
          ap_code:ap_code,
        }
      })
        .then(res => {
          console.log(res);
          this.$toast(res.data.msg);
          this.$router.push("/ad");
        })
        .catch(e => {
          console.log(e);
        });
    },
    chooseImg(event) {
      this.isShow = false;
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
            this.imgUrlFromServer = response.data.imgUrl;
            console.log(response.data);
            this.upload_url=response.data.data.upload_url;
            this.src = response.data.data.src;
          });
      };

      // 预览图片
      // let canvas = this.$refs["imgPreview"];
      // let context = canvas.getContext("2d");
      // img.onload = () => {
      //   img.width = 100;
      //   img.height = 100;
        // 设置canvas大小
        // canvas.width = 100;
        // canvas.height = 100;
        // 清空canvas
        // context.clearRect(0, 0, 100, 100);
        // 画图
      //   context.drawImage(img, 0, 0, 100, 100);
      // };
    }
    // uploadImg () {
    //  this.axios.post('/api/shop/upload', {
    //     image: this.base64
    // }).then(response => {
    //     this.imgUrlFromServer = response.data.imgUrl
    // })
    // }
  },
  created(){
     var token = window.localStorage.getItem("token");
     var ap_code=window.localStorage.getItem("ap_code");
  },
  //注册子组件
  components: {
    "my-header2": Header2
  }
};
</script>
<style lang="scss" scoped>
.pic {
  width: 80%;
  background: #efefef;
  height: 5rem;
  margin: auto;
  margin-top: 1rem;
}
.pic .button {
  color: #1489e3;
  font-size: 0.5rem;
  background: #efefef;
  line-height: 5rem;

}
input {
  width: 78%;
  border-radius: 0.15rem;
  border: 1px solid #989898;
  color: #000;
  font-size: 0.5rem;
  margin-top: 0.5rem;
  padding: 0.1rem;
}
.confirm {
  background: #ff8936;
  color: #fff;
  padding: 0.2rem 1rem;
  border-radius: 0.2rem;
  font-size: 0.6rem;
  width: 80%;
  margin-top: 0.5rem;
}
</style>
