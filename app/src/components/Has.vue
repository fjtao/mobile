<template>
  <div class="has-app">
    <!--已充值部分-->
    <div class="has">
      <select>
        <option value="手机号">手机号</option>
        <option value></option>
        <option value></option>
      </select>
      <input type="text"  v-model="num" style="font-size:0.3rem;"/>
      <div @click="search">搜索</div>
    </div>
    <!--下面部分-->
    <div class="card">
      <p>卡号/手机号</p>
      <p>套餐</p>
      <p>激活时间</p>
    </div>
    <!--卡号 话费 时间 状态的内容部分-->
    <div class="content" v-for="item in list2" :key="item.i">
      <div class="number">
        <div>
          <span>卡号:</span>
          <span>{{item.number}}</span>
        </div>
        <div class="km">
          <div>
            <span>手机号:</span>
            <span>{{item.mobile}}</span>
          </div>
          
        </div>
      </div>
      <div style="margin-top:0.4rem;">{{item.price}}元话费</div>
      <div style="margin-top:0.2rem;">
        <p>{{item.end_time}}</p>
        <!-- <p>23:59:59</p> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["list2"],
  data() {
    return {
      num:"",
    };
  },
  methods: {
    childMethod() {
      // console.log("child");
      this.$emit("has");
    },
    search(){
      var num=this.num;
      var type=this.type;
      console.log(num);
      this.axios({
        method: "post",
        url: "/api/ka_mi/get_ka_mi_list",
        headers: {
          Accept: "application/json",
          token: window.localStorage.getItem("token")
        },
        data: {
          mobile:num,
          type:type,
        }
      }).then(res => {
        console.log(res);
        
        this.list2 = res.data.data.list;
      });
    }
  },
  created() {
    var token = window.localStorage.getItem("token");
    //this.childMethod();
  }
};
</script>
<style lang="scss" scoped>
//已充值
.has select {
  border: 1px solid #989898;
  border-radius: 0.2rem;
  width: 25%;
  padding: 0.1rem;
  color: #333;
  font-size: 0.5rem;
  appearance: none; /*去掉下拉箭头*/
  /*在选择框的最右侧中间显示小箭头图片*/
  background: url("../../public/img/xiala.png") no-repeat scroll right center
    transparent;
  background-size: 0.6rem;
  padding-right: 0.2rem;
}
.has {
  display: flex;
  justify-content: space-around;
  padding: 0 0.2rem;
  margin: 0.3rem 0;
}
.has input {
  width: 47%;
  border: 1px solid #989898;
  border-radius: 0.2rem;
  padding: 0.2rem;
}
.has div {
  font-size: 0.5rem;
  border: 1px solid #989898;
  padding: 0.2rem;
  border-radius: 0.2rem;
  color: #c3c3c3;
}
// 卡密 套餐 有效期 状态
.card {
  margin: 0.3rem 0;
  padding: 0.3rem 0;
  font-size: 0.5rem;
  display: flex;
  justify-content: space-around;
  background: #efefef;
}
// 卡号 话费 时间 状态的内容部分
.content {
  display: flex;
  font-size: 0.4rem;
  justify-content: space-around;
   padding: 0.3rem 0.2rem;
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
</style>
