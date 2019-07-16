<template>
    <div class="table">
        <div class="container">
            <div class="handle-box">
                <el-input v-model="select_word" placeholder="用户名称" class="handle-input mr10"></el-input>
                <el-button type="warning" icon="search" :loading="loading_status" @click="getData()">搜索</el-button>
                <el-button type="primary" icon="insert" @click="insert">新增</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable"
                      @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="sysUserId" label="系统用户ID" sortable></el-table-column>
                <el-table-column prop="username" label="昵称"></el-table-column>
                <el-table-column prop="mobile" label="手机号"></el-table-column>
                <el-table-column prop="role" label="角色"></el-table-column>
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

        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="editForm" label-width="100px">
                <el-form-item label="昵称" prop="username" required>
                    <el-input v-model="editForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile" required>
                    <el-input v-model="editForm.mobile" autocomplete="off"></el-input>
                </el-form-item>
                <!--<el-form-item label="角色" prop="role" required>-->
                <!--<el-input v-model="editForm.role" autocomplete="off"></el-input>-->
                <!--</el-form-i
                。tem>-->
                <!---->
                <el-form-item label="角色:">
                    <el-select :placeholder="showRole(editForm)" @change="onEditRoleChange"
                               :remote-method="remoteMethod">
                        <el-option
                                v-for="item in roleList"
                                :key="item.roleId"
                                :label="item.roleName"
                                :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="密码" prop="password" required>
                    <el-input v-model="editForm.password" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="danger" @click="closeEdit()">取消</el-button>
                <el-button type="primary" @click="saveEdit(editForm)">保存</el-button>
            </div>
        </el-dialog>

        <el-dialog title="新增" :visible.sync="insertVisible" width="30%">
            <el-form ref="form" :model="insertForm" label-width="100px">
                <el-form-item label="昵称" prop="username" required>
                    <el-input v-model="insertForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile" required>
                    <el-input v-model="insertForm.mobile" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色:">
                    <el-select :placeholder="showInsertRole(insertForm)" @change="onInsertRoleChange"
                               :remote-method="remoteMethod">
                        <el-option
                                v-for="item in roleList"
                                :key="item.roleId"
                                :label="item.roleName"
                                :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="密码" prop="role" required>
                    <el-input v-model="insertForm.password" autocomplete="off"></el-input>
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
                url: '/xiaotao/system/sysUserList',
                updateUrl: '/xiaotao/system/saveOrUpdate',
                deleteUrl: '/xiaotao/system/deleteByPrimaryKey',
                roleUrl: '/xiaotao/role/listRole',
                tableData: [],
                total: 0,
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                editVisible: false,
                insertVisible: false,
                delVisible: false,
                roleList: [],
                roleName:'',
                editForm: [],
                insertForm: [],
                idx: -1
            }
        },
        activated() {
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
                    this.url = this.url;
                }
                ;
                this.$axios.get(this.url, {
                    params: {p: this.cur_page, size: 10, username: this.select_word}
                }).then((res) => {
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
                    sysUserId: item.sysUserId,
                    totalSum: item.totalSum,
                    modifiedTime: item.modifiedTime
                }

                this.$axios.get(this.roleUrl).then((res) => {
                    if (res.data.code == 0) {
                        this.roleList = res.data.data;
                    }
                    // console.log("roleList:" + this.roleList[0].roleName)
                    this.editVisible = true;
                    this.editForm = Object.assign({}, row);
                });
            },
            closeEdit() {
                this.editVisible = false;
            },
            handleDelete(index, row) {
                const item = this.tableData[index];
                console.log(item.waylineId);
                this.$axios.post(this.deleteUrl, {
                    sysUserId: item.sysUserId
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
            showRole(data) {
                if (data.role == '') {
                    return "请选择";
                }
                for (var i = 0; i < this.roleList.length; i++) {
                    if (this.roleList[i].roleId == data.role) {
                        this.roleName = this.roleList[i].roleName;
                        console.log(this.roleName)
                        return this.roleName;
                    }
                }
            },
            showInsertRole(insertData){
                if (insertData.role == ''){
                    return "请选择";
                }

                for (var i = 0; i < this.roleList.length; i++) {
                    if (this.roleList[i].roleId == insertData.role) {
                        this.roleName = this.roleList[i].roleName;
                        console.log(this.roleName)
                        return this.roleName;
                    }
                }
            },
            onEditRoleChange(event){
              this.editForm.role = event.roleId;
              this.roleName = event.roleName;
              // console.log(this.roleName)
            },
            onInsertRoleChange(event){
              this.insertForm.role = event.roleId;
              this.roleName = event.roleName;
              // console.log("roleName:"+this.roleName)
            },
            // 保存编辑
            saveEdit(data) {
                this.$set(this.tableData, this.idx, data);

                this.$axios.post(this.updateUrl, {
                    sysUserId: data.sysUserId,
                    username: data.username,
                    mobile: data.mobile,
                    status: data.status,
                    role: data.role,
                    password: data.password
                }).then((res) => {
                    if (res.data.code == 0) {
                        alert("修改成功!");
                    } else {
                        alert("修改失败!");
                    }
                    this.editVisible = false;
                    this.getData();
                }).finally(this.loading_status = false)
            },
            //  打开新增窗口
            insert() {
                this.$axios.get(this.roleUrl).then((res) => {
                    if (res.data.code == 0) {
                        this.roleList = res.data.data;
                    }
                    // console.log("roleList:" + this.roleList[0].roleName)

                });
                this.insertVisible = true;
            },
            closeInsert() {
                this.insertVisible = false;
                this.insertForm = [];
            },
            //  保存新增
            saveInsert(data) {
                this.$set(this.tableData, this.idx, data);
                this.$axios.post(this.updateUrl, {
                    username: data.username,
                    mobile: data.mobile,
                    status: data.status,
                    role: data.role,
                    password: data.password
                }).then((res) => {
                    console.log("res" + res.data.code);
                    if (res.data.code == 0) {
                        alert("添加成功!");
                        this.getData();
                    } else {
                        alert(res.data.message);
                    }
                    this.insertVisible = false;
                    this.insertForm = [];
                }).finally(this.loading_status = false)
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
