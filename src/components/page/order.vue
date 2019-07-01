<template>

                    <div class="table">
                        <div class="container">
                            <!--<div class="handle-box">-->
                                <!--&lt;!&ndash;<el-button type="warning" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>&ndash;&gt;-->
                                <!--<el-select v-model="select_cate" placeholder="筛选job状态" class="handle-select mr10">-->
                                    <!--<el-option key="1" label="unready" value="-1"></el-option>-->
                                    <!--<el-option key="2" label="ready" value="0"></el-option>-->
                                    <!--<el-option key="3" label="running" value="1"></el-option>-->
                                    <!--<el-option key="4" label="finished" value="2"></el-option>-->
                                    <!--<el-option key="5" label="failed" value="3"></el-option>-->
                                <!--</el-select>-->
                                <!--<el-input v-model="select_word" placeholder="筛选UUID" class="handle-input mr10"></el-input>-->
                                <!--<el-button type="warning" icon="search" @click="search">搜索</el-button>-->
                            <!--</div>-->
                            <el-table :data="tableData" border class="table" style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                                <!--<el-table-column type="expand">-->
                                    <!--<template slot-scope="props">-->
                                        <!--<el-form label-position="left" inline class="demo-table-expand">-->
                                            <!--<el-form-item label="地址">-->
                                                <!--<span>{{ props.row.address }}</span>-->
                                            <!--</el-form-item>-->
                                            <!--<el-form-item label="地址ID">-->
                                                <!--<span>{{ props.row.addressId }}</span>-->
                                            <!--</el-form-item>-->
                                            <!--<el-form-item label="deliveryStatus">-->
                                                <!--<span>{{ props.row.deliveryStatus }}</span>-->
                                            <!--</el-form-item>-->
                                            <!--<el-form-item label="orderCode">-->
                                                <!--<span>{{ props.row.orderCode }}</span>-->
                                            <!--</el-form-item>-->
                                            <!--<el-form-item label="remark">-->
                                                <!--<span>{{ props.row.remark }}</span>-->
                                            <!--</el-form-item>-->
                                        <!--</el-form>-->
                                    <!--</template>-->
                                <!--</el-table-column>-->
                                <el-table-column type="selection" width="55" align="center"></el-table-column>
                                <el-table-column  prop="orderId" label="订单ID" sortable >
                                    <!--<template slot-scope="scope">-->
                                        <!--<el-button type="text" @click="handleSkip(scope.$index, scope.row)">{{scope.row.orderId}}</el-button>-->
                                    <!--</template>-->
                                </el-table-column>
                                <el-table-column prop="buyerId" label="购买人ID"  ></el-table-column>
                                <el-table-column prop="amount" label="订单金额" ></el-table-column>
                                <el-table-column prop="orderCode" label="订单编号" ></el-table-column>
                                <el-table-column prop="expressId" label="物流ID"  ></el-table-column>
                                <el-table-column prop="orderStatus" :formatter="statusFormat" label="订单状态" ></el-table-column>
                                <el-table-column prop="createTime" label="创建时间"></el-table-column>
                                <el-table-column prop="payTime" label="支付时间"  ></el-table-column>
                                <!--<el-table-column label="操作"  align="center">-->
                                    <!--<template slot-scope="scope">-->
                                        <!--<el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
                                        <!--<el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
                                    <!--</template>-->
                                <!--</el-table-column>-->
                            </el-table>
                            <div class="pagination">
                                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="(this.total)">
                                </el-pagination>
                            </div>
                        </div>

                        <!-- 编辑弹出框 -->
                        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
                            <el-form ref="form" :model="form" label-width="50px">
                                <el-form-item label="Id:">
                                    <el-input v-model="form.Id" :disabled="true"></el-input>
                                </el-form-item>
                                <el-form-item label="status:" >
                                    <el-input v-model="form.status" :disabled="true"></el-input>
                                </el-form-item>
                                <el-form-item label="选择日期">
                                    <el-date-picker class="in-date-picker"
                                            v-model="value2"
                                            align="right"
                                            type="date"
                                            placeholder="选择日期"
                                            :picker-options="pickerOptions1">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item label="Status:" >
                                <el-select v-model="form.status" placeholder="请选择">
                                    <el-option key="1" label="unready" value="-1"></el-option>
                                    <el-option key="2" label="ready" value="0"></el-option>
                                    <el-option key="3" label="running" value="1"></el-option>
                                    <el-option key="4" label="finished" value="2"></el-option>
                                    <el-option key="5" label="failed" value="3"></el-option>
                                </el-select>
                                </el-form-item>
                            </el-form>
                            <span slot="footer" class="dialog-footer">
                            <el-button @click="editVisible = false">取 消</el-button>
                            <el-button type="warning" @click="saveEdit">确 定</el-button>

                            </span>
                        </el-dialog>
                    </div>

</template>


<script>
    export default {
        name: 'basetable',
        data() {
            return {
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                message: 'first',
                url: '/xiaotao/payorder/list',
                url_detail: '/xiaotao/payorder/orderDetail',
                tableData: [],
                detailDatas: {
                    address:'',
                    addressId: '',
                    deliveryStatus: '',
                    deliveryType: '',
                    remark:''
                },
                total: 0,
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                form: {
                    orderId:'',
                    buyerId: '',
                    expressId: '',
                    orderCode: '',
                    orderStatus:'',
                    amount:'',
                    createTime:'',
                    payTime:''
                },
                idx: -1
            }
        },
        activated() {
            this.getData();
        },
        mounted(){
            this.getData();
        },
        methods: {
            statusFormat:function(row, column) {
                var status = row[column.property];
                if (status == undefined) {
                    return "";
                }
                var flag = '';
                if (status == 1)
                {
                    flag = '正常'
                }
                else if (status == 2)
                {
                    flag = '完成'
                }
                else
                {
                    flag = '取消'
                }
                return flag
            },
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            // 获取 easy-mock 的模拟数据
            getData() {
                // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
                if (process.env.NODE_ENV === 'development') {
                    //this.url = '/ms/table/list';
                    this.url = this.url;
                };
                this.$axios.get(this.url, {
                    params: {p: this.cur_page, size: 10}
                }).then((res) => {
                    this.tableData = res.data.data.data;
                    this.total = res.data.data.size;
                    console.log(res)
                })
            },
            search() {
                this.is_search = true;
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.idx = index;
                const item = this.tableData[index];
                this.form = {
                    Id: item.JobId,
                    current_job: item.current_job,
                    status: item.status
                }
                this.editVisible = true;
            },
            handleSkip(index, row) {
                this.idx = index;
                const item = this.tableData[index];
                this.$axios.get(this.url_detail, {
                    params: {orderId: item.orderId}
                }).then((res) => {
                    this.detailDatas = res.data.data;
                })
                //this.$router.push({path: '/orderDetail', query:{orderId: item.orderId}});
            },

            handleDelete(index, row) {
                this.idx = index;
                this.delVisible = true;
            },
            delAll() {
                const length = this.multipleSelection.length;
                let str = '';
                this.del_list = this.del_list.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + ' ';
                }
                this.$message.error('删除了' + str);
                this.multipleSelection = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 保存编辑
            saveEdit() {
                this.$set(this.tableData, this.idx, this.form);
                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx+1} 行成功`);
            },
            // 确定删除
            deleteRow(){
                this.tableData.splice(this.idx, 1);
                this.$message.success('删除成功');
                this.delVisible = false;
            }
        }
    };

</script>


<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
    .in-date-picker {
        width: 200px;
    }
</style>
