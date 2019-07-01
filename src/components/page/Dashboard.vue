<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="24">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="6">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-lx-rankfill grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{ info.sell_total }}</div>
                                    <div>销售总量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="6">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-lx-rankfill grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{ info.yes_total }}</div>
                                    <div>昨日销售量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="6">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-lx-rankfill grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{ info.fail_total }}</div>
                                    <div>创建失败量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="6">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-lx-cartfill grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{ info.stock }}</div>
                                    <div>剩余配额量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card shadow="hover">
                    <schart ref="bar" class="schart" canvasId="bar" :data="data1" type="bar" :options="options"></schart>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover">
                    <schart ref="line" class="schart" canvasId="line" :data="data2" type="line" :options="options2"></schart>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import Schart from 'vue-schart';
    import bus from '../../../static/js/bus';
    import axios from 'axios';
    import url from '../urls/urls';

    export default {
        name: 'dashboard',
        data() {
            return {
                info: 0,
                name: localStorage.getItem('name'),
                data1: [],
                data2: [],
                options: {
                    title: '最近七天每天RDS销售量',
                    showValue: false,
                    fillColor: 'rgb(45, 140, 240)',
                    bottomPadding: 30,
                    topPadding: 30
                },
                options2: {
                    title: '销售趋势',
                    fillColor: '#FC6FA1',
                    axisColor: '#008ACD',
                    contentColor: '#EEEEEE',
                    bgColor: '#F5F8FD',
                    bottomPadding: 30,
                    topPadding: 30
                }
            }
        },
        components: {
            Schart
        },
        computed: {
            role() {
                return this.name === 'admin' ? '超级管理员' : '普通用户';
            }
        },
        // created(){
        //     this.handleListener();
        //     // this.changeDate();
        // },
        // activated(){
        //     this.handleListener();
        // },
        // deactivated(){
        //     window.removeEventListener('resize', this.renderChart);
        //     bus.$off('collapse', this.handleBus);
        // },

        // mounted () {
        //     axios
        //         .get(url.dash_url)
        //
        //         .then(response => {
        //             this.info = response.data.stat
        //             this.rds = response.data.datas
        //             this.changeDate(this.rds)
        //         })
        //         .catch(error => {
        //             console.log(error)
        //             this.errored = true
        //         })
        //         .finally(() => this.loading = false)
        // },
        methods: {
            // changeDate(data){
            //     console.log(data)
            //     this.data1 = [data];
            //
            //     const now = new Date().getTime();
            //
            //     this.data.forEach((item, index) => {
            //         // const date = new Date(now - (6 - index) * 86400000);
            //         // item.rds = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`
            //     })
            // },
            // handleListener(){
            //     // bus.$on('collapse', this.handleBus);
            //     // 调用renderChart方法对图表进行重新渲染
            //     // window.addEventListener('resize', this.renderChart)
            // },
            // handleBus(msg){
            //     setTimeout(() => {
            //         this.renderChart()
            //     }, 300);
            // },
            // renderChart(){
            //     this.$refs.bar.renderChart();
            //     this.$refs.line.renderChart();
            // }
        }
    }

</script>


<style scoped>
    .el-row {
        margin-bottom: 20px;
    }

    .grid-content {
        display: flex;
        align-items: center;
        height: 100px;
    }

    .grid-cont-right {
        flex: 1;
        text-align: center;
        font-size: 14px;
        color: #999;
    }

    .grid-num {
        font-size: 30px;
        font-weight: bold;
    }

    .grid-con-icon {
        font-size: 50px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
    }

    .grid-con-1 .grid-con-icon {
        background: rgb(45, 140, 240);
    }

    .grid-con-1 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-2 .grid-con-icon {
        background: rgb(100, 213, 114);
    }

    .grid-con-2 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-3 .grid-con-icon {
        background: rgb(242, 94, 67);
    }

    .grid-con-3 .grid-num {
        color: rgb(242, 94, 67);
    }

    .user-info {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 2px solid #ccc;
        margin-bottom: 20px;
    }

    .user-avator {
        width: 120px;
        height: 120px;
        border-radius: 50%;
    }

    .user-info-cont {
        padding-left: 50px;
        flex: 1;
        font-size: 14px;
        color: #999;
    }

    .user-info-cont div:first-child {
        font-size: 30px;
        color: #222;
    }

    .user-info-list {
        font-size: 14px;
        color: #999;
        line-height: 25px;
    }

    .user-info-list span {
        margin-left: 70px;
    }

    .mgb20 {
        margin-bottom: 20px;
    }

    .todo-item {
        font-size: 14px;
    }

    .todo-item-del {
        text-decoration: line-through;
        color: #999;
    }

    .schart {
        width: 100%;
        height: 300px;
    }

</style>
