<template>
    <el-col>
                    <div class="table"  name="first">
                        <div class="crumbs">
                            <el-breadcrumb separator="/">
                                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 库存</el-breadcrumb-item>
                            </el-breadcrumb>
                        </div>
                        <div class="container">
                            <div class="handle-box">
                                <!--<el-button type="warning" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>-->
                                <el-input v-model="select_word" placeholder="商家名称" class="handle-input mr10"></el-input>

                                <el-button type="warning" icon="search" :loading="loading_status" @click="search">搜索</el-button>
                            </div>
                            <el-table :data="tableData" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                                <el-table-column type="selection"  align="center"></el-table-column>
                                <el-table-column prop="sellerId" label="商家ID" sortable></el-table-column>
                                <el-table-column prop="goodsType" label="商品类别"  ></el-table-column>
                                <el-table-column prop="sellerName" label="商家名称"  ></el-table-column>
                                <el-table-column prop="introduce" label="商家介绍" ></el-table-column>
                                <el-table-column prop="sellerStatus" label="状态" ></el-table-column>
                                <el-table-column prop="image"  label="商家图片"  >
                                    <template slot-scope="scope">
                                        <img :src="scope.row.image" style="width: 100px; height: 100px" class="image"/>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="dateline" label="创建时间" ></el-table-column>

                                <!--<el-table-column label="操作" width="180" align="center">-->
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
                                <el-form-item label="totalSum:" >
                                    <el-input v-model="form.totalSum" :disabled="false"></el-input>
                                </el-form-item>
                            </el-form>
                            <span slot="footer" class="dialog-footer">
                            <el-button @click="editVisible = false">取 消</el-button>
                            <el-button type="warning" @click="saveEdit">确 定</el-button>

                            </span>
                        </el-dialog>
                    </div>
    </el-col>
</template>

<script>
    export default {
        name: 'basetable2',
        data() {
            return {
                // message: 'first',
                url: '/xiaotao/seller/listSeller',
                tableData: [],
                total: 0,
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                loading_status: false,
                del_list: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                form: {
                    Id:'',
                    totalSum: ''
                },
                idx: -1
            }
        },
        created() {
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
                    //this.url = this.url;
                    console.log(this.url);
                };
                this.$axios.get(this.url, {
                    params: {p: this.cur_page, size: 10}
                }).then((res) => {
                    this.tableData = res.data.data.data;
                    this.total = res.data.size;
                    console.log(res);
                })
            },
            search() {
                this.loading_status = true;
                this.$axios.get(this.url, {
                    params: {p: this.cur_page, size: 10, sellerName: this.select_word}
                }).then((res) => {
                    this.tableData = res.data.data.data;
                    this.total = res.data.size;
                    cthis.loading_status = true;
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
                    Id: item.Id,
                    totalSum: item.totalSum,
                    modifiedTime: item.modifiedTime
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
