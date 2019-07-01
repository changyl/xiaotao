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
                                    <!--<el-option key="6" label="error" value="4"></el-option>-->
                                <!--</el-select>-->
                                <!--<el-input v-model="select_word" placeholder="筛选UUID" class="handle-input mr10"></el-input>-->
                                <!--<el-button type="warning" icon="search" @click="search">搜索</el-button>-->
                            <!--</div>-->
                            <el-table :data="tableData" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                                <el-table-column type="selection" width="55" align="center"></el-table-column>
                                <el-table-column prop="goodsId" label="商品ID" sortable ></el-table-column>
                                <el-table-column prop="collectionId" label="商品收藏ID"  ></el-table-column>
                                <el-table-column prop="userId" label="用户ID"></el-table-column>
                                <el-table-column prop="dateline" label="收藏时间" ></el-table-column>
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
                url: '/xiaotao/collection/list',
                tableData: [],
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
                    console.log(res.data)
                    this.tableData = res.data.data.data;
                    this.total = res.data.data.size;
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
