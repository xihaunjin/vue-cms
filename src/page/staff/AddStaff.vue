<template>
  <div class="add-staff">
    <h1>
      <i class="el-icon-arrow-left btn-back" @click="handleGoBack"></i>员工信息</h1>
    <div class="staff-dtl p-t-20">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="工号" prop="staffId">
          <el-input v-model="ruleForm.staffId" placeholder="请输入工号"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="staffName">
          <el-input v-model="ruleForm.staffName" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="照片" prop="photoUrl">
          <el-upload class="avatar-uploader" style="width: 178px;" action="/api/upload" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="ruleForm.photoUrl" :src="ruleForm.photoUrl" class="avatar">
            <i v -else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="ruleForm.sex" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="办公地点" prop="office">
          <el-input v-model="ruleForm.office" placeholder="请输入办公地点"></el-input>
        </el-form-item>
        <el-form-item label="入职时间" prop="arrivalTime">
          <el-date-picker v-model="ruleForm.arrivalTime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="请选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="ruleForm.phone" placeholder="请输入电话" :maxlength=11></el-input>
        </el-form-item>
        <el-form-item label="QQ" prop="qq">
          <el-input v-model="ruleForm.qq" placeholder="请输入QQ号码" :maxlength=10></el-input>
        </el-form-item>
        <el-form-item label="微信" prop="wechat">
          <el-input v-model="ruleForm.wechat" placeholder="请输入微信号"></el-input>
        </el-form-item>
        <el-form-item label="子公司" prop="company">
          <el-select v-model="ruleForm.company" placeholder="请选择所属公司">
            <el-option label="优车" value="优车"></el-option>
            <el-option label="租车" value="租车"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input type="textarea" :rows="2" resize="none" v-model="ruleForm.address" placeholder="请输入详细地址"></el-input>
        </el-form-item>
        <el-form-item label="员工简介" prop="introduction">
          <el-input type="textarea" :rows="3" resize="none" v-model="ruleForm.introduction" placeholder="请添加员工简介"></el-input>
        </el-form-item>
        <el-form-item label-width="100px">
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
// var rePhone = (rule, value, callback) => {
//   if (!value) {
//     return callback(new Error('手机号码不能为空！'));
//   }
//   if (!/^(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/.test(value)) {
//     return callback(new Error('手机号码不正确！'));
//   }
//   callback();
// }
// var reMail = (rule, value, callback) => {
//   if (!value) {
//     return callback(new Error('邮箱不能为空！'));
//   }
//   if (!/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(value)) {
//     return callback(new Error('邮箱地址不正确！'));
//   }
//   callback();
// }
// var reArrivalTime = (rule, value, callback) => {
//   if (!value) {
//     return callback(new Error('请选择入职时间！'));
//   }
//   callback();
// }
export default {
  name: 'list',
  data() {
    return {
      upData: {},
      imageUrl: '',
      ruleForm: {
        staffName: '',
        staffId: '',
        photoUrl: '',
        sex: '',
        office: '',
        arrivalTime: '',
        company: '',
        phone: '',
        email: '',
        qq: '',
        wechat: '',
        address: '',
        introduction: '',
        id: '',
      },
      rules: {
        // staffName: [{
        //   required: true,
        //   message: '姓名不能为空！',
        //   trigger: 'blur'
        // }],
        // photo: [{
        //   required: false,
        //   message: '请上传照片！',
        //   trigger: 'change'
        // }],
        // sex: [{
        //   required: true,
        //   message: '请选择性别！',
        //   trigger: 'change'
        // }],
        // office: [{
        //   required: true,
        //   message: '职位不能为空！',
        //   trigger: 'blur'
        // }],
        // arrival_time: [{
        //   type: 'date',
        //   validator: reArrivalTime,
        //   required: true,
        //   trigger: 'blur'
        // }],
        // company: [{
        //   required: true,
        //   message: '请选择公司！',
        //   trigger: 'change'
        // }],
        // address: [{
        //   required: true,
        //   message: '地址不能为空！',
        //   trigger: 'blur'
        // }],
        // phone: [{
        //   required: true,
        //   validator: rePhone,
        //   trigger: 'blur'
        // }],
        // email: [{
        //   required: true,
        //   validator: reMail,
        //   trigger: 'blur'
        // }]
      },
      value1: ''
    }
  },
  title() {
    return 'list'
  },
  watch: {
    // "$route": function (to, from) {
    //   this.$router.go(0);
    // }
  },
  methods: {
    // 性别转换
    formatSexNum(sex) {
      return sex === '男' ? '1' : sex === '女' ? '0' : '-1';
    },
    formatSex(sex) {
      return sex === 1 ? '男' : sex === 0 ? '女' : '未知';
    },
    // 保存用户信息
    submitForm(formName) {
      console.log('保存id = ' + this.ruleForm.id)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗?', '提示', {
            type: 'warning'
          }).then(() => {
            let sexObj = this.ruleForm.sex
            this.ruleForm.sex = this.formatSexNum(sexObj)
            this.saveStaffInfo(this.ruleForm).then((data) => {
              this.$message({
                message: '保存成功',
                type: 'success'
              })
              this.$router.go(-1)
            })
          }).catch(() => { })
        } else {
          return false;
        }
      })
    },
    // 获取单个员工信息
    handleGetStaffInfo() {
      this.getStaffInfo(this.ruleForm.id).then((res) => {
        console.log('性别 = ' + res.data.staffInfo.sex)
        let sexObj = res.data.staffInfo.sex
        this.ruleForm.staffId = res.data.staffInfo.staffId
        this.ruleForm.staffName = res.data.staffInfo.staffName
        this.ruleForm.sex = this.formatSex(sexObj)
        this.ruleForm.office = res.data.staffInfo.office
        this.ruleForm.arrivalTime = res.data.staffInfo.arrivalTime
        this.ruleForm.phone = res.data.staffInfo.phone
        this.ruleForm.company = res.data.staffInfo.company
        this.ruleForm.email = res.data.staffInfo.email
        this.ruleForm.introduction = res.data.staffInfo.introduction
        this.ruleForm.photoUrl = res.data.staffInfo.photoUrl
        this.ruleForm.qq = res.data.staffInfo.qq
        this.ruleForm.wechat = res.data.staffInfo.wechat
        this.ruleForm.address = res.data.staffInfo.address
      }, () => {

      })
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
      this.ruleForm.id = ''
    },
    // resetForm() {
    //   this.ruleForm.staffId = ''
    //   this.ruleForm.staffName = ''
    //   this.ruleForm.photoUrl = ''
    //   this.ruleForm.sex = ''
    //   this.ruleForm.office = ''
    //   this.ruleForm.arrivalTime = ''
    //   this.ruleForm.company = ''
    //   this.ruleForm.phone = ''
    //   this.ruleForm.email = ''
    //   this.ruleForm.introduction = ''
    //   this.ruleForm.id = ''
    //   this.ruleForm.qq = ''
    //   this.ruleForm.wechat = ''
    //   this.ruleForm.address = ''
    // },
    // handleUpload() {
    //   this.uploadFile(this.upData).then((res) => {
    //     console.log('上传成功')
    //     console.log(res)
    //     this.ruleForm.photoUrl = res.data.url
    //     console.log(this.ruleForm.photoUrl)
    //   }, () => {
    //   })
    // },

    handleAvatarSuccess(res, file) {
      console.log(file)
      console.log('----------------')
      console.log("+++" + res.code)
      if (res.code === 200) {
        this.ruleForm.photoUrl = res.data.url
        console.log(this.ruleForm.photoUrl)
      }
    },
    beforeAvatarUpload(file) {
      console.log(file)
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLtSize = file.size / 1024 / 1024 < 1
      if (!(isJPG || isPNG)) {
        this.$message.error('上传照片只能是 JPG或者PNG 格式!');
        return false
      }
      if (!isLtSize) {
        this.$message.error('上传头像图片大小不能超过 1M!');
        return false
      }
      this.upData = new FormData()
      this.upData.append("file", file)
    },
    // 返回上一页
    handleGoBack() {
      this.$router.go(-1)
    },
    ...mapActions(['saveStaffInfo', 'getStaffInfo', 'uploadFile'])
  },
  beforeRouteEnter(to, from, next) {
    console.log('beforeRouteEnter---add')
    next(vm => {
      console.log(to.params.id)
      if (to.params.id) {
        console.log('编辑')
        vm.ruleForm.id = to.params.id;
        // 获取单个员工信息
        vm.handleGetStaffInfo()
      }
    })
  },
  beforeRouteLeave(to, from, next) {
    console.log('beforeRouteLeave+ = ' + this.ruleForm.id)
    // 清空输入信息
    this.resetForm()
    console.log('beforeRouteLeave- = ' + this.ruleForm.staffName)
    next()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../assets/css/common.scss";
.add-staff {
  background: $color-white;
  h1 {
    text-align: center;
    font-size: 20px;
    padding: 16px 0;
    border-bottom: 1px solid $color-border;
    position: relative;
  }
  .staff-dtl {
    padding: 20px;
    width: 500px;
  }
}
</style>
