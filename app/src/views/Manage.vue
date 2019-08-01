<template>
  <div class="manage"  >
    <my-header2>
      <!--插槽修改导航栏中的标题文字-->
      <div slot="title">卡密管理</div>
    </my-header2>
    <!--已充值部分-->
    <div class="top">
      <div @click="selectType(0)" :class="{hover:select==0}">全部</div>
      <div @click="has(2)" :class="{hover:select==2}">已充值</div>
      <div @click="no(1)" :class="{hover:select==1}">未充值</div>
    </div>
    <!--全部下面的部分-->
    <div class="all" v-show="isShow">
      <!--开始卡号-->
      <div class="start">
        <div style="margin-top:0.2rem;">开始卡号</div>
        <input type="text" placeholder="开始卡号" v-model="start"  />
      </div>
      <!--结束卡号-->
      <div class="start">
        <div style="margin-top:0.2rem;">结束卡号</div>
        <input type="text" placeholder="结束卡号" v-model="end" />
      </div>
      <!--卡类型 卡状态部分-->
      <div class="type" style="margin-left:0.2rem;">
        <!-- <div style="margin-top:0.2rem;">卡类型</div> -->
        <!-- <select>
          <option value="全部">全部</option>
          <option value></option>
          <option value></option>
        </select> -->
        <div style="margin-top:0.2rem; margin-left:0.1rem;">卡状态</div>
        <select name style="margin-left:1.1rem;"  v-model="type" @blur="changeType($event)">
          <option value="0">全部</option>
          <option value="1">未激活</option>
          <option value="2">已激活</option>
          <option value="3">冻结</option>
        </select>
      </div>
      <!--快速查询 搜索结果-->
      <div class="query">
        <button @click="btn">快速查询</button>
        <div>搜索结果: {{total}}</div>
      </div>
      <!--卡密 套餐 有效期 状态-->
      <div>
        <div class="card">
          <p>卡号/卡密</p>
          <p>套餐</p>
          <p>有效期</p>
          <p>状态</p>
        </div>
        <!--卡号 话费 时间 状态的内容部分-->
        <div class="content" v-for="item in list" :key="item.i">
          <div class="number">
            <div>
              <span>卡号:</span>
              <span>{{item.number}}</span>
            </div>
            <div class="km">
              <div>
                <span>卡密:</span>
                <span >{{item.pass}}</span>
              </div>
              <div class="cz"  v-show="isFalae" @click="Parentpay($event)">
                <button>充值</button>
              </div>
            </div>
          </div>
          <div style="margin-top:0.4rem;">{{item.price}}元话费</div>
          <div style="margin-top:0.2rem;">
            <p>{{item.end_time}}</p>
           
          </div>
          <div style="width:20%; margin-top:0.4rem;">{{arr[item.status]}}</div>
        </div>
      </div>
    </div>
    <!--已充值部分-->
    
    <div class="has-app" v-show="show">
    <div class="has">
      <select>
        <option value="手机号">手机号</option>
        <option value></option>
        <option value></option>
      </select>
      <input type="text"  v-model="num" style="font-size:0.5rem;"/>
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
    <!--未充值部分-->
    <!-- ref等号后面是子组件中的方法名 -->
    <my-noprepaid v-show="nopre" @no="no" :list1="list1" ref="pay"></my-noprepaid>
  </div>
