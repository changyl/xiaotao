export default {
    name: 'table',
    data() {
        return {
            message: 'first',
            url: '/static/table_backup.json',
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
            form: {
                JobId:'',
                username: '',
                sid: '',
                status: '',
                create_time:'',
                current_executor:'',
                report_url:'',
                report_arg:'',
                info:'',
                trace_id:'',
                address:''
            },
            idx: -1
        }
    },
    created() {
        this.getData();
    },
    computed: {
        data() {
            return this.tableData.filter((d) => {
                let is_del = false;
                for (let i = 0; i < this.del_list.length; i++) {
                    if (d.name === this.del_list[i].name) {
                        is_del = true;
                        break;
                    }
                }
                if (!is_del) {
                    if (d.JobId.indexOf(this.select_cate) > -1 &&
                        (d.username.indexOf(this.select_word) > -1 ||
                            d.sid.indexOf(this.select_word) > -1)
                    ) {
                        return d;
                    }
                }
            })
        }
    },
    // mounted () {
    //     axios
    //         .get(url.url+'data2')
    //         .then(response => {
    //             this.data2 = response.data
    //         })
    //         .catch(error => {
    //             console.log(error)
    //             this.errored = true
    //         })
    //         .finally(() => this.loading = false)
    // },
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
                page: this.cur_page
            }).then((res) => {
                this.tableData = res.data.list;
                this.total = res.data.total_count;
                console.log(this.tableData);
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


export default {
    name: 'table',
    data() {
        return {
            message: 'first',
            url: '/static/table_backup.json',
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
            form: {
                JobId:'',
                username: '',
                sid: '',
                status: '',
                create_time:'',
                current_executor:'',
                report_url:'',
                report_arg:'',
                info:'',
                trace_id:'',
                address:''
            },
            idx: -1
        }
    },
    created() {
        this.getData();
    },
    computed: {
        data() {
            return this.tableData.filter((d) => {
                let is_del = false;
                for (let i = 0; i < this.del_list.length; i++) {
                    if (d.name === this.del_list[i].name) {
                        is_del = true;
                        break;
                    }
                }
                if (!is_del) {
                    if (d.JobId.indexOf(this.select_cate) > -1 &&
                        (d.username.indexOf(this.select_word) > -1 ||
                            d.sid.indexOf(this.select_word) > -1)
                    ) {
                        return d;
                    }
                }
            })
        }
    },
    // mounted () {
    //     axios
    //         .get(url.url+'data2')
    //         .then(response => {
    //             this.data2 = response.data
    //         })
    //         .catch(error => {
    //             console.log(error)
    //             this.errored = true
    //         })
    //         .finally(() => this.loading = false)
    // },
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
                page: this.cur_page
            }).then((res) => {
                this.tableData = res.data.list;
                this.total = res.data.total_count;
                console.log(this.tableData);
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
