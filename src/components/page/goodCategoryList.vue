<template>

    <div class="table">
        <div class="container">
            <div class="handle-box">
                <!--<el-input v-model="select_word" placeholder="商品简称" class="handle-input mr10"></el-input>-->
                <el-input v-model="select_word2" placeholder="类目名称" class="handle-input mr10"></el-input>
                <!--<el-input v-model="select_word3" placeholder="商家标题" class="handle-input mr10"></el-input>-->
                <el-button type="warning" icon="search" :loading="loading_status" @click="search">搜索</el-button>
                <el-button type="primary" icon="insert" @click="insert">新增</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable"
                      @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="categoryId" label="分类ID" sortable></el-table-column>
                <el-table-column prop="name" label="分类名称"></el-table-column>
                <el-table-column prop="levelName" label="分类级别"></el-table-column>
                <el-table-column prop="image" label="分类图片">
                    <template slot-scope="scope">
                        <img :src="scope.row.image" style="width: 100px; height: 100px" class="image"/>
                    </template>
                </el-table-column>
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
            <el-dialog title="编辑"
                       :visible.sync="editFormVisible"
                       :close-on-click-modal="false"
                       class="edit-form"
                       :before-close="handleClose" height="2000px" width="1000px">
                <el-form :inline="true" :model="editForm" label-width="300px" label-height="300px"
                         :rules="editFormRules" ref="editForm">
                    <div>
                        <el-form-item label="分类标题:" prop="name">
                            <el-input v-model="editForm.name" text="123" label="left" auto-complete="off"></el-input>
                        </el-form-item>

                        <!--<el-form-item label="分类级别:" prop="level">-->
                        <!--<el-input v-model="editForm.level" auto-complete="off"></el-input>-->
                        <!--</el-form-item>-->
                        <el-form-item label="分类级别:">
                            <el-select :placeholder="showLevelStatus(editForm)" @change="onEditChangeLevelStatus"
                                       :remote-method="remoteMethod">
                                <el-option
                                        v-for="item in categoryLevel"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="父类:">
                            <el-select :placeholder="showTargetCategoryStatus(editForm)"
                                       @change="onEditYiJiChangeLevelStatus"
                                       :remote-method="remoteMethod" :disabled="this.targetCategoryDisplay">
                                <el-option
                                        v-for="item in yiJiCategory"
                                        :key="item.categoryId"
                                        :label="item.name"
                                        :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>

                    <div>
                        <el-form-item label="类目图片:" prop="image" auto-complete="off">
                            <!--<el-input v-model="editForm.coverImage" text="123" auto-complete="off"></el-input>-->
                            <!--<img :src="editForm.coverImage" alt="" style="width: 36px;height:36px">-->
                            <img :src="editForm.image" min-width="70" height="70"/>
                        </el-form-item>

                        <el-upload action="http://upload-z1.qiniup.com" :before-upload="beforeAvatarUpload"
                                   class="img-uploader" :data="qiNiuYunData" :on-success="handleCategoryImageeSuccess">
                            <el-button size="small" type="primary" calss="upload-Button">点击上传</el-button>
                        </el-upload>
                    </div>

                    <div>
                        <el-form-item label="状态:">
                            <el-select :placeholder="showCategoryStatus(editForm)" @change="onEditChangeOnsaleStatus"
                                       :remote-method="remoteMethod">
                                <el-option
                                        v-for="item in categoryStatus"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click.native="handleCancel">取消</el-button>
                    <el-button type="primary" @click.native="handleUpdate(editForm)">更新</el-button>
                </div>
            </el-dialog>

            <!--新增-->
            <el-dialog title="新增"
                       :visible.sync="insertVisible"
                       :close-on-click-modal="false"
                       class="edit-form"
                       :before-close="handleClose" height="2000px" width="1000px">
                <el-form :inline="true" :model="insertForm" label-width="300px" label-height="300px"
                         :rules="editFormRules" ref="insertForm">
                    <div>
                        <el-form-item label="分类标题:" prop="name">
                            <el-input v-model="insertForm.name" text="123" label="left" auto-complete="off"></el-input>
                        </el-form-item>

                        <!--<el-form-item label="分类级别:" prop="level">-->
                        <!--<el-input v-model="editForm.level" auto-complete="off"></el-input>-->
                        <!--</el-form-item>-->
                        <el-form-item label="分类级别:">
                            <el-select :placeholder="showLevelStatus(insertForm)" @change="onInsertChangeLevelStatus"
                                       :remote-method="remoteMethod">
                                <el-option
                                        v-for="item in categoryLevel"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        +
                        <el-form-item label="父类:">
                            <el-select :placeholder="showTargetCategoryStatus(editForm)"
                                       @change="onInsertYiJiChangeLevelStatus"
                                       :remote-method="remoteMethod" :disabled="this.targetInsertCategoryDisplay">
                                <el-option
                                        v-for="item in yiJiCategory"
                                        :key="item.categoryId"
                                        :label="item.name"
                                        :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>

                    </div>

                    <div>
                        <el-form-item label="类目图片:" prop="image" auto-complete="off">
                            <!--<el-input v-model="editForm.coverImage" text="123" auto-complete="off"></el-input>-->
                            <!--<img :src="editForm.coverImage" alt="" style="width: 36px;height:36px">-->
                            <img :src="insertForm.image" min-width="70" height="70"/>
                        </el-form-item>

                        <el-upload action="http://upload-z1.qiniup.com" :before-upload="beforeAvatarUpload"
                                   class="img-uploader" :data="qiNiuYunData"
                                   :on-success="handleInsertCategoryImageeSuccess">
                            <el-button size="small" type="primary" calss="upload-Button">点击上传</el-button>
                        </el-upload>
                    </div>

                    <div>
                        <el-form-item label="状态:">
                            <el-select :placeholder="showCategoryStatus(insertForm)"
                                       @change="onInsertChangeOnsaleStatus"
                                       :remote-method="remoteMethod">
                                <el-option
                                        v-for="item in categoryStatus"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click.native="handleInsertCancel">取消</el-button>
                    <el-button type="primary" @click.native="handleUpdate(insertForm)">新增</el-button>
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
                url: '/xiaotao/goods/listCategory',
                updateUrl: 'xiaotao/goods/saveOrUpdateCategory',
                delUrl: '/xiaotao/goods/deleteCategoryByPrimaryKey',
                getJiYiCategoryListUrl: '/xiaotao/goods/listYiJiCategory',
                qiNiuYunTokenUrl: '/xiaotao/auth/getUpLoadToken', qiNiuYunData: {
                    key: '',
                    token: ''
                },
                qiNiuYunUrl: 'http://pu644r48l.bkt.clouddn.com',
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
                targetCategoryDisplay: true,
                targetInsertCategoryDisplay: true,
                editForm: [],

                insertForm: {
                    levelName: '',
                    level: '',
                    image: '',
                    targetId: undefined,
                    status: undefined
                },
                form: {
                    autoid: '',
                    fun: '',
                    jid: '',
                    return: '',
                    success: ''
                },
                yiJiCategory: [],
                categoryStatus: [{
                    value: '0',
                    label: '失效'
                }, {
                    value: '1',
                    label: '有效'
                }],

                categoryLevel: [{
                    value: '0',
                    label: '一级类目'
                },
                    {
                        value: '1',
                        label: '二级类目'
                    }],
                idx: -1,
                insertVisible: false
            }
        },
        activated() {
            this.getData();
        },
        mounted() {
            this.getData();
        },

        load() {
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
                    for (var i = 0; i < this.tableData.length; i++) {
                        var level = this.tableData[i];
                        this.tableData[i].levelName = level == 0 ? "一级类目" : "二级类目";
                    }
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
            insert() {
                console.log("打开新增窗口");
                this.getYiJiCategoryList();
                this.insertVisible = true;
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },

            async getYiJiCategoryList() {
                this.$axios.get(this.getJiYiCategoryListUrl).then((res) => {
                    console.log("res" + res.data);

                    this.yiJiCategory = res.data.data;
                    console.log("yijiCategory:" + this.yiJiCategory)
                }).finally()
            },
            handleEdit(index, row) {
                this.idx = index;
                const item = this.tableData[index];
                this.form = {
                    JobId: item.JobId,
                    sid: item.sid,
                    status: item.status
                }


                this.getYiJiCategoryList();
                this.editFormVisible = true;
                this.editForm = Object.assign({}, row);


            },
            handleDelete(index, row) {
                this.idx = index;
                this.delVisible = true;
                this.$axios.get(this.delUrl, {
                    params: {
                        categoryId: row.categoryId
                    }
                }).then((res) => {
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
            handleInsertCancel() {
                this.insertVisible = false;
                this.insertForm = [];
            },
            showOnSaleStatus(formData) {
                console.log("formData:" + formData.onsale);
                if (formData.onsale == undefined) {
                    return "请选择";
                }
                if (formData.onsale == 1) {
                    return "上架";
                }
                if (formData.onsale == 0) {
                    console.log()
                    return "下架";
                }
            },
            showCategoryStatus(formdata) {
                // console.log(formData.level);
                if (formdata.status == undefined) {
                    return "请选择";
                }
                if (formdata.status == 1) {
                    return "有效";
                }
                if (formdata.status == 0) {
                    return "失效";
                }
            },
            onEditChangeLevelStatus(event) {
                this.editForm.level = event.value;
                console.log("event:" + event.value)
                if (event.value == 1) {
                    this.targetCategoryDisplay = false;
                } else {
                    this.targetCategoryDisplay = true;
                }
            },
            onEditYiJiChangeLevelStatus(event) {
                this.editForm.target = event.value;
            },
            onInsertYiJiChangeLevelStatus(event) {
                this.insertForm.targetId = event.value;
            },
            onInsertChangeLevelStatus(event) {
                this.insertForm.level = event.value;
                if (event.value == 1) {
                    this.targetInsertCategoryDisplay = false;
                    getYiJiCategoryList();
                }
            },
            showLevelStatus(formData) {
                console.log(formData.level);
                if (formData.level == undefined) {
                    return "请选择";
                }
                if (formData.level == 1) {
                    // this.YiJiCategoryVisible=true;
                    // this.targetCategoryDisplay=true;
                    this.targetCategoryDisplay = false;
                    return "二级类目";
                }
                if (formData.level == 0) {
                    console.log()
                    this.targetInsertCategoryDisplay = true;
                    return "一级类目";
                }
            },
            showTargetCategoryStatus(formData) {
                console.log("formData.targetId:" + formData.targetId);
                if (formData.targetId == '' || formData.targetId == 0) {
                    this.targetCategoryDisplay = false;
                    return "请选择";
                } else {
                    // this.getYiJiCategoryList();
                    // this.targetCategoryDisplay=false;

                }
            },
            onEditChangeOnsaleStatus(event) {
                this.editForm.status = event.value;
            },
            onInsertChangeOnsaleStatus(event) {
                this.insertForm.status = event.value;
            },

            getQiniuToken: function () {
                const _this = this;
                this.$axios
                    .get(this.qiNiuYunTokenUrl)
                    .then((res) => {
                        console.log("res" + res.data.code);
                        if (res.data.code == 0) {
                            // this.qiNiuYunData.token=res.data.data;
                            this.qiNiuYunData.token = res.data.data;
                            // console.log("token:"+res.data.data)
                            console.log("key:" + this.qiNiuYunData.key)
                            console.log("token:" + this.qiNiuYunData.token)
                        }
                    });
            },
            //上传图片校验
            beforeAvatarUpload(file) {
                this.qiNiuYunData.key = file.name;
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                this.getQiniuToken();
                return isJPG && isLt2M;
            },
            handleUpdate(data) {
                this.loading_status = true;
                this.$axios.post(this.updateUrl, {

                    categoryId: data.categoryId == undefined ? null : data.categoryId,
                    name: data.name,
                    image: data.image,
                    status: data.status,
                    level: data.level
                }).then((res) => {
                    console.log("res" + res.data.code);
                    if (res.data.code == 0) {
                        alert("新增成功!")
                    } else {
                        alert("新增失败!")
                    }
                    this.insertVisible = false;
                    this.insertForm = [];
                    this.getData();
                }).finally(this.loading_status = false)
            },
            handleCategoryImageeSuccess(res, file) {
                this.editForm.image = this.qiNiuYunUrl + "/" + file.name;

            },
            handleInsertCategoryImageeSuccess(res, file) {
                this.insertForm.image = this.qiNiuYunUrl + "/" + file.name;

            }
        }
    }
    ;

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
