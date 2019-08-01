<template>
  <div id="app" >
    <router-view />
  </div>
</template>
<script>
export default {
  data(){
    return{
      fullHeight: document.documentElement.clientHeight,
    }
  },
   mounted() {
      const that = this
      window.onresize = () => {
        return (() => {
          window.fullHeight = document.documentElement.clientHeight
          that.fullHeight = window.fullHeight
        })()
      }
    },
     watch: {
      fullHeight (val) {
        if(!this.timer) {
          this.fullHeight = val
          this.timer = true
          let that = this
          setTimeout(function (){
            that.timer = false
          },400)
        }
      }
    }
}
</script>

<style>
/*阿里图标*/
@font-face {
  font-family: 'iconfont';  /* project id 1283585 */
  src: url('//at.alicdn.com/t/font_1283585_ibadbhtl7zk.eot');
  src: url('//at.alicdn.com/t/font_1283585_ibadbhtl7zk.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_1283585_ibadbhtl7zk.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_1283585_ibadbhtl7zk.woff') format('woff'),
  url('//at.alicdn.com/t/font_1283585_ibadbhtl7zk.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_1283585_ibadbhtl7zk.svg#iconfont') format('svg');
}
.iconfont{
    font-family:"iconfont" !important;
    font-size:1.3rem;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
    }
/*移动端初始化css样式文件 reset.css*/
@charset "utf-8";html{background-color:#fff;color:#000;font-size:12px}
body,ul,ol,dl,dd,h1,h2,h3,h4,h5,h6,figure,form,fieldset,legend,input,textarea,button,p,blockquote,th,td,pre,xmp{margin:0;padding:0}
body,input,textarea,button,select,pre,xmp,tt,code,kbd,samp{line-height:1.5;font-family:tahoma,arial,"Hiragino Sans GB",simsun,sans-serif}
h1,h2,h3,h4,h5,h6,small,big,input,textarea,button,select{font-size:100%}
h1,h2,h3,h4,h5,h6{font-family:tahoma,arial,"Hiragino Sans GB","微软雅黑",simsun,sans-serif}
h1,h2,h3,h4,h5,h6,b,strong{font-weight:normal}
address,cite,dfn,em,i,optgroup,var{font-style:normal}
table{border-collapse:collapse;border-spacing:0;text-align:left}
caption,th{text-align:inherit}
ul,ol,menu{list-style:none}
fieldset,img{border:0}
img,object,input,textarea,button,select{vertical-align:middle}
article,aside,footer,header,section,nav,figure,figcaption,hgroup,details,menu{display:block}
audio,canvas,video{display:inline-block;*display:inline;*zoom:1}
blockquote:before,blockquote:after,q:before,q:after{content:"\0020"}
textarea{overflow:auto;resize:vertical}
input,textarea,button,select,a{outline:0 none;border: none;}
button::-moz-focus-inner,input::-moz-focus-inner{padding:0;border:0}
mark{background-color:transparent}
a,ins,s,u,del{text-decoration:none}
sup,sub{vertical-align:baseline}
html {overflow-x: hidden;font-size: 50px;-webkit-tap-highlight-color: transparent; }
body {font-family: Arial, "Microsoft Yahei", "Helvetica Neue", Helvetica, sans-serif;color: #333;font-size: .28em;line-height: 1;-webkit-text-size-adjust: none;}
hr {height: .02rem;margin: .1rem 0;border: medium none;border-top: .02rem solid #cacaca;}
a {color: #25a4bb;text-decoration: none;}
/*end*/
/*1px的问题*/

/*1px问题end*/
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  display: box;
 
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
