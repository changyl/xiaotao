webpackJsonp([13],{QHL1:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l={name:"basetable",data:()=>({pickerOptions1:{disabledDate:t=>t.getTime()>Date.now(),shortcuts:[{text:"今天",onClick(t){t.$emit("pick",new Date)}},{text:"昨天",onClick(t){const e=new Date;e.setTime(e.getTime()-864e5),t.$emit("pick",e)}},{text:"一周前",onClick(t){const e=new Date;e.setTime(e.getTime()-6048e5),t.$emit("pick",e)}}]},message:"first",url:"/xiaotao/payorder/list",url_detail:"/xiaotao/payorder/orderDetail",tableData:[],detailDatas:{address:"",addressId:"",deliveryStatus:"",deliveryType:"",remark:""},total:0,cur_page:1,multipleSelection:[],select_cate:"",select_word:"",del_list:[],is_search:!1,editVisible:!1,delVisible:!1,form:{orderId:"",buyerId:"",expressId:"",orderCode:"",orderStatus:"",amount:"",createTime:"",payTime:""},idx:-1}),activated(){this.getData()},mounted(){this.getData()},methods:{statusFormat:function(t,e){var a=t[e.property];if(void 0==a)return"";return 1==a?"正常":2==a?"完成":"取消"},handleCurrentChange(t){this.cur_page=t,this.getData()},getData(){this.$axios.get(this.url,{params:{p:this.cur_page,size:10}}).then(t=>{this.tableData=t.data.data.data,this.total=t.data.data.size,console.log(t)})},search(){this.is_search=!0},formatter:(t,e)=>t.address,filterTag:(t,e)=>e.tag===t,handleEdit(t,e){this.idx=t;const a=this.tableData[t];this.form={Id:a.JobId,current_job:a.current_job,status:a.status},this.editVisible=!0},handleSkip(t,e){this.idx=t;const a=this.tableData[t];this.$axios.get(this.url_detail,{params:{orderId:a.orderId}}).then(t=>{this.detailDatas=t.data.data})},handleDelete(t,e){this.idx=t,this.delVisible=!0},delAll(){const t=this.multipleSelection.length;let e="";this.del_list=this.del_list.concat(this.multipleSelection);for(let a=0;a<t;a++)e+=this.multipleSelection[a].name+" ";this.$message.error("删除了"+e),this.multipleSelection=[]},handleSelectionChange(t){this.multipleSelection=t},saveEdit(){this.$set(this.tableData,this.idx,this.form),this.editVisible=!1,this.$message.success(`修改第 ${this.idx+1} 行成功`)},deleteRow(){this.tableData.splice(this.idx,1),this.$message.success("删除成功"),this.delVisible=!1}}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"table"},[a("div",{staticClass:"container"},[a("el-table",{ref:"multipleTable",staticClass:"table",staticStyle:{width:"100%"},attrs:{data:t.tableData,border:""},on:{"selection-change":t.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"orderId",label:"订单ID",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{prop:"buyerId",label:"购买人ID"}}),t._v(" "),a("el-table-column",{attrs:{prop:"amount",label:"订单金额"}}),t._v(" "),a("el-table-column",{attrs:{prop:"orderCode",label:"订单编号"}}),t._v(" "),a("el-table-column",{attrs:{prop:"expressId",label:"物流ID"}}),t._v(" "),a("el-table-column",{attrs:{prop:"orderStatus",formatter:t.statusFormat,label:"订单状态"}}),t._v(" "),a("el-table-column",{attrs:{prop:"createTime",label:"创建时间"}}),t._v(" "),a("el-table-column",{attrs:{prop:"payTime",label:"支付时间"}})],1),t._v(" "),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{background:"",layout:"prev, pager, next",total:this.total},on:{"current-change":t.handleCurrentChange}})],1)],1),t._v(" "),a("el-dialog",{attrs:{title:"编辑",visible:t.editVisible,width:"30%"},on:{"update:visible":function(e){t.editVisible=e}}},[a("el-form",{ref:"form",attrs:{model:t.form,"label-width":"50px"}},[a("el-form-item",{attrs:{label:"Id:"}},[a("el-input",{attrs:{disabled:!0},model:{value:t.form.Id,callback:function(e){t.$set(t.form,"Id",e)},expression:"form.Id"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"status:"}},[a("el-input",{attrs:{disabled:!0},model:{value:t.form.status,callback:function(e){t.$set(t.form,"status",e)},expression:"form.status"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"选择日期"}},[a("el-date-picker",{staticClass:"in-date-picker",attrs:{align:"right",type:"date",placeholder:"选择日期","picker-options":t.pickerOptions1},model:{value:t.value2,callback:function(e){t.value2=e},expression:"value2"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"Status:"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.form.status,callback:function(e){t.$set(t.form,"status",e)},expression:"form.status"}},[a("el-option",{key:"1",attrs:{label:"unready",value:"-1"}}),t._v(" "),a("el-option",{key:"2",attrs:{label:"ready",value:"0"}}),t._v(" "),a("el-option",{key:"3",attrs:{label:"running",value:"1"}}),t._v(" "),a("el-option",{key:"4",attrs:{label:"finished",value:"2"}}),t._v(" "),a("el-option",{key:"5",attrs:{label:"failed",value:"3"}})],1)],1)],1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.editVisible=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"warning"},on:{click:t.saveEdit}},[t._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var i=a("C7Lr")(l,s,!1,function(t){a("S0ng")},"data-v-77752199",null);e.default=i.exports},S0ng:function(t,e){}});