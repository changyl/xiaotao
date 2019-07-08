<template>

    <div class="table">
        <div class="container">
            <div class="handle-box">
                <!--<el-button type="warning" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>-->
                <!--<el-select v-model="select_cate" placeholder="筛选job状态" class="handle-select mr10">-->
                <!--<el-option key="1" label="unready" value="-1"></el-option>-->
                <!--<el-option key="2" label="ready" value="0"></el-option>-->
                <!--<el-option key="3" label="running" value="1"></el-option>-->
                <!--<el-option key="4" label="finished" value="2"></el-option>-->
                <!--<el-option key="5" label="failed" value="3"></el-option>-->
                <!--<el-option key="6" label="error" value="4"></el-option>-->
                <!--</el-select>-->
                <el-input v-model="select_word" placeholder="顺道名称" class="handle-input mr10"></el-input>
                <el-button type="warning" icon="search" :loading="loading_status" @click="search">搜索</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable"
                      @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="vehicleownerId" label="ID" sortable></el-table-column>
                <el-table-column prop="userId" label="用户ID"></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="phone" label="联系电话"></el-table-column>
                <el-table-column prop="idCardFront" label="身份证正面"></el-table-column>
                <el-table-column prop="idCardBack" label="身份证反面"></el-table-column>
                <el-table-column prop="driverCardfront" label="驾驶证正面"></el-table-column>
                <el-table-column prop="driverCardback" label="驾驶证反面"></el-table-column>
                <el-table-column prop="isVerify" label="审核通过"></el-table-column>
                <el-table-column prop="createTime" label="创建时间"></el-table-column>
                <el-table-column prop="updateTime" label="更新时间"></el-table-column>
                <el-table-column prop="status" label="状态"></el-table-column>
                <!--<el-table-column prop="caozuo" label="操作" ></el-table-column>-->
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row, '1')">通过
                        </el-button>
                        <el-button type="danger" icon="el-icon-delete" class="white"
                                   @click="handleEdit(scope.$index, scope.row, '0')">拒绝
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

        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="editForm" label-width="100px">
                <el-form-item label="UserID" prop="userId" required>
                    <el-input v-model="editForm.userId" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name" required>
                    <el-input v-model="editForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="phone" required>
                    <el-input v-model="editForm.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="身份证正面" prop="idCardFront" required>
                    <el-input v-model="editForm.idCardFront" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="身份证反面" prop="idCardBack" required>
                    <el-input v-model="editForm.idCardBack" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="驾驶证正面" prop="driverCardfront" required>
                    <el-input v-model="editForm.driverCardfront" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="驾驶证反面" prop="driverCardback" required>
                    <el-input v-model="editForm.driverCardback" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="danger" @click="closeEdit()">取消</el-button>
                <el-button type="primary" @click="saveEdit(editForm)">保存</el-button>
            </div>
        </el-dialog>

        <el-dialog title="新增" :visible.sync="insertVisible" width="30%">
            <el-form ref="form" :model="insertForm" label-width="100px">
                <el-form-item label="UserID" prop="userId" required>
                    <el-input v-model="insertForm.userId" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name" required>
                    <el-input v-model="insertForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="phone" required>
                    <el-input v-model="insertForm.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="身份证正面" prop="idCardFront" required>
                    <el-input v-model="insertForm.idCardFront" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="身份证反面" prop="idCardBack" required>
                    <el-input v-model="insertForm.idCardBack" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="驾驶证正面" prop="driverCardfront" required>
                    <el-input v-model="insertForm.driverCardfront" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="驾驶证反面" prop="driverCardback" required>
                    <el-input v-model="insertForm.driverCardback" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="danger" @click="closeInsert()">取消</el-button>
                <el-button type="primary" @click="saveInsert(insertForm)">保存</el-button>
            </div>
        </el-dialog>
    </div>


</template>

