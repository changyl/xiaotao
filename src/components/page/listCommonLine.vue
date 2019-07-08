<template>

    <div class="table">
        <div class="container">
            <div class="handle-box">
                <!--<el-button type="warning" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>-->

                <el-input v-model="select_end" placeholder="目的地" class="handle-input mr10"></el-input>
                <el-input v-model="select_start" placeholder="出发地点" class="handle-input mr10"></el-input>
                <el-input v-model="select_linename" placeholder="线路名" class="handle-input mr10"></el-input>
                <el-button type="warning" icon="search" :loading="loading_status" @click="search">搜索</el-button>
                <el-button type="primary" icon="insert" @click="insert">新增</el-button>
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
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="(this.total)">
                </el-pagination>
            </div>
        </div>

        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="editForm" label-width="100px">
                <el-form-item label="线路名" prop="name" required>
                    <el-input v-model="editForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户ID" prop="userId" required>
                    <el-input v-model="editForm.userId" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="出发地点" prop="startPlace" required>
                    <el-input v-model="editForm.startPlace" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="途径地" prop="wyPlace" required>
                    <el-input v-model="editForm.wyPlace" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="目的地" prop="endPlace" required>
                    <el-input v-model="editForm.endPlace" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="danger" @click="closeEdit()">取消</el-button>
                <el-button type="primary" @click="saveEdit(editForm)">保存</el-button>
            </div>
        </el-dialog>

        <el-dialog title="新增" :visible.sync="insertVisible" width="30%">
            <el-form ref="form" :model="insertForm" label-width="100px">
                <el-form-item label="线路名" prop="name" required>
                    <el-input v-model="insertForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户ID" prop="userId" required>
                    <el-input v-model="insertForm.userId" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="出发地点" prop="startPlace" required>
                    <el-input v-model="insertForm.startPlace" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="途径地" prop="wyPlace" required>
                    <el-input v-model="insertForm.wyPlace" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="目的地" prop="endPlace" required>
                    <el-input v-model="insertForm.endPlace" autocomplete="off"></el-input>
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
                url: '/xiaotao/commonline/listCommonLine',
                updateUrl: '/xiaotao/commonline/saveOrUpdate',
                deleteUrl: '/xiaotao/commonline/deleteByPrimaryKey',
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
                idx: -1,
                editVisible: false,
                editForm: [],
                insertVisible: false,
                insertForm: []
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
            //  打开新增窗口
            insert() {
                this.insertVisible = true;
            },
            closeInsert() {
                this.insertVisible = false;
            },
            //  保存新增
            saveInsert(item) {
                this.$set(this.tableData, this.idx, item);
                this.$axios.post(this.updateUrl, {
                    name: item.name,
                    status: item.status,
                    userId: item.userId,
                    startPlace: item.startPlace,
                    wyPlace: item.wyPlace,
                    endPlace: item.endPlace
                }).then((res) => {
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
            handleEdit(index, row) {
                this.idx = index;
                const item = this.tableData[index];
                this.form = {
                    commonlineId: item.commonlineId,
                    name: item.name,
                    status: item.status,
                    userId: item.userId,
                    startPlace: item.startPlace,
                    wyPlace: item.wyPlace,
                    endPlace: item.endPlace
                }
                this.editVisible = true;
                this.editForm = Object.assign({}, row);
                console.log(this.editForm)
            },
            //  关闭编辑
            closeEdit(){
                this.editVisible = false;
            },
            // 保存编辑
            saveEdit(item) {
                this.$set(this.tableData, this.idx, item);
                this.$axios.post(this.updateUrl, {
                    commonlineId: item.commonlineId,
                    name: item.name,
                    status: item.status,
                    userId: item.userId,
                    startPlace: item.startPlace,
                    wyPlace: item.wyPlace,
                    endPlace: item.endPlace
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
            //  删除
            handleDelete(index, row) {
                const item = this.tableData[index];
                console.log(item.waylineId);
                this.$axios.post(this.deleteUrl, {
                    commonlineId: item.commonlineId
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
