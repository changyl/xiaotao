<template>

    <div class="table">
        <div class="container">
            <div class="handle-box">
                <el-input v-model="select_word" placeholder="商品简称" class="handle-input mr10"></el-input>
                <el-input v-model="select_word2" placeholder="商家名称" class="handle-input mr10"></el-input>
                <el-input v-model="select_word3" placeholder="商家标题" class="handle-input mr10"></el-input>
                <el-button type="warning" icon="search" :loading="loading_status" @click="search">搜索</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable"
                      @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="goodsId" label="商品ID" sortable></el-table-column>
                <el-table-column prop="title" label="商品标题"></el-table-column>
                <el-table-column prop="abbreviation" label="商品简称"></el-table-column>
                <el-table-column prop="carousels" label="轮播图"></el-table-column>
                <el-table-column prop="content" label="商品详情描述"></el-table-column>
                <el-table-column prop="coverImage" label="商品封面图">
                    <template slot-scope="scope">
                        <img :src="scope.row.coverImage" style="width: 100px; height: 100px" class="image"/>
                    </template>
                </el-table-column>
                <el-table-column prop="onsale" label="上下架" :formatter="statusFormat"></el-table-column>
                <el-table-column prop="price" label="前台展示价格"></el-table-column>
                <el-table-column prop="sellerId" label="商品所属商家ID"></el-table-column>
                <el-table-column prop="dateline" label="创建时间"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button type="danger" icon="el-icon-delete" class="white"
                                   @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next"
                               :total="(this.total)">
                </el-pagination>
            </div>
        </div>
        <div>
            <el-alert
                    :visible.sync="updateSuccessVisible"
                    title="成功提示的文案"
                    type="success"
                    center
                    show-icon>
            </el-alert>
        </div>
        <div>
            <el-dialog title="编辑"
                       :visible.sync="editFormVisible"
                       :close-on-click-modal="false"
                       class="edit-form"
                       :before-close="handleClose" height="2000px" width="1000px">
                <el-form :inline="true" :model="editForm" label-width="300px" label-height="300px"
                         :rules="editFormRules" ref="editForm">
                    <div>
                        <el-form-item label="商品标题:" prop="title">
                            <el-input v-model="editForm.title" text="123" label="left" auto-complete="off"></el-input>
                        </el-form-item>

                        <el-form-item label="商品简称:" prop="title">
                            <el-input v-model="editForm.abbreviation" auto-complete="off"></el-input>
                        </el-form-item>

                        <el-form-item label="前台展示价格:" prop="price">
                            <el-input v-model="editForm.price" auto-complete="off"></el-input>
                        </el-form-item>
                    </div>

                    <div>
                        <el-form-item label="商品封面图:" prop="coverImage" auto-complete="off">
                            <!--<el-input v-model="editForm.coverImage" text="123" auto-complete="off"></el-input>-->
                            <!--<img :src="editForm.coverImage" alt="" style="width: 36px;height:36px">-->
                            <img :src="editForm.coverImage" min-width="70" height="70"/>
                        </el-form-item>
                    </div>

                    <div>
                        <el-form-item label="上下架:" prop="onsale">
                            <!--<el-input v-model="editForm.onsale"  auto-complete="off"></el-input>-->

                            <el-radio v-model="radio" label="1" check="editForm.onsale">上架</el-radio>
                            <el-radio v-model="radio" label="2" check="editForm.onsale">下架</el-radio>

                        </el-form-item>
                    </div>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click.native="handleCancel">取消</el-button>
                    <el-button type="primary" @click.native="handleUpdate(editForm)">更新</el-button>
                </div>
            </el-dialog>
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
                updateUrl: 'xiaotao/goods/saveOrUpdate',
                delUrl:'/xiaotao/goods/deleteByPrimaryKey',
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
                editForVisible: true,
                editFormVisible: false,
                updateSuccessVisible: false,
                editForm: [],
                form: {
                    autoid: '',
                    fun: '',
                    jid: '',
                    return: '',
                    success: ''
                },
                idx: -1
            }
        },
        activated() {
            this.getData();
        },
        mounted() {
            this.getData();
        },

        load(){
            this.getData();
        },

        methods: {
            statusFormat: function (row, column) {
                var status = row[column.property];
                if (status == undefined) {
                    return "";
                }
                var flag = '';
                if (status == 1) {
                    flag = '上架'
                } else {
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
                    params: {
                        p: this.cur_page,
                        size: 10,
                        abbreviation: this.select_word,
                        sellerName: this.select_word2,
                        title: this.select_word3
                    }
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
                this.editFormVisible = true;
                this.editForm = Object.assign({}, row);
            },
            handleDelete(index, row) {
                this.idx = index;
                this.delVisible = true;
                this.$axios.post(this.delUrl, row.goodsId).then((res) => {
                    console.log("res" + res.data.code);
                    if (res.data.code == 0) {
                        alert("删除成功!")
                    } else {
                        alert("删除失败!")
                    }
                    this.editFormVisible = false;
                    this.getData();
                }).finally(this.loading_status = false)
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
                this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            },
            // 确定删除
            deleteRow() {
                this.tableData.splice(this.idx, 1);
                this.$message.success('删除成功');
                this.delVisible = false;
            },
            handleCancel() {
                console.log("取消");
                this.editFormVisible = false;
            },
            handleUpdate(data) {
                this.loading_status = true;
                this.$axios.post(this.updateUrl, {

                    title: data.title,
                    abbreviation: data.abbreviation,
                    goodsId: data.goodsId,
                    price: data.price

                }).then((res) => {
                    console.log("res" + res.data.code);
                    if (res.data.code == 0) {
                        alert("修改成功!")
                    } else {
                        alert("修改失败!")
                    }
                    this.editFormVisible = false;
                }).finally(this.loading_status = false)
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

    .del-dialog-cnt {
        font-size: 16px;
        text-align: center
    }

    .table {
        width: 100%;
        font-size: 14px;
    }

    .red {
        color: #ff0000;
    }
</style>
