webpackJsonp([26],{"1K5V":function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("IvJb"),o=n("2fY5"),i=n.n(o),l={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var p=n("C7Lr")(null,l,!1,function(t){n("1K5V")},null,null).exports,c=n("zO6J");a.default.use(c.a);var h=new c.a({routes:[{path:"/",redirect:"/dashboard"},{path:"/",component:t=>n.e(3).then(function(){var e=[n("MpTN")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{title:"自述文件"},children:[{path:"/dashboard",component:t=>n.e(2).then(function(){var e=[n("a52u")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{auth:!0,keepAlive:!1,title:"首页"}},{path:"/users/list",component:t=>n.e(8).then(function(){var e=[n("EZgN")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{auth:!0,keepAlive:!1,title:"用户列表"}},{path:"/sysuser/list",component:t=>n.e(10).then(function(){var e=[n("Px+m")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{auth:!0,keepAlive:!1,title:"系统用户列表"}},{path:"/role/list",component:t=>n.e(0).then(function(){var e=[n("XZH8")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{auth:!0,keepAlive:!1,title:"角色列表"}},{path:"/order/list",component:t=>n.e(13).then(function(){var e=[n("QHL1")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{auth:!0,keepAlive:!1,title:"订单列表"}},{path:"/seller/listSeller",component:t=>n.e(20).then(function(){var e=[n("0Uqx")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{auth:!0,keepAlive:!1,title:"商家列表"}},{path:"/orderDetail",component:t=>n.e(9).then(function(){var e=[n("+Lrn")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{auth:!0,keepAlive:!1,title:"订单详情"}},{path:"/goods/commentList",component:t=>n.e(21).then(function(){var e=[n("ir3i")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{auth:!0,keepAlive:!1,title:"商品评论列表"}},{path:"/collection/list",component:t=>n.e(18).then(function(){var e=[n("AZcf")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{auth:!0,keepAlive:!1,title:"商品收藏列表"}},{path:"/goods/listGoods",component:t=>n.e(12).then(function(){var e=[n("WGcA")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{auth:!0,keepAlive:!1,title:"商品列表"}},{path:"/commonline/listCommonLine",component:t=>n.e(15).then(function(){var e=[n("XhEy")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{auth:!0,keepAlive:!1,title:"常用路线列表"}},{path:"/site/listSite",component:t=>n.e(14).then(function(){var e=[n("gdVy")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{auth:!0,keepAlive:!1,title:"地点列表"}},{path:"/address/list",component:t=>n.e(22).then(function(){var e=[n("Y1eG")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{auth:!0,keepAlive:!1,title:"收货地址列表"}},{path:"/icon",component:t=>n.e(23).then(function(){var e=[n("RnVD")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{title:"自定义图标"}},{path:"/form",component:t=>n.e(24).then(function(){var e=[n("46ac")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{title:"基本表单"}},{path:"/editor",component:t=>n.e(1).then(function(){var e=[n("Xg9c")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{title:"富文本编辑器"}},{path:"/markdown",component:t=>n.e(7).then(function(){var e=[n("1km6")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{title:"markdown编辑器"}},{path:"/upload",component:t=>n.e(4).then(function(){var e=[n("E+fO")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{title:"文件上传"}},{path:"/charts",component:t=>n.e(5).then(function(){var e=[n("VXZu")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{title:"schart图表"}},{path:"/drag",component:t=>n.e(6).then(function(){var e=[n("SnCj")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{title:"拖拽列表"}},{path:"/permission",component:t=>n.e(16).then(function(){var e=[n("Bl1l")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{title:"权限测试",permission:!0}},{path:"/404",component:t=>n.e(17).then(function(){var e=[n("Cj4A")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{title:"404"}},{path:"/403",component:t=>n.e(19).then(function(){var e=[n("u20U")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{title:"403"}}]},{path:"/login",component:t=>n.e(11).then(function(){var e=[n("GF4k")];t.apply(null,e)}.bind(this)).catch(n.oe)},{path:"*",redirect:"/404"}]}),r=n("6sKG"),s=n.n(r),u=n("srH3"),m=n.n(u);n("OIlf"),n("ympj"),n("briU");a.default.use(m.a,i.a,{size:"small"}),a.default.prototype.$axios=s.a,a.default.prototype.$cookie=i.a,a.default.prototype.$axios.interceptors.request.use(t=>(t.headers["Content-Type"]="application/json;charset=UTF-8",i.a.isKey("token")&&(i.a.set("token",i.a.get("token"),"2h"),i.a.set("name",i.a.get("name"),"2h"),t.headers.token=i.a.get("token")),t),t=>Promise.reject(t.response)),s.a.interceptors.response.use(t=>"401"==t.data.code?(console.log("登录已失效"),void(window.location.href="#/login")):(t.data.code,t),t=>Promise.reject(t.response)),h.beforeEach((t,e,n)=>{t.matched.some(t=>t.meta.auth)?"/login"==e.path?n():i.a.get("token")?n():n("/login"):(console.log("请先登录"),n())}),new a.default({router:h,render:t=>t(p)}).$mount("#app")},OIlf:function(t,e){},ympj:function(t,e){}},["NHnr"]);