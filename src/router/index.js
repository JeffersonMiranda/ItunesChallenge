import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home";
import AlbumDetail from "@/components/Album/AlbumDetail";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/album-detail/:albumParam",  // PASSING ALBUM OBJECT AS PARAMETER
      name: "AlbumDetail",
      component: AlbumDetail
    }
  ]
});