</template>
<script>
//引入第二个header组件
import Header2 from "../components/Header2.vue";
import Has from "../components/Has.vue";
import NoPrepaid from "../components/NoPrepaid.vue";
export default {
  data() {
    return {
      select:0,
      isShow: true,
      start: "",
      end: "",
      show: false,
      nopre: false,
      // type: 0,
      // 全部的信息
      list: [],
      list1: [], // 未充值
      list2: [], //已充值
      arr:["未激活","已激活","冻结"],
      total:"",
      isFalae:false,
      num:"",
      
    };
  },
  methods: {
    // 调用NoPrepaid中的方法
   Parentpay(event){
      this.$refs.pay.pay(event);
    },
    
    // 调用子组件的方法
    parent () {
            this.$refs.search.search(); // search是子组件的方法
            this.$refs.search.list2;
    },
    //状态value
    changeType(e) {
      this.type = e.target.value;
      console.log(this.type);
    },
    selectType(type) {
       this.type=type;
      console.log(type);
      this.select = 0;
      if (this.select == 0) {
        this.isShow = true;
        this.show = false;
        this.nopre = false;
      }
      var ap_code=window.localStorage.getItem("ap_code");
      this.axios({
        url: "/api/ka_mi/get_ka_mi_list",
        method: "post",
        data: {
          type: type,
          ap_code:ap_code,
        },
        headers: {
          Accept: "application/json",
          token: window.localStorage.getItem("token")
        }
      })
        .then(res => {
          console.log(res.data.data);
          this.list = res.data.data.list;
          if(res.data.data.list.status==1){
            this.isFalae=true;
           
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    has(type) {
      this.type = type;
      console.log(this.type)
      this.select = 2;
      var ap_code=window.localStorage.getItem("ap_code");
      if (this.select == 2) {
        this.isShow = false;
        this.show = true;
        this.nopre = false;
      }
      this.axios({
        url: "/api/ka_mi/get_ka_mi_list",
        method: "post",
        data: {
          type: type,
          ap_code:ap_code,
        },
        headers: {
          Accept: "application/json",
          token: window.localStorage.getItem("token")
        }
      })
        .then(res => {
          console.log(res.data.data);
          this.list2 = res.data.data.list;
        })
        .catch(e => {
          console.log(e);
        });
    },
    no(type) {
      
      this.type = type;
      console.log(this.type)
      this.select = 1;
      if (this.select == 1) {
        this.isShow = false;
        this.show = false;
        this.nopre = true;
        
      }
       var ap_code=window.localStorage.getItem("ap_code");
      this.axios({
        url: "/api/ka_mi/get_ka_mi_list",
        method: "post",
        data: {
          type: type,
          ap_code:ap_code,
        },
        headers: {
          Accept: "application/json",
          token: window.localStorage.getItem("token")
        }
      })
        .then(res => {
          console.log(res.data.data);
          this.list1 = res.data.data.list;
        })
        .catch(e => {
          console.log(e);
        });
    },

    btn() {
      var start = this.start;
      var end = this.end;
      var type=this.type;
      var ap_code=window.localStorage.getItem("ap_code");
      console.log(start);
      this.axios({
        method: "post",
        url: "/api/ka_mi/get_ka_mi_list",
        headers: {
          Accept: "application/json",
          token: window.localStorage.getItem("token")
        },
        data: {
          start_num: start,
          end_num: end,
          type:type,
          ap_code:ap_code,
        }
      }).then(res => {
        console.log(res);
        this.total=res.data.data.total;
        this.list = res.data.data.list;
      });
    },
    // 搜索手机号
    search(){
      var num=this.num;
      var ap_code=window.localStorage.getItem("ap_code");
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
          type:2,
          ap_code:ap_code,
        }
      }).then(res => {
        console.log(res);
        this.list2 = res.data.data.list;
        this.$toast(res.data.msg)
      });
    }
  },
  created() {
    var ap_code=window.localStorage.getItem("ap_code");
    var token = window.localStorage.getItem("token");
    console.log(token);
    this.selectType(0);
    
  },
  //注册子组件
  components: {
    "my-header2": Header2,
    "my-has": Has,
    "my-noprepaid": NoPrepaid
  }
};
</script>
<style lang="scss" scoped>
.manage{
  
  height: 100%;  
  
}

::-webkit-input-placeholder {
  text-align: center;
  color: #c3c3c3;
}
.top {
  margin: 0.2rem 0;
  font-size: 0.45rem;
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #eee;
}
.top > div {
  padding: 0.2rem 0.3rem;
}

.hover {
  border-bottom: 1px solid #ff8936;
}
//全部下面部分
.all .start {
  font-size: 0.45rem;
  display: flex;
  justify-content: space-around;
  margin: 0.2rem 0;
}
.all .start input {
  width: 68%;
  border: 1px solid #989898;
  border-radius: 0.2rem;
  text-align: center;
}
//卡类型 卡状态部分
.type {
  font-size: 0.45rem;
  display: flex;
  // justify-content: space-around;
}
.type select {
  border: 1px solid #989898;
  border-radius: 0.2rem;
  width: 25%;
  padding: 0.1rem 0.4rem;
  color: #c3c3c3;
  appearance: none; /*去掉下拉箭头*/
  /*在选择框的最右侧中间显示小箭头图片*/
  background: url("../../public/img/xiala.png") no-repeat scroll right center
    transparent;
  background-size: 0.6rem;
  padding-right: 0.2rem;
}
.type select option {
  text-align: center;
}
//快速查询部分
.query {
  display: flex;
  justify-content: space-around;
}
.query > div {
  font-size: 0.45rem;
  padding-top: 0.8rem;
  margin-left: -2rem;
}
.query button {
  background: #ff8936;
  color: #fff;
  padding: 0.1rem 0.5rem;
  border-radius: 0.2rem;
  font-size: 0.45rem;
  width: 50%;
  margin-top: 0.5rem;
}
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
  padding: 0.3rem 0.2rem;
}
.content > div {
  width: 25%;
}
.content .number {
  text-align: left;
  width: 40%;
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
.has select {
  border: 1px solid #989898;
  border-radius: 0.2rem;
  width: 25%;
  padding: 0.1rem;
  color: #333;
  font-size: 0.45rem;
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
  padding: 0.1 0.2rem;
  text-align: center;
}
.has div {
  font-size: 0.45rem;
  border: 1px solid #989898;
  padding: 0.2rem;
  border-radius: 0.2rem;
  color: #c3c3c3;
}
// 卡密 套餐 有效期 状态
.has .card {
  margin: 0.3rem 0;
  padding: 0.3rem 0;
  font-size: 0.45rem;
  display: flex;
  justify-content: space-around;
  background: #efefef;
}

</style>
