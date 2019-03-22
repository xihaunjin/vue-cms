<template>
  <div class="login-wapper">
    <div class="login-cont">
      <div class="fx-align">
        <div class="logo-cont fx-align"><img src="../assets/img/logo.png" /></div>
      </div>
      <div class="form-cont">
        <div class="input-cont">
          <input type="tel" name="" id="" value="" placeholder="手机号" maxlength="11" v-model="params.phone" />
        </div>
        <div class="input-cont m-t-30">
          <input type="number" name="" id="" value="" placeholder="验证码" v-model="params.code" maxlength="4" />
          <!--点击发送之后显示倒计时-->
          <a class="btn-code" @click="handleSendCode">{{codeText}}</a>
        </div>
        <div class="btn-cont fx-align">
          <a class="btn-login" @click="handleLogin">登
            <span class="p-l-15"></span>录</a>
        </div>
      </div>
    </div>
    <footer>神州优车集团</footer>
  </div>
</template>
<script>
import {
  mapActions
} from 'vuex'
const rePhone = (value) => {
  return /^(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/.test(value)
}
export default {
  name: 'login',
  data() {
    return {
      params: {
        phone: null,
        code: null
      },
      codeParams: {
        phone: null
      },
      codeText: '获取验证码',
      active: false
    }
  },
  title() {
    return '登录'
  },
  methods: {
    handleSendCode() {
      if (!rePhone(this.params.phone)) {
        this.$message.warning('请输入正确的手机号 ( ･´ω`･ )')
        return
      }
      if (this.active) {
        return
      }
      this.sendCode(this.params).then(() => {
        console.log('发送成功')
        this.$message.success('获取验证码成功')
        this.active = true
        let timeCont = 59
        this.codeText = timeCont + 's'
        let timer = setInterval(() => {
          console.log(timeCont)
          if (timeCont === 0) {
            clearInterval(timer) // 停止计时器
            this.codeText = '获取验证码'
            this.active = false
          } else {
            timeCont--;
            this.codeText = timeCont + 's'
          }
        }, 1000)
      }, (err) => {
        console.log('发送失败')
        this.$message.warning(err)
      })
    },
    handleLogin() {
      if (!rePhone(this.params.phone)) {
        this.$message.warning('请输入正确的手机号 ( ･´ω`･ )')
        return
      }
      if (this.params.code.length !== 4) {
        this.$message.warning('请输入四位验证码')
        return
      }
      this.login(this.params).then(() => {
        this.$message.success('登录成功')
        this.$router.replace({
          name: 'List'
        })
      }, (err) => {
        console.log(err)
        this.$message.error(err)
      })
    },
    ...mapActions(['login', 'sendCode']) // 映射 this.LOGIN() 为 this.$store.dispatch('login')
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/css/common.scss";
.login-wapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

footer {
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: 40px;
  left: 0;
  right: 0;
  color: darken($color-border, 20%);
}

.login-cont {
  padding-top: 200px;
  width: 100%;
  height: 100%;
  background: url(../assets/img/login_bg.jpg) center center no-repeat;
  background-size: 100% 100%;
  .logo-cont {
    width: 300px;
    height: 150px;
    padding: 10px;
    // background: $color-white;
    overflow: hidden;
    // box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    // border-radius: 50%;
    img {
      width: 100%;
    }
  }
  .form-cont {
    width: 280px;
    position: absolute;
    top: 330px;
    left: 50%;
    margin-left: -140px;
    .input-cont {
      width: 100%;
      position: relative;
      input {
        width: 100%;
        height: 36px;
        line-height: 36px;
        color: $color-white;
        padding-left: 16px;
        background: none;
        border: none;
        transition: all 0.2s ease;
        position: relative;
        border-bottom: 1px solid rgba(214, 214, 214, 0.5);
        &:focus {
          border-bottom-color: $color-main !important;
          box-shadow: 0 0 0 rgba(0, 0, 0, 0) !important;
        }
      }
      .btn-code {
        position: absolute;
        right: 0;
        top: 0;
        width: 100px;
        height: 36px;
        text-align: center;
        line-height: 36px;
        transition: all 0.2s ease;
        color: $color-white;
        border-radius: 3px;
        &:hover {
          opacity: 1;
          transform: translateY(-5px);
        }
        &:active {
          background: rgba(0, 0, 0, 0.1);
        }
      }
    }
    .btn-cont {
      padding-top: 50px;
      a {
        width: 180px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        color: $color-white;
        font-size: 16px;
        border-radius: 3px;
        background: rgba($color-white, 0.5);
      }
    }
  }
}
</style>
