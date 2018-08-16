<template>
  <div class="staff-details">
    <h1>
      <i class="el-icon-arrow-left btn-back" @click="handleGoBack"></i>{{ruleForm.staffName}}的详细信息</h1>
    <section class="w500">
      <div class="fx-align">
        <div class="pic-cont fx-align">
          <img :src="ruleForm.photoUrl===''?imgUrl:ruleForm.photoUrl" />
        </div>
      </div>
      <!--性别，icon-man为男，icon-woman为女-->
      <h2 class="text-center name-cont">
        {{ruleForm.staffName}}
        <i class="icon-man m-l-5" v-if="ruleForm.sex==='男'"></i>
        <i class="icon-woman m-l-5" v-else></i>
      </h2>
      <div class="fx-align m-b-30">
        <div>
          {{ruleForm.company}}——{{ruleForm.office}}
          <div class="fx-align m-t-5 time">
            <i class="icon-time m-r-5"></i>
            <span>{{ruleForm.arrivalTime}}</span>
          </div>
        </div>

      </div>
      <div class="list-contact">
        <ul class="fx fx-wrap">
          <li v-show="ruleForm.qq">
            <i class="icon-qq m-r-5"></i>
            <span class="c-g">QQ：</span>{{ruleForm.qq}}</li>
          <li v-show="ruleForm.wechat">
            <i class="icon-wechet m-r-5"></i>
            <span class="c-g">微信：</span>{{ruleForm.wechat}}</li>
          <li>
            <i class="icon-phone m-r-5"></i>
            <span class="c-g">手机：</span>{{ruleForm.phone}}</li>
          <li>
            <i class="icon-mail m-r-5"></i>
            <span class="c-g">email：</span>{{ruleForm.email}}</li>
        </ul>
      </div>
      <div class="m-b-15 box">
        <div>
          <i class="icon-address m-r-5"></i>
          <span class="c-g">地址：</span>
        </div>
        <p class="box-flex">
          {{ruleForm.address}}
        </p>
      </div>
      <div class="box">
        <div>
          <i class="icon-introduce m-r-5"></i>
          <span class="c-g">简介：</span>
        </div>
        <p v-if="ruleForm.introduction" class="box-flex">{{ruleForm.introduction}}</p>
        <p v-else class="box-flex">这个人很懒，什么都没留下！</p>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'staff',
  data() {
    return {
      imgUrl: require('../../assets/img/header.jpg'),
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
        id: null
      }
    }
  },
  // filters: {
  //   data: function (input) {
  //     var d = new Date(input);
  //     var year = d.getFullYear();
  //     var month = d.getMonth() + 1;
  //     var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
  //     return year + '-' + month + '-' + day;
  //   }
  // },
  title() {
    return 'list'
  },
  methods: {
    // 性别转换
    formatSexNum(sex) {
      return sex === '男' ? 1 : sex === '女' ? 0 : -1;
    },
    formatSex(sex) {
      return sex === 1 ? '男' : sex === 0 ? '女' : '未知';
    },
    // 获取单个员工信息
    handleGetStaffInfo() {
      let params = {
        id: this.ruleForm.id
      }
      this.getStaffInfo(this.ruleForm.id).then((res) => {
        console.log("获取单个员工信息成功")
        console.log("性别 = " + res.data.staffInfo.sex)
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
      this.ruleForm.staffId = null
      this.ruleForm.staffName = null
      this.ruleForm.photoUrl = null
      this.ruleForm.sex = null
      this.ruleForm.office = null
      this.ruleForm.arrivalTime = null
      this.ruleForm.company = null
      this.ruleForm.phone = null
      this.ruleForm.email = null
      this.ruleForm.introduction = null
      this.ruleForm.id = null
      this.ruleForm.qq = null
      this.ruleForm.wechat = null
      this.ruleForm.address = null
    },
    // 返回上一页
    handleGoBack() {
      this.$router.go(-1)
    },
    ...mapActions(['getStaffInfo'])
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      console.log("查看单个员工 " + to.params.id)
      if (to.params.id) {
        vm.ruleForm.id = to.params.id;
        // 获取单个员工信息
        vm.handleGetStaffInfo()
      }
    })
  },
  beforeRouteLeave(to, from, next) {
    this.resetForm()
    next(true)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../assets/css/common.scss";
.staff-details {
  background: $color-white;
  h1 {
    text-align: center;
    font-size: 20px;
    padding: 16px 0;
    border-bottom: 1px solid $color-border;
    position: relative;
  }
  .w500 {
    padding: 48px 0;
    width: 500px;
    margin: 0 auto;
    .c-g {
      display: inline-block;
      width: 50px;
      color: $color-font-sub;
    }
  }
  .time {
    color: $color-font-sub;
  }
  .pic-cont {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    box-shadow: 0 0 0 5px #fff, 0 0 0 10px rgba(darken($color-main, 10%), 0.5);
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  .name-cont {
    margin: 30px auto 10px;
    font-size: 24px;
    .icon {
      font-size: 24px;
    }
    .icon-woman {
      color: $color-plum-red;
    }
    .icon-man {
      color: $color-dark-skyblue;
    }
  }
  .list-contact {
    li {
      padding-bottom: 15px;
      width: 50%;
    }
  }
}
</style>