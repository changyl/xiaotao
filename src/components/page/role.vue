<template>

    <div class="table">

        <div class="container">
            <div class="handle-box">
                <!--<el-button type="warning" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>-->
                <el-input v-model="select_word" placeholder="角色名称" class="handle-input mr10"></el-input>

                <el-button type="warning" icon="search" :loading="this.loading_status" @click="search">搜索</el-button>

                <el-button type="primary" icon="search" :loading="this.loading_status" @click="insert">新增</el-button>

            </div>

            <el-table :data="tableData" border class="table" ref="multipleTable"
                      @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <!--<el-table-column prop="menuIds" label="菜单ID" sortable></el-table-column>-->
                <el-table-column prop="roleId" label="角色ID"></el-table-column>
                <el-table-column prop="roleName" label="角色名称"></el-table-column>
                <el-table-column prop="deleted" label="是否删除"></el-table-column>
                <el-table-column prop="createTime" :formatter="dateFormat" label="创建时间"></el-table-column>
                <el-table-column prop="updateTime" :formatter="dateFormat" label="更新时间"></el-table-column>

                <el-table-column label="操作" width="180" align="center">
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

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="editForm" :model="editForm" label-width="100px">
                <el-form-item label="角色名称:">
                    <el-input v-model="editForm.roleName"></el-input>
                </el-form-item>
                <template v-model="true" v-for="item in items">
                    <!--:v-model="showEditMenuCheckbox(editForm,item.id)"-->

                    <el-checkbox :true-label="item.id"
                                 @change="onEditMenuChang">{{ item.name }}
                    </el-checkbox>
                </template>
                <!--<el-form-item label="菜单:">-->
                <!--<el-select :placeholder="showEditRoleMenu(insertForm)" @change="onInsertChangeStatus"-->
                <!--:remote-method="remoteMethod">-->
                <!--<el-option-->
                <!--v-for="item in sellerStatus"-->
                <!--:key="item.value"-->
                <!--:label="item.label"-->
                <!--:value="item">-->
                <!--</el-option>-->
                <!--</el-select>-->
                <!--</el-form-item>-->


            </el-form>
            <span slot="footer" class="dialog-footer">
                            <el-button @click="editVisible = false">取 消</el-button>
                            <el-button type="warning" @click="saveEdit">确 定</el-button>

                            </span>
        </el-dialog>

        <!--新增-->
        <el-dialog title="新增" :visible.sync="insertVisible" width="30%">
            <el-form ref="insertForm" :model="insertForm" label-width="100px">
                <el-form-item label="角色名称:">
                    <el-input v-model="insertForm.roleName"></el-input>
                </el-form-item>
                <template v-for="item in items">
                    <el-checkbox :true-label="item.id" @change="onInsertMenuChang">{{ item.name }}</el-checkbox>
                </template>

            </el-form>
            <span slot="footer" class="dialog-footer">
                            <el-button @click="onInsertCancel">取 消</el-button>
                            <el-button type="warning" @click="saveInsert">确 定</el-button>

                            </span>
        </el-dialog>

    </div>

</template>

