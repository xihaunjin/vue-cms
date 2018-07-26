<template>
  <div class="add-staff">
    <h1>
      <i class="el-icon-arrow-left btn-back"
        @click="handleGoBack"></i>员工信息</h1>
    <div class="staff-dtl p-t-20">
      <el-form :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px">
        <el-form-item label="姓名"
          prop="name">
          <el-input v-model="ruleForm.name"
            placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="照片"
          prop="photo">
          <el-upload class="avatar-uploader"
            style="width: 178px;"
            action="/api/uploads"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="ruleForm.photo"
              :src="ruleForm.photo"
              class="avatar">
            <i v-else
              class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="性别"
          prop="sex">
          <el-select v-model="ruleForm.sex"
            placeholder="请选择性别">
            <el-option label="男"
              value="男"></el-option>
            <el-option label="女"
              value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职位"
          prop="office">
          <el-input v-model="ruleForm.office"
            placeholder="请输入职位"></el-input>
        </el-form-item>
        <el-form-item label="入职时间"
          prop="arrival_time">
          <el-date-picker v-model="ruleForm.arrival_time"
            type="date"
            placeholder="请选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="电话"
          prop="phone">
          <el-input v-model="ruleForm.phone"
            placeholder="请输入电话"
            :maxlength=11></el-input>
        </el-form-item>
        <el-form-item label="QQ"
          prop="qq">
          <el-input v-model="ruleForm.qq"
            placeholder="请输入QQ号码"
            :maxlength=10></el-input>
        </el-form-item>
        <el-form-item label="微信"
          prop="wechat">
          <el-input v-model="ruleForm.wechat"
            placeholder="请输入微信号"></el-input>
        </el-form-item>
        <el-form-item label="子公司"
          prop="company">
          <el-select v-model="ruleForm.company"
            placeholder="请选择所属公司">
            <el-option label="优车"
              value="爱车联"></el-option>
            <el-option label="租车"
              value="欣业邦"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱"
          prop="email">
          <el-input v-model="ruleForm.email"
            placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="地址"
          prop="address">
          <el-input type="textarea"
            :rows="2"
            resize="none"
            v-model="ruleForm.address"
            placeholder="请输入详细地址"></el-input>
        </el-form-item>
        <el-form-item label="员工简介">
          <el-input type="textarea"
            :rows="3"
            resize="none"
            v-model="ruleForm.introduction"
            placeholder="请添加员工简介"></el-input>
        </el-form-item>
        <el-form-item label-width="100px">
          <el-button type="primary"
            @click="submitForm('ruleForm')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
var rePhone = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('手机号码不能为空！'));
  }
  if (!/^(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/.test(value)) {
    return callback(new Error('手机号码不正确！'));
  }
  callback();
}
var reMail = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('邮箱不能为空！'));
  }
  if (!/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(value)) {
    return callback(new Error('邮箱地址不正确！'));
  }
  callback();
}
var reArrivalTime = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请选择入职时间！'));
  }
  callback();
}
export default {
  name: 'list',
  data() {
    return {
      imageUrl: '',
      ruleForm: {
        name: '',
        photo: '',
        sex: '',
        office: '',
        arrival_time: '',
        company: '',
        phone: '',
        email: '',
        qq: '',
        wechat: '',
        address: '',
        introduction: '',
        id: null
      },
      rules: {
        name: [{
          required: true,
          message: '姓名不能为空！',
          trigger: 'blur'
        }],
        photo: [{
          required: false,
          message: '请上传照片！',
          trigger: 'change'
        }],
        sex: [{
          required: true,
          message: '请选择性别！',
          trigger: 'change'
        }],
        office: [{
          required: true,
          message: '职位不能为空！',
          trigger: 'blur'
        }],
        arrival_time: [{
          type: 'date',
          validator: reArrivalTime,
          required: true,
          trigger: 'blur'
        }],
        company: [{
          required: true,
          message: '请选择公司！',
          trigger: 'change'
        }],
        address: [{
          required: true,
          message: '地址不能为空！',
          trigger: 'blur'
        }],
        phone: [{
          required: true,
          validator: rePhone,
          trigger: 'blur'
        }],
        email: [{
          required: true,
          validator: reMail,
          trigger: 'blur'
        }]
      },
      value1: ''
    }
  },
  title() {
    return 'list'
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
      console.log(this.value1)
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
              window.history.back()
            })
          }).catch(() => { })
        } else {
          return false;
        }
      })
    },
    // 获取单个员工信息
    handleGetSingleStaffInfo() {
      let params = {
        id: this.ruleForm.id
      }
      this.getSingleStaff(params).then((data) => {
        console.log(data.sex)
        let sexObj = data.sex
        this.ruleForm.name = data.name
        this.ruleForm.sex = this.formatSex(sexObj)
        this.ruleForm.office = data.office
        this.ruleForm.arrival_time = data.arrival_time
        this.ruleForm.phone = data.phone
        this.ruleForm.company = data.company
        this.ruleForm.email = data.email
        this.ruleForm.introduction = data.introduction
        this.ruleForm.photo = data.photo
        this.ruleForm.qq = data.qq
        this.ruleForm.wechat = data.wechat
        this.ruleForm.address = data.address
        console.log(this.ruleForm.arrival_time)
      }, () => {

      })
    },
    resetForm() {
      this.$refs.ruleForm.resetFields()
    },
    //			resetForm() {
    //				this.ruleForm.name = ''
    //				this.ruleForm.photo = ''
    //				this.ruleForm.sex = ''
    //				this.ruleForm.office = ''
    //				this.ruleForm.arrival_time = ''
    //				this.ruleForm.company = ''
    //				this.ruleForm.phone = ''
    //				this.ruleForm.email = ''
    //				this.ruleForm.introduction = ''
    //				this.ruleForm.id = null
    //				this.value1 = ''
    //				this.ruleForm.qq = ''
    //				this.ruleForm.wechat = ''
    //				this.ruleForm.address = ''
    //			},
    handleAvatarSuccess(res, file) {
      this.$log(file)
      this.$log('----------------')
      this.$log(file.response)
      if (!file.response.data.code) {
        this.ruleForm.photo = file.response.data.url
        console.log(this.ruleForm.photo)
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLtSize = file.size / 1024 / 1024 < 1
      if (!(isJPG || isPNG)) {
        this.$message.error('上传照片只能是 JPG或者PNG 格式!');
      }
      if (!isLtSize) {
        this.$message.error('上传头像图片大小不能超过 1M!');
      }
      return isLtSize && (isJPG || isPNG);
    },
    // 返回上一页
    handleGoBack() {
      this.$back()
    },
    ...mapActions(['saveStaffInfo', 'getSingleStaff'])
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      console.log(to.query)
      if (to.query.id) {
        console.log('编辑')
        vm.ruleForm.id = to.query.id;
        // 获取单个员工信息
        vm.handleGetSingleStaffInfo()
      }
    })
  },
  beforeRouteLeave(to, from, next) {
    // 清空输入信息
    this.resetForm();
    next(true)
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