<template>

                    <div class="table">
                        <div class="container">
                            <el-table :data="tableData" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                                <el-table-column type="selection" width="55" align="center"></el-table-column>
                                <el-table-column prop="userId" label="用户ID" sortable width="90"></el-table-column>
                                <el-table-column prop="nickName" label="昵称"  ></el-table-column>
                                <el-table-column prop="phone" label="手机号"  ></el-table-column>
                                <el-table-column prop="status" :formatter="statusFormat" label="状态"  ></el-table-column>
                                <el-table-column prop="gender" :formatter="genderFormat" label="性别"  ></el-table-column>
                                <el-table-column prop="createTime" label="创建时间" ></el-table-column>
                                <!--<el-table-column label="操作" width="80" align="center">-->
                                    <!--<template slot-scope="scope">-->
                                        <!--<el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
                                        <!--&lt;!&ndash;<el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>&ndash;&gt;-->
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
                                    <el-input v-model="form.id" :disabled="true"></el-input>
                                </el-form-item>
                                <el-form-item label="Sid:" >
                                    <el-input v-model="form.serverInstanceId" :disabled="true"></el-input>
                                </el-form-item>

                                <el-form-item label="Status:" >
                                    <el-select v-model="form.status" placeholder="请选择">
                                        <el-option key="0" label="初始化" value="0"></el-option>
                                        <el-option key="1" label="创建中" value="1"></el-option>
                                        <el-option key="2" label="运行中" value="2"></el-option>
                                        <el-option key="3" label="欠费停服" value="3"></el-option>
                                        <el-option key="4" label="已销毁" value="4"></el-option>
                                        <el-option key="5" label="维护中" value="5"></el-option>
                                        <el-option key="6" label="手动删除" value="6"></el-option>
                                        <el-option key="7" label="重启中" value="7"></el-option>
                                        <el-option key="8" label="恢复中" value="8"></el-option>
                                        <el-option key="9" label="停止中" value="9"></el-option>
                                        <el-option key="10" label="创建异常" value="10"></el-option>
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
    import url from '../urls/urls';

    export default {
        name: 'basetable',
        data() {
            return {
                message: 'first',
                url: '/xiaotao/user/userList',
                tableData: [],
                total: 0,
                cur_page: 0,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                form: {
                    userId:'',
                    nickName: '',
                    phone: '',
                    gender:'',
                    status:'',
                    createTime:''
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
                if (status == 0)
                {
                    flag = '失效'
                }
                else
                {
                    flag = '有效'
                }
                return flag
            },
            genderFormat:function(row, column) {
                var status = row[column.property];
                if (status == undefined) {
                    return "";
                }
                var flag = '';
                if (status == 0)
                {
                    flag = '女'
                }
                else
                {
                    flag = '男'
                }
                return flag
            },
            // 分页导航
            handleCurrentChange(val) {
                if (val == 1){
                    this.cur_page = 0
                }
                else {
                    this.cur_page = (val-1)*10;
                }
                this.getData();
            },
            // 获取 easy-mock 的模拟数据
            getData() {
                // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
                if (process.env.NODE_ENV === 'development') {
                    this.url = this.url;
                };
                this.$axios.get(this.url, {
                    params: {p: this.cur_page, size: 10}
                }).then((res) => {
                    //console.log(res.data.data)
                    this.tableData = res.data.data.data;
                    this.total = res.data.data.size
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
                    id: item.id,
                    serverInstanceId: item.serverInstanceId,
                    instanceName:item.instanceName,
                    status: item.status
                }
                this.editVisible = true;
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
</style>
