webpackJsonp([11],{GF4k:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s={data:function(){return{message:"",loading:!1,ruleForm:{username:"13800138000",password:"1234567"},rules:{username:[{required:!0,message:"请输入用户名",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"}]}}},methods:{submitForm(e){this.$refs[e].validate(e=>{if(this.$loading=!0,!e)return console.log("error submit!!"),this.$loading=!1,!1;this.$axios.get("/xiaotao/system/login",{params:{mobile:this.ruleForm.username,password:this.ruleForm.password}}).then(e=>{0===e.data.code?(this.$router.push("/"),this.$cookie.set("name",this.ruleForm.username,"2h"),this.$cookie.set("token",e.data.data.token,"2h")):this.$notify({message:e.data.msg,type:"error"})}).catch(e=>{console.log(e),this.$loading=!1})})},login(){this.$axios.get(url,{params:"/xiaotao/system/login"})}}},o={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"login-wrap"},[r("div",{staticClass:"ms-login"},[r("div",{staticClass:"ms-title"},[e._v("订单管理系统")]),e._v(" "),r("el-form",{ref:"ruleForm",staticClass:"ms-content",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"0px"}},[r("el-form-item",{attrs:{prop:"username"}},[r("el-input",{attrs:{placeholder:"username"},model:{value:e.ruleForm.username,callback:function(t){e.$set(e.ruleForm,"username",t)},expression:"ruleForm.username"}},[r("el-button",{attrs:{slot:"prepend",icon:"el-icon-lx-people"},slot:"prepend"})],1)],1),e._v(" "),r("el-form-item",{attrs:{prop:"password"}},[r("el-input",{attrs:{type:"password",placeholder:"password"},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key,"Enter"))return null;e.submitForm("ruleForm")}},model:{value:e.ruleForm.password,callback:function(t){e.$set(e.ruleForm,"password",t)},expression:"ruleForm.password"}},[r("el-button",{attrs:{slot:"prepend",icon:"el-icon-lx-lock"},slot:"prepend"})],1)],1),e._v(" "),r("div",{staticClass:"login-btn"},[r("el-button",{attrs:{type:"primary"},on:{click:function(t){e.submitForm("ruleForm")}}},[e._v("登录")])],1)],1)],1)])},staticRenderFns:[]};var a=r("C7Lr")(s,o,!1,function(e){r("tcSF")},"data-v-90d230c2",null);t.default=a.exports},tcSF:function(e,t){}});