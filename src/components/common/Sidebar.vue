<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse"
            text-color="#324157" active-text-color="#ebb563" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.submenuList">
                    <el-submenu :index="item.id" :key="item.id">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title" >{{ item.name }}</span>
                        </template>
                        <template v-for="subItem in item.submenuList">
                            <el-submenu v-if="subItem.submenuList" :index="subItem.url" :key="subItem.url">
                                <template slot="title">{{ subItem.name }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="threeItem.id" :index="threeItem.id">
                                    {{ threeItem.id }}
                                </el-menu-item>
                            </el-submenu>
                            <!--子菜单-->
                            <el-menu-item v-else :index="subItem.url" :key="subItem.url">
                                {{ subItem.name }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.id" :key="item.id">
                        <i :class="item.icon"></i><span slot="title">{{ item.id }}</span>
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
                menuUrl:'/xiaotao/menu/getUserAllMenu',
                items: [
                    // {
                    //     //icon: 'el-icon-lx-home',
                    //     index: '/dashboard',
                    //     title: '首页'
                    // },
                    // {
                    //     //icon: 'el-icon-lx-group',
                    //     index: '1',
                    //     title: '用户管理',
                    //     subs: [
                    //         {
                    //
                    //             index: '/users/list',
                    //             title: '用户列表'
                    //         },
                    //         {
                    //
                    //             index: '/sysuser/list',
                    //             title: '系统用户列表'
                    //         }
                    //     ]
                    // },
                    // {
                    //     //icon: 'el-icon-lx-crownfill',
                    //     index: '2',
                    //     title: '角色管理',
                    //     subs: [
                    //         {
                    //
                    //             index: '/role/list',
                    //             title: '角色列表'
                    //         }
                    //     ]
                    // },
                    // {
                    //     //icon: 'el-icon-lx-copy',
                    //     index: '3',
                    //     title: '订单管理',
                    //     subs: [
                    //         {
                    //
                    //             index: '/order/list',
                    //             title: '订单列表'
                    //         }
                    //     ]
                    // },
                    // {
                    //     //icon: 'el-icon-lx-goodsfill',
                    //     index: '4',
                    //     title: '商品管理',
                    //     subs: [
                    //
                    //         {
                    //
                    //             index: '/goods/listGoods',
                    //             title: '商品列表'
                    //         },
                    //         {
                    //
                    //             index: '/goods/commentList',
                    //             title: '商品评论列表'
                    //         },
                    //         {
                    //
                    //             index: '/collection/list',
                    //             title: '商品收藏列表'
                    //         }
                    //     ]
                    // },
                    // {
                    //     //icon: 'el-icon-lx-goodsfill',
                    //     index: '5',
                    //     title: '商品分类管理',
                    //     subs: [
                    //
                    //         {
                    //
                    //             index: '/goods/listCategory',
                    //             title: '商品分类列表'
                    //         }
                    //     ]
                    // },
                    //
                    // {
                    //     //icon: 'el-icon-lx-shopfill',
                    //     index: '6',
                    //     title: '商家管理',
                    //     subs: [
                    //         {
                    //
                    //             index: '/seller/listSeller',
                    //             title: '商家列表'
                    //         }
                    //     ]
                    // },
                    // {
                    //     //icon: 'el-icon-lx-location',
                    //     index: '7',
                    //     title: '收货地址管理',
                    //     subs: [
                    //         {
                    //
                    //             index: '/address/list',
                    //             title: '收货地址列表'
                    //         }
                    //     ]
                    // },
                    // {
                    //     //icon: 'el-icon-lx-global',
                    //     index: '8',
                    //     title: '常用线路管理',
                    //     subs: [
                    //         {
                    //
                    //             index: '/commonline/listCommonLine',
                    //             title: '常用线路列表'
                    //         }
                    //     ]
                    // },
                    // {
                    //     //icon: 'el-icon-lx-locationfill',
                    //     index: '9',
                    //     title: '地点管理',
                    //     subs: [
                    //         {
                    //
                    //             index: '/site/listSite',
                    //             title: '地点列表'
                    //         },
                    //         {
                    //
                    //             index: '/wayLine/listWayLine',
                    //             title: '顺道列表'
                    //         }
                    //     ]
                    // },
                    // {
                    //     //icon: 'el-icon-lx-group',
                    //     index: '10',
                    //     title: '司机管理',
                    //     subs: [
                    //         {
                    //
                    //             index: '/vehicleowner/vehicleowner',
                    //             title: '司机列表'
                    //         },
                    //         {
                    //
                    //             index: '/vehicleowner/verifyVehicleowner',
                    //             title: '司机审核'
                    //         }
                    //     ]
                    // },
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

            this.$axios.get(this.menuUrl).then((res) => {
                console.log("res" + res.data.data);
                this.items = res.data.data;
                // if (res.data.code == 0) {
                //     alert("删除成功!")
                // } else {
                //     alert("删除失败!")
                // }

                // this.getData();
            }).finally(this.loading_status = false)
        },

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
