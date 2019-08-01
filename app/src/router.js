import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import header from "./components/header.vue";
import Header2 from "./components/Header2.vue";
import footer from "./components/footer.vue";
import recharge from "./views/recharge.vue";
import search from "./views/search.vue";
import Balance from "./views/Balance.vue";
import Login from "./views/Login.vue";
import Ad from "./views/Ad.vue";
import Add from "./views/Add.vue";
import Manage from "./views/Manage.vue";
import Message from "./views/Message.vue";
import User from "./views/User.vue";
import Online from "./views/Online.vue";
import Business from "./views/Business.vue";
import Billed from "./views/Billed.vue";
import Has from "./components/Has.vue";
import NoPrepaid from "./components/NoPrepaid.vue";
//测试的input
import Input from "./views/Input.vue";
Vue.use(Router);

export default new Router({
  // mode: "history",
  base: process.env.BASE_URL,
  routes: [
    { path: "/", name: "home", component: Home },
    { path: "/home", name: "home", component: Home },
    { path: "/header", name: "header", component: header },
    { path: "/header2", name: "header2", component: Header2 },
    { path: "/footer", name: "footer", component: footer },
    { path: "/recharge", name: "recharge", component: recharge },
    { path: "/search", name: "search", component: search },
    { path: "/balance", name: "balance", component: Balance },
    { path: "/login", name: "login", component: Login },
    { path: "/ad", name: "ad", component: Ad },
    { path: "/add", name: "add", component: Add },
    { path: "/manage", name: "manage", component: Manage },
    { path: "/message", name: "message", component: Message },
    { path: "/user", name: "user", component: User },
    { path: "/has", name: "has", component: Has },
    { path: "/noprepaid", name: "noprepaid", component: NoPrepaid },
    { path: "/online", name: "online", component: Online },
    { path: "/input", name: "input", component: Input },
    { path: "/business", name: "business", component: Business },
    
    { path: "/billed", name: "billed", component: Billed },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