<script>
    import moment from 'moment'

    export default {
        name: 'basetable',
        data() {
            return {
                message: 'first',
                url: '/xiaotao/role/listRole',
                delUrl: '/xiaotao/role/delete',
                updUrl: '/xiaotao/role/saveOrUpdate',
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
                insertVisible: false,
                editRoleMenuChecked: {},
                items: [],

                menuUrl: '/xiaotao/menu/showAllMenu',
                insertForm: {
                    roleName: '',
                    menuIds: []
                },
                editForm: [],
                form: {
                    menuIds: '',
                    roleId: '',
                    roleName: '',
                    createTime: '',
                    updateTime: '',
                    deleted: ''
                },
                idx: -1
            }
        },
        activated() {
            console.log(this.$route.path);
            this.getData();
        },
        mounted() {
            this.getData();
        },

        methods: {
            dateFormat: function (row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD HH:mm:ss");
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
                }
                ;
                this.$axios.get(this.url, {
                    params: {p: this.cur_page, size: 10}
                }).then((res) => {

                    this.tableData = res.data.data;
                    this.total = res.data.data.size;
                })
            },
            search() {
                this.loading_status = true;
                this.$axios.get(this.url, {
                    params: {p: this.cur_page, size: 10, sellerName: this.select_word}
                }).then((res) => {
                    this.tableData = res.data.data;
                    this.total = res.data.size;
                    cthis.loading_status = true;
                }).finally(this.loading_status = false)
            },
            // search() {
            //     this.loading_status = true;
            //     this.$axios.get(this.url, {
            //         params: {p: this.cur_page, size: 10, roleName: this.select_word}
            //     }).then((res) => {
            //         this.tableData = res.data.data.data;
            //         this.total = res.data.size;
            //         console.log(1111, this.tableData)
            //         // cthis.loading_status = true;
            //     }).finally(this.loading_status = false)
            // },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            async handleEdit(index, row) {
                await this.pullMenuList();

                console.log(this.items, 111)

                this.idx = index;
                const item = this.tableData[index];
                this.form = {
                    JobId: item.JobId,
                    sid: item.sid,
                    status: item.status
                }

                for (var i = 0; i < this.items.length; i++) {

                    console.log("check:" + this.items[i]);
                    // this.editRoleMenuChecked[i].id = true;
                    // debugger
                    if (row.menuIds.indexOf(this.items[i].id) > -1) {
                        const id = this.items[i].id;
                        this.editRoleMenuChecked[this.items[i].id] = true
                    } else {
                        this.editRoleMenuChecked[this.items[i].id] = false
                    }
                }
                //debugger
                console.log("editRoleMenuChecked：111" + this.editRoleMenuChecked.toString())
                this.editVisible = true;
                this.editForm = Object.assign({}, row);
                console.log("row:" + row.roleId)
            },
            handleDelete(index, row) {
                this.idx = index;
                // this.delVisible = true;
                this.$axios.get(this.delUrl, {
                    params: {roleId: row.roleId}
                }).then((res) => {
                    if (res.data.code == 0) {
                        alert("删除成功!")
                    } else {
                        alert("删除失败!")
                    }
                    this.getData();
                })

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
            onInsertMenuChang(event) {
                console.log(event)
                this.insertForm.menuIds.push(event)
                console.log(this.insertForm.menuIds)
            },
            onEditMenuChang(event) {
                console.log(2222222, this.editForm.menuIds)
                // if (this.editForm.menuIds.concat(event.value)){
                //     console.log(111111111111)
                //     this.editForm.menuIds.
                // }
                var index= '';
                for (var i = 0; i < this.editForm.menuIds.length; i++) {
                    if (event.value == this.editForm.menuIds[i]) {
                        index = i;
                    }


                }
                console.log(index)
                if (index != '') {
                    this.editForm.menuIds.split(index, 1);
                } else {
                    this.editForm.menuIds.push(event.value);
                }
                console.log(this.insertForm.menuIds)
            },
            // 保存编辑
            saveEdit() {
                this.$set(this.tableData, this.idx, this.form);
                this.editVisible = false;
                // this.$message.success(`修改第 ${this.idx+1} 行成功`);
                this.$axios.post(this.updUrl, {

                    roleId: this.editForm.roleId,
                    roleName: this.editForm.roleName,
                    menuIds: this.editForm.menuIds

                }).then((res) => {
                    if (res.data.code == 0) {
                        alert("修改成功!")
                    } else {
                        alert("修改失败!")
                    }
                    this.getData();
                })
            },
            saveInsert(insertForm) {
                if (this.insertForm.roleName == '') {
                    alert("请输入角色名")
                    return;
                }
                this.$set(this.tableData, this.idx, this.form);
                this.insertVisible = false;
                this.insertForm.menuIds = [];
                this.$axios.post(this.updUrl, {

                    roleName: this.insertForm.roleName,
                    menuIds: this.insertForm.menuIds.toString()

                }).then((res) => {
                    if (res.data.code == 0) {
                        alert("新增成功!")
                    } else {
                        alert("新增失败!")
                    }
                    this.getData();
                })
                this.insertForm = [];
            },
            insert() {
                this.pullMenuList();
                this.insertVisible = true;
                console.log(this.insertForm.roleName)
                console.log(this.insertForm.menuIds)
            },
            async pullMenuList() {
                const res = await this.$axios.get(this.menuUrl)
                console.log("res", res.data.data);
                this.items = res.data.data;
            },


            onInsertCancel() {
                this.insertVisible = false;
                this.items = [];
                this.insertForm = {};
                this.insertForm.menuIds = [];
                this.insertForm.roleName = '';
            },
            showEditMenuCheckbox(editForm, menuId) {
                console.log(editForm, menuId)
                if (editForm.menuIds.indexOf(menuId) > -1) {
                    console.log(menuId + ":true")
                    return true;
                } else {
                    console.log(menuId + ":false")

                    return false;
                }

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
