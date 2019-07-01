<template>

                    <div class="table">
                        <div class="container">
                            <div class="handle-box">
                                <el-input v-model="select_word" placeholder="商品简称" class="handle-input mr10"></el-input>
                                <el-input v-model="select_word2" placeholder="商家名称" class="handle-input mr10"></el-input>
                                <el-input v-model="select_word3" placeholder="商家标题" class="handle-input mr10"></el-input>
                                <el-button type="warning" icon="search" :loading="loading_status" @click="search">搜索</el-button>
                            </div>
                            <el-table :data="tableData" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                                <el-table-column type="selection" width="55" align="center"></el-table-column>
                                <el-table-column prop="goodsId" label="商品ID" sortable ></el-table-column>
                                <el-table-column prop="title" label="商品标题"  ></el-table-column>
                                <el-table-column prop="abbreviation" label="商品简称"></el-table-column>
                                <el-table-column prop="carousels" label="轮播图" ></el-table-column>
                                <el-table-column prop="content" label="商品详情描述"  ></el-table-column>
                                <el-table-column prop="coverImage" label="商品封面图"  ></el-table-column>
                                <el-table-column prop="onsale" label="上下架" :formatter="statusFormat"  ></el-table-column>
                                <el-table-column prop="price" label="前台展示价格"  ></el-table-column>
                                <el-table-column prop="sellerId" label="商品所属商家ID"  ></el-table-column>
                                <el-table-column prop="dateline" label="创建时间" ></el-table-column>
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
                url: '/xiaotao/goods/listGoods',
                tableData: [],
                total: 0,
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                select_word2: '',
                select_word3: '',
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
            statusFormat:function(row, column) {
                var status = row[column.property];
                if (status == undefined) {
                    return "";
                }
                var flag = '';
                if (status == 1)
                {
                    flag = '上架'
                }
                else
                {
                    flag = '下架'
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
                    params: {p: this.cur_page, size: 10, abbreviation: this.select_word, sellerName:this.select_word2,  title:this.select_word3}
                }).then((res) => {
                    this.tableData = res.data.data.data;
                    this.total = res.data.data.size;
                    this.loading_status = false;
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
