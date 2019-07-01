<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse"
            text-color="#324157" active-text-color="#ebb563" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../../../static/js/bus';
    export default {
        data() {
            return {
                collapse: false,
                items: [
                    {
                        icon: 'el-icon-lx-home',
                        index: '/dashboard',
                        title: '首页'
                    },
                    {
                        icon: 'el-icon-lx-group',
                        index: '1',
                        title: '用户管理',
                        subs: [
                            {

                                index: '/users/list',
                                title: '用户列表'
                            },
                            {

                                index: '/sysuser/list',
                                title: '系统用户列表'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-lx-crownfill',
                        index: '2',
                        title: '角色管理',
                        subs: [
                            {

                                index: '/role/list',
                                title: '角色列表'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-lx-copy',
                        index: '3',
                        title: '订单管理',
                        subs: [
                            {

                                index: '/order/list',
                                title: '订单列表'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-lx-goodsfill',
                        index: '4',
                        title: '商品管理',
                        subs: [

                            {

                                index: '/goods/listGoods',
                                title: '商品列表'
                            },
                            {

                                index: '/goods/commentList',
                                title: '商品评论列表'
                            },
                            {

                                index: '/collection/list',
                                title: '商品收藏列表'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-lx-shopfill',
                        index: '5',
                        title: '商家管理',
                        subs: [
                            {

                                index: '/seller/listSeller',
                                title: '商家列表'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-lx-location',
                        index: '6',
                        title: '收货地址管理',
                        subs: [
                            {

                                index: '/address/list',
                                title: '收货地址列表'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-lx-global',
                        index: '7',
                        title: '常用线路管理',
                        subs: [
                            {

                                index: '/commonline/listCommonLine',
                                title: '常用线路列表'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-lx-locationfill',
                        index: '8',
                        title: '地点管理',
                        subs: [
                            {

                                index: '/site/listSite',
                                title: '地点列表'
                            }
                        ]
                    },
                    // {
                    //     icon: 'el-icon-lx-file',
                    //     index: '15',
                    //     title: '参考',
                    //     subs: [
                    //         {
                    //             index: 'form',
                    //             title: '基本表单'
                    //         },
                    //         {
                    //             icon: 'el-icon-lx-copy',
                    //             index: 'tabs',
                    //             title: 'tab选项卡'
                    //         },
                    //         {
                    //             icon: 'el-icon-lx-emoji',
                    //             index: 'icon',
                    //             title: '自定义图标'
                    //         },
                    //         {
                    //             icon: 'el-icon-lx-favor',
                    //             index: 'charts',
                    //             title: 'schart图表'
                    //         },
                    //         {
                    //             icon: 'el-icon-rank',
                    //             index: 'drag',
                    //             title: '拖拽列表'
                    //         },
                    //         {
                    //             index: '3-2',
                    //             title: '三级菜单',
                    //             subs: [
                    //                 {
                    //                     index: 'editor',
                    //                     title: '富文本编辑器'
                    //                 },
                    //                 {
                    //                     index: 'markdown',
                    //                     title: 'markdown编辑器'
                    //                 },
                    //             ]
                    //         },
                    //         {
                    //             icon: 'el-icon-lx-warn',
                    //             index: '6',
                    //             title: '错误处理',
                    //             subs: [
                    //                 {
                    //                     index: 'permission',
                    //                     title: '权限测试'
                    //                 },
                    //                 {
                    //                     index: '404',
                    //                     title: '404页面'
                    //                 }
                    //             ]
                    //         },
                    //         {
                    //             index: 'upload',
                    //             title: '文件上传'
                    //         }
                    //     ]
                    // },


                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 60px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
