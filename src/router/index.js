import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { auth:true,keepAlive: false,title: '首页' }
                },
                {
                    path: '/users/list',
                    component: resolve => require(['../components/page/users.vue'], resolve),
                    meta: { auth:true,keepAlive: false,title: '用户列表' }
                },
                {
                    path: '/sysuser/list',
                    component: resolve => require(['../components/page/sysuser.vue'], resolve),
                    meta: { auth:true,keepAlive: false,title: '系统用户列表' }
                },
                {
                    path: '/role/list',
                    component: resolve => require(['../components/page/role.vue'], resolve),
                    meta: { auth:true,keepAlive: false,title: '角色列表' }
                },
                {
                    path: '/order/list',
                    component: resolve => require(['../components/page/order.vue'], resolve),
                    meta: { auth:true,keepAlive: false,title: '订单列表' }
                },
                {
                    path: '/seller/listSeller',
                    component: resolve => require(['../components/page/seller.vue'], resolve),
                    meta: { auth:true,keepAlive: false,title: '商家列表' }
                },
                {
                    path: '/orderDetail',
                    component: resolve => require(['../components/page/orderDetail.vue'], resolve),
                    meta: { auth:true,keepAlive: false,title: '订单详情' }
                },
                {
                    path: '/goods/commentList',
                    component: resolve => require(['../components/page/goodcommentlist.vue'], resolve),
                    meta: { auth:true,keepAlive: false,title: '商品评论列表' }
                },
                {
                    path: '/collection/list',
                    component: resolve => require(['../components/page/goodcollection.vue'], resolve),
                    meta: { auth:true,keepAlive: false,title: '商品收藏列表' }
                },
                {
                    path: '/goods/listGoods',
                    component: resolve => require(['../components/page/goodlist.vue'], resolve),
                    meta: { auth:true,keepAlive: false,title: '商品列表' }
                },
                {
                    path: '/goods/listCategory',
                    component: resolve => require(['../components/page/goodCategoryList.vue'], resolve),
                    meta: { auth:true,keepAlive: false,title: '商品分类列表' }
                },
                {
                    path: '/commonline/listCommonLine',
                    component: resolve => require(['../components/page/listCommonLine.vue'], resolve),
                    meta: { auth:true,keepAlive: false,title: '常用路线列表' }
                },
                {
                    path: '/site/listSite',
                    component: resolve => require(['../components/page/listSite.vue'], resolve),
                    meta: { auth:true,keepAlive: false,title: '地点列表' }
                },
                {
                    path: '/wayLine/listWayLine',
                    component: resolve => require(['../components/page/wayline.vue'], resolve),
                    meta: { auth:true,keepAlive: false,title: '顺道列表' }
                },
                {
                    path: '/address/list',
                    component: resolve => require(['../components/page/addrlist.vue'], resolve),
                    meta: { auth:true,keepAlive: false,title: '收货地址列表' }
                },
                {
                    path: '/icon',
                    component: resolve => require(['../components/source/Icon.vue'], resolve),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/form',
                    component: resolve => require(['../components/source/BaseForm.vue'], resolve),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: resolve => require(['../components/source/VueEditor.vue'], resolve),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: resolve => require(['../components/source/Markdown.vue'], resolve),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: resolve => require(['../components/source/Upload.vue'], resolve),
                    meta: { title: '文件上传' }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: resolve => require(['../components/source/BaseCharts.vue'], resolve),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: resolve => require(['../components/source/DragList.vue'], resolve),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: resolve => require(['../components/source/Permission.vue'], resolve),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: resolve => require(['../components/source/404.vue'], resolve),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: resolve => require(['../components/source/403.vue'], resolve),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