<script>
    export default {
        name: 'basetable',
        data() {
            return {
                message: 'first',
                url: '/xiaotao/vehicleowner/listVehicleOwner',
                updateUrl: '/xiaotao/vehicleowner/verify',
                deleteUrl: '/xiaotao/vehicleowner/deleteByPrimaryKey',
                tableData: [],
                total: 0,
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                loading_status: false,
                editVisible: false,
                delVisible: false,
                editForm:[],
                form: {
                    autoid: '',
                    fun: '',
                    jid: '',
                    return: '',
                    success: ''
                },
                idx: -1,
                insertVisible: false,
                insertForm: []
            }
        },
        activated() {
            this.getData();
        },
        mounted() {
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
                    flag = '正常'
                } else if (status == 2) {
                    flag = '完成'
                } else {
                    flag = '取消'
                }
                return flag
            },
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },

            getData() {
                this.$axios.get(this.url, {
                    params: {p: this.cur_page, size: 10, isNullVerify: 1}
                }).then((res) => {
                    console.log(res.data)
                    this.tableData = res.data.data.data;
                    this.total = res.data.data.size;
                })
            },
            //  搜索查询
            search() {
                this.loading_status = true;
                this.$axios.get(this.url, {
                    params: {p: this.cur_page, size: 10, siteName: this.select_word, isNullVerify: 1}
                }).then((res) => {
                    console.log(res.data)
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
            //  打开新增窗口
            insert() {
                this.insertVisible = true;
            },
            closeInsert() {
                this.insertVisible = false;
            },
            //  保存新增
            saveInsert(data) {
                this.$set(this.tableData, this.idx, data);
                this.$axios.post(this.updateUrl, {
                    userId: data.userId,
                    name: data.name,
                    phone: data.phone,
                    idCardFront: data.idCardFront,
                    idCardBack: data.idCardBack,
                    driverCardfront: data.driverCardfront,
                    driverCardback: data.driverCardback
                }).then((res) => {
                    console.log("res" + res.data.code);
                    if (res.data.code == 0) {
                        alert("添加成功!");
                        this.search();
                    } else {
                        alert("添加失败!");
                    }
                    this.insertVisible = false;
                }).finally(this.loading_status = false)
            },
            //  打开编辑
            handleEdit(index, row, isVerify) {
                this.idx = index;
                const item = this.tableData[index];
                this.$axios.post(this.updateUrl, {
                    vehicleownerId: item.vehicleownerId,
                    isVerify: isVerify
                }).then((res) => {
                    if (res.data.code == 0) {
                        alert("审核成功!");
                    } else {
                        alert("审核失败!");
                    }
                    this.editVisible = false;
                    this.search();
                }).finally(this.loading_status = false)
            },
            // 保存编辑
            saveEdit(data) {
                this.$set(this.tableData, this.idx, data);
                this.$axios.post(this.updateUrl, {
                    vehicleownerId: data.vehicleownerId,
                    userId: data.userId,
                    name: data.name,
                    phone: data.phone,
                    idCardFront: data.idCardFront,
                    idCardBack: data.idCardBack,
                    driverCardfront: data.driverCardfront,
                    driverCardback: data.driverCardback
                }).then((res) => {
                    if (res.data.code == 0) {
                        alert("修改成功!");
                    } else {
                        alert("修改失败!");
                    }
                    this.editVisible = false;
                    this.search();
                }).finally(this.loading_status = false)
            },
            closingDiag: function () {
                this.$emit('close-edit', true)
            },
            //  删除
            handleDelete(index, row) {
                const item = this.tableData[index];
                console.log(item.waylineId);
                this.$axios.post(this.deleteUrl, {
                    vehicleownerId: item.vehicleownerId
                }).then((res) => {
                    if (res.data.code == 0) {
                        alert("删除成功!");
                        this.search();
                    } else {
                        alert("删除失败!");
                    }
                    this.editVisible = false;
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
            // 确定删除
            deleteRow() {
                this.$axios.post(this.deleteUrl, {
                    siteId: data.siteId
                }).then((res) => {
                    if (res.data.code == 0) {
                        alert("删除成功!");
                        this.search();
                    } else {
                        alert("删除失败!");
                    }
                    this.editVisible = false;
                }).finally(this.loading_status = false)
            },
            closeEdit(){
                this.editVisible = false;
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
