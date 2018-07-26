<template>
  <div class="staff-details">
    <h1>
      <i class="el-icon-arrow-left btn-back"
        @click="handleGoBack"></i>{{ruleForm.name}}的详细信息</h1>
    <section class="w500">
      <div class="fx-align">
        <div class="pic-cont fx-align">
          <img :src="ruleForm.photo===''?imgUrl:ruleForm.photo" />
        </div>
      </div>
      <!--性别，icon-man为男，icon-woman为女-->
      <h2 class="text-center name-cont">
        {{ruleForm.name}}
        <i class="icon-man m-l-5"
          v-if="ruleForm.sex==='男'"></i>
        <i class="icon-woman m-l-5"
          v-else></i>
      </h2>
      <div class="fx-align m-b-30">
        <div>
          {{ruleForm.company}}——{{ruleForm.office}}
          <div class="fx-align m-t-5 time">
            <i class="icon-time m-r-5"></i>
            <span>{{ruleForm.arrival_time|data}}</span>
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
            <span class="c-g">email：</span>1{{ruleForm.email}}</li>
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
        <p v-if="ruleForm.introduction"
          class="box-flex">{{ruleForm.introduction}}</p>
        <p v-else
          class="box-flex">这个人很懒，什么都没留下！</p>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'list',
  data() {
    return {
      imgUrl: require('../../assets/img/header.jpg'),
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
      value1: ''
    }
  },
  filters: {
    data: function (input) {
      var d = new Date(input);
      var year = d.getFullYear();
      var month = d.getMonth() + 1;
      var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
      return year + '-' + month + '-' + day;
    }
  },
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
      this.getStaffInfo(params).then((data) => {
        console.log("获取单个员工信息成功")
        console.log(data.sex)
        let sexObj = data.sex
        this.ruleForm.name = data.staffName
        this.ruleForm.sex = this.formatSex(sexObj)
        this.ruleForm.office = data.office
        this.ruleForm.arrival_time = data.arrivalTime
        this.ruleForm.phone = data.phone
        this.ruleForm.company = data.company
        this.ruleForm.email = data.email
        this.ruleForm.introduction = data.introduction
        this.ruleForm.photo = data.photoUrl
        if (!this.ruleForm.photo) {
          this.ruleForm.photo = this.imgUrl
        }
        this.ruleForm.qq = data.qq
        this.ruleForm.wechat = data.wechat
        this.ruleForm.address = data.address
      }, () => {

      })
    },
    //   resetForm() {
    //     this.ruleForm.name = null
    //     this.ruleForm.photo = null
    //     this.ruleForm.sex = null
    //     this.ruleForm.office = null
    //     this.ruleForm.arrival_time = null
    //     this.ruleForm.company = null
    //     this.ruleForm.phone = null
    //     this.ruleForm.email = null
    //     this.ruleForm.introduction = null
    //     this.ruleForm.id = null
    //     this.value1 = null
    //     this.ruleForm.qq = null
    //     this.ruleForm.wechat = null
    //     this.ruleForm.address = null
    //   },
    //   // 返回上一页
    //   handleGoBack() {
    //     this.$back()
    //   },
    ...mapActions(['getStaffInfo'])
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      console.log(to.query)
      if (to.query.id) {
        vm.ruleForm.id = to.query.id;
        // 获取单个员工信息
        vm.handleGetStaffInfo()
      }
    })
  },
  // beforeRouteLeave(to, from, next) {
  //   this.resetForm()
  //   next(true)
  // }
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