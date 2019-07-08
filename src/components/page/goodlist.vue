<template>

    <div class="table">
        <div class="container">
            <div class="handle-box">
                <el-input v-model="select_word" placeholder="商品简称" class="handle-input mr10"></el-input>
                <el-input v-model="select_word2" placeholder="商家名称" class="handle-input mr10"></el-input>
                <el-input v-model="select_word3" placeholder="商家标题" class="handle-input mr10"></el-input>
                <el-button type="warning" icon="search" :loading="loading_status" @click="search">搜索</el-button>
                <el-button type="primary" icon="insert" @click="insert">新增</el-button>
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

                        <el-upload :action="uploadActionUrl" :before-upload="beforeAvatarUpload" class="img-uploader">
                            <el-button size="small" type="primary" calss="upload-Button">点击上传</el-button>
                        </el-upload>
                    </div>

                    <div>
                        <!--<el-form-item label="上下架:" prop="onsale">-->
                        <!--&lt;!&ndash;<el-input v-model="editForm.onsale"  auto-complete="off"></el-input>&ndash;&gt;-->

                        <!--<el-radio v-model="radio" name="onsale" label="1" check="editForm.onsale">上架</el-radio>-->
                        <!--<el-radio v-model="radio" name="onsale" label="0" check="editForm.onsale">下架</el-radio>-->

                        <!--</el-form-item>-->

                        <el-form-item label="上下架:">
                            <el-select :placeholder="showOnSaleStatus(editForm)" @change="onEditChangeOnsaleStatus"
                                       :remote-method="remoteMethod">
                                <el-option
                                        v-for="item in onsaleStatus"
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
        </div>

        <el-dialog title="新增" :visible.sync="insertVisible" width="60%" :close-on-click-modal="false">
            <el-form ref="form"  label-width="100px">
                <el-form-item label="商品标题:">
                    <el-input v-model="insertGoodsForm.title"  :disabled="false"></el-input>
                </el-form-item>
                <el-form-item label="商品简称:">
                    <el-input v-model="insertGoodsForm.abbreviation" :disabled="false"></el-input>
                </el-form-item>
                <div class="statusClass">
                    <el-form-item label="是否通过审核:">
                        <el-select :placeholder="showInsertGoodsOnsaleStatus(insertGoodsForm)" @change="onInsertChangeOnsaleStatus"
                                   :remote-method="remoteMethod">
                            <el-option
                                    v-for="item in onsaleStatus"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <!--<el-form-item label="状态:">-->
                        <!--<el-select :placeholder="showInsertSellerStatus(insertForm)" @change="onInsertChangeStatus"-->
                                   <!--:remote-method="remoteMethod">-->
                            <!--<el-option-->
                                    <!--v-for="item in sellerStatus"-->
                                    <!--:key="item.value"-->
                                    <!--:label="item.label"-->
                                    <!--:value="item">-->
                            <!--</el-option>-->
                        <!--</el-select>-->
                    <!--</el-form-item>-->

                    <!--<el-form-item label="是否通过审核:">-->
                        <!--<el-select :placeholder="showInsertSellerVerifyStatus(insertForm)" @change="onInsertChangeVerifyStatus"-->
                                   <!--:remote-method="remoteMethod">-->
                            <!--<el-option-->
                                    <!--v-for="item in sellerVerifyStatus"-->
                                    <!--:key="item.value"-->
                                    <!--:label="item.label"-->
                                    <!--:value="item">-->
                            <!--</el-option>-->
                        <!--</el-select>-->
                    <!--</el-form-item>-->

                </div>
                <div>
                    <el-form-item label="封面图:">
                        <img :src="insertGoodsForm.coverImage" style="width: 100px; height: 100px" class="image"/>

                    </el-form-item>
                    <el-upload :action="uploadActionUrl" :before-upload="beforeAvatarUpload" class="img-uploader">
                        <el-button size="small" type="primary" calss="upload-Button">点击上传</el-button>
                    </el-upload>

                    <!--<el-form-item label="商家图片:">-->
                        <!--<img :src="insertGoodsForm.image" style="width: 100px; height: 100px" class="image"/>-->

                    <!--</el-form-item>-->
                    <!--<el-upload :action="uploadActionUrl" :before-upload="beforeAvatarUpload" class="img-uploader">-->
                        <!--<el-button size="small" type="primary" calss="upload-Button">点击上传</el-button>-->
                    <!--</el-upload>-->
                </div>
                <div>

                </div>
                <!--<el-form-item label="营业执照:">-->
                <!--<img :src="editForm.license" style="width: 100px; height: 100px" class="image"/>-->

                <!--</el-form-item>-->
            </el-form>
            <span slot="footer" class="dialog-footer">
                            <el-button @click="editVisible = false">取 消</el-button>
                            <el-button type="warning" @click="saveInsert(insertForm)">确 定</el-button>

                            </span>

        </el-dialog>

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
                delUrl: '/xiaotao/goods/deleteByPrimaryKey',
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

                insertGoodsForm:{
                    coverImage:'',
                    title:'',
                    onsale:'',
                    sellerId:'',
                    price:'',
                    abbreviation:'',
                    carousels:'',
                    content:'',
                    categoryId:''
                },
                form: {
                    autoid: '',
                    fun: '',
                    jid: '',
                    return: '',
                    success: ''
                },
                onsaleStatus: [{
                    value: '0',
                    label: '下架'
                }, {
                    value: '1',
                    label: '上架'
                }],
                idx: -1,
                insertVisible:false
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
            insert(){
                console.log("打开新增窗口");
                this.insertVisible = true;
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
            showOnSaleStatus(formData) {
                console.log("formData:"+formData.onsale);
                if (formData.onsale == undefined ) {
                    return "请选择";
                }
                if (formData.onsale == 1) {
                    return "上架";
                }
                if (formData.onsale == 0) {
                    console.log()
                    return "下架";
                }
            },showInsertGoodsOnsaleStatus(insertGoodsForm){
                if (insertGoodsForm.onsale == undefined ){
                    return "请选择"
                }
                if (insertGoodsForm.onsale == 0) {
                    return "下架";
                } else if (insertGoodsForm.onsale == 1) {
                    return "上架";
                }
            },
            onChangeStatus(event) {
                this.editForm.sellerStatus = event.value;
                // debugger
                // console.log("下拉选中"+event.value)
            },
            onEditChangeOnsaleStatus(event) {
                this.editForm.onsale = event.value;
            },
            onInsertChangeOnsaleStatus(event){
                this.insertGoodsForm.onsale = event.value;
            },
            //上传图片校验
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            handleUpdate(data) {
                this.loading_status = true;
                this.$axios.post(this.updateUrl, {

                    title: data.title,
                    abbreviation: data.abbreviation,
                    goodsId: data.goodsId,
                    price: data.price,
                    coverImage:data.coverImage,
                    onsale:data.onsale
                }).then((res) => {
                    console.log("res" + res.data.code);
                    if (res.data.code == 0) {
                        alert("修改成功!")
                    } else {
                        alert("修改失败!")
                    }
                    this.editFormVisible = false;
                    this.editForm = [];
                    this.getData();
                }).finally(this.loading_status = false)
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
