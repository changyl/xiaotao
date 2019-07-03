<template>
    <el-col>
        <div class="table" name="first">
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
                <el-table :data="tableData" border class="table" ref="multipleTable"
                          @selection-change="handleSelectionChange">
                    <el-table-column type="selection" align="center"></el-table-column>
                    <el-table-column prop="sellerId" label="商家ID" sortable></el-table-column>
                    <!--<el-table-column prop="goodsType" label="商品类别"  ></el-table-column>-->
                    <el-table-column prop="sellerName" label="商家名称"></el-table-column>
                    <el-table-column prop="introduce" label="商家介绍"></el-table-column>
                    <el-table-column prop="sellerStatus" label="状态"></el-table-column>
                    <el-table-column prop="image" label="商家图片">
                        <template slot-scope="scope">
                            <img :src="scope.row.image" style="width: 100px; height: 100px" class="image"/>
                        </template>
                    </el-table-column>
                    <el-table-column prop="dateline" label="创建时间"></el-table-column>

                    <el-table-column label="操作" width="180" align="center">
                        <template slot-scope="scope">
                            <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">
                                编辑
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

            <!-- 编辑弹出框 -->
            <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
                <el-form ref="form" :model="editForm" label-width="100px">
                    <el-form-item label="商家名称:">
                        <el-input v-model="editForm.sellerName" :disabled="false"></el-input>
                    </el-form-item>
                    <el-form-item label="商家介绍:">
                        <el-input v-model="editForm.introduce" :disabled="false"></el-input>
                    </el-form-item>
                    <div>
                        <el-form-item label="商家类别:">
                            <el-select v-model="sellerStatuss" placeholder="请选择">
                                <el-option
                                        v-for="item in sellerStatus"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value" @change="getZoneCoursesetLists(item.value)">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="状态:">
                            <el-select placeholder="请选择">
                                <el-option
                                        v-for="item in sellerStatus"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>

                    </div>
                    <el-form-item label="营业执照:">
                        <img :src="editForm.image" style="width: 100px; height: 100px" class="image"/>

                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                            <el-button @click="editVisible = false">取 消</el-button>
                            <el-button type="warning" @click="saveEdit(editForm)">确 定</el-button>

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
                delUrl: '/xiaotao/seller/deleteByPrimaryKey',
                updateUrl: '/xiaotao/seller//saveOrUpdate',
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
                editForm: [],
                form: {
                    Id: '',
                    totalSum: ''
                },
                idx: -1,
                sellerStatus: [{
                    value: '0',
                    label: '无效'
                }, {
                    value: '1',
                    label: '有效'
                }],

            }
        },
        created() {
            this.getData();
        },
        mounted() {
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
                }
                ;
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
                this.editForm = Object.assign({}, row)
                console.log(this.editForm)
            },
            handleDelete(index, row) {
                this.idx = index;
                this.delVisible = true;
                this.$axios.post(this.delUrl, row.sellerId).then((res) => {
                    console.log("res" + res.data.code);
                    if (res.data.code == 0) {
                        alert("删除成功!")
                    } else {
                        alert("删除失败!")
                    }

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
            saveEdit(data) {
                this.$set(this.tableData, this.idx, this.form);

                console.log(this.value);
                // this.$message.success(`修改第 ${this.idx+1} 行成功`);
                // console.log(editForm.sellerStatus);
                this.$axios.post(this.updateUrl, {

                    sellerId: data.sellerId,
                    goodsType: data.goodsType,
                    sellerName: data.sellerName,
                    introduce: data.introduce,
                    image: data.image,
                    sellerStatus: this.value
                }).then((res) => {
                    console.log("res" + res.data.code);
                    if (res.data.code == 0) {
                        alert("修改成功!")
                    } else {
                        alert("修改失败!")
                    }
                    this.editVisible = false;
                }).finally(this.loading_status = false)

            },
            getZoneCoursesetLists(item) {
                // console.log(item);
                console.log(item);
            },
            // 确定删除
            deleteRow() {
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
