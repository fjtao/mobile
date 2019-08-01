<template>
    <div class="search">
        <my-header1></my-header1>
        <div class="input">
            <!-- <span class=" iconfont" style="font-size:1rem;float:left;">&#xe600;</span> -->
            <input type="text"  placeholder="号码或名字">
        </div>
        <!--k部分-->
        <div class="service">
            <div class="letter">k</div>
            <!--客服助手文字部分-->
            <div class="aid">
                <div class="circle">助手</div>
                <div class="font">客服助手</div>
            </div>
            <!--右边字母部分-->
            <div class="right">
                <ul>
                    <li v-for="item in list" :key="item.i">{{item}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import header from "../components/header"
export default {
    data(){
        return {
            list:["#","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
        }
    },
    methods:{

    },
    //注册子组件
  components:{
    "my-header1":header
  },
}
</script>
<style lang="scss" scoped>
/*屏幕高度*/
.search{
    position: relative;
}
    .input{
        margin-top:0.2rem;
        
    }
    ::-webkit-input-placeholder{
        color:#ddd;
        font-size: 0.6rem;
    }
    input{
        border:1px solid #ddd;
        width: 80%;
        height:1rem;
        padding: 0.1rem;
        padding-left: 0.8rem;
        background: url(../../public/img/search.png);
        background-size: 1rem;
        background-repeat:no-repeat; 
        border-radius: 0.2rem;
        background-position-y: 2%;
        font-size: 0.7rem;
    }
    /*k部分*/
    .service .letter{
        background: #efefef;
        width: 90%;
        margin:0.3rem auto;
        margin-top: 0.5rem;
        text-align: left;
        padding-left:0.3rem; 
       font-size: 0.7rem;
    }
    /*客服助手*/
    .service .aid{
        border-bottom: 1px solid #ddd;
        padding: 0.2rem;
        display: flex;
    }
    .service .aid .circle{
        width: 1.5rem;
        height: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: #a8d5f0;
         color: #fff;
         font-size: 0.5rem;
    }
     .service .aid .font{
         margin-left: 0.3rem;
         line-height: 1.5rem;
         font-size: 0.6rem;
     }
     .right ul {
         float: right;
         position: absolute;
         top:51%;
         right:0.4rem;
         color:#818196;
         font-size: 0.5rem;
     }
     
</style>
