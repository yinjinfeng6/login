import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    children:[
      {
        path: "",
        name:"default",
        component: () => import("../views/homes/HomeIndex.vue"),
      },
      {
        path: "/2-1",
        meta: ['数据管理', '用户列表'],
        component: () => import("../views/homes/HomeUser.vue"),
      },
      {
        path: "/2-2",
        meta: ['数据管理', '商品列表'],
        component: () => import("../views/homes/HomeShop.vue"),
      },
      {
        path: "/2-3",
        meta: ['数据管理', '食品列表'],
        component: () => import("../views/homes/HomeFood.vue"),
      },
      {
        path: "/2-4",
        meta: ['数据管理', '订单列表'],
        component: () => import("../views/homes/HomeOrder.vue"),
      },
      {
        path: "/2-5",
        meta: ['数据管理', '管理员列表'],
        component: () => import("../views/homes/HomePerson.vue"),
      },
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import('../views/MyLogin.vue'),
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];
const router = new VueRouter({
  routes,
});

// 权限管理
router.beforeEach(function (to, from, next) {
  if (to.path == '/login') {
    next();
  } else {
    let token = localStorage.getItem('Token');
    if (!token) return next({ path: "/login" });
    if (token) return next();
  }
})

export default router;
