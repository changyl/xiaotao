<template>

                    <div class="table">
                        <div class="container">
                            <div class="handle-box">
                                <!--<el-button type="warning" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>-->

                                <el-input v-model="select_end" placeholder="目的地" class="handle-input mr10"></el-input>
                                <el-input v-model="select_start" placeholder="出发地点" class="handle-input mr10"></el-input>
                                <el-input v-model="select_linename" placeholder="线路名" class="handle-input mr10"></el-input>
                                <el-button type="warning" icon="search" :loading="loading_status" @click="search">搜索</el-button>
                            </div>
                            <el-table :data="tableData" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                                <el-table-column type="selection" width="55" align="center"></el-table-column>
                                <el-table-column prop="commonlineId" label="线路ID" sortable ></el-table-column>
                                <el-table-column prop="name" label="线路名"  ></el-table-column>
                                <el-table-column prop="status" label="状态" ></el-table-column>
                                <el-table-column prop="userId" label="用户ID"  ></el-table-column>
                                <el-table-column prop="wyPlace" label="途径地点"  ></el-table-column>
                                <el-table-column prop="startPlace" label="出发地点"></el-table-column>
                                <el-table-column prop="endPlace" label="目的地"  ></el-table-column>
                                <el-table-column prop="updateTime" label="修改时间"  ></el-table-column>
                                <el-table-column prop="createTime" label="创建时间" ></el-table-column>
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

                    </div>

</template>

<script>
    export default {
        name: 'basetable',
        data() {
            return {
                message: 'first',
                url: '/xiaotao/commonline/listCommonLine',
                tableData: [],
                total: 0,
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_end: '',
                select_start: '',
                select_linename: '',
                loading_status: false,
                del_list: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                form: {
                    autoid:'',
                    fun: '',
                    jid: '',
                    return: '',
                    success:''
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
                })
            },
            search() {
                this.loading_status = true;
                this.$axios.get(this.url, {
                    params: {p: this.cur_page, size: 10, endPlace: this.select_end, name: this.select_linename, startPlace: this.select_start }
                }).then((res) => {
                    this.tableData = res.data.data.data;
                    this.total = res.data.data.size;
                    this.loading_status = false
                }).finally(this.loading_status = false)
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
                    JobId: item.JobId,
                    sid: item.sid,
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
