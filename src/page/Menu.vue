<template>
  <div class="page-menu">
    <nav class="fx-align">
      <ul class="fx">
        <router-link :to="{ path: '/1'}" tag="li" class="fx-align">
          <div class="tips-cont">发票抬头管理</div>
          <i class="icon-invoice"></i>
        </router-link>
        <router-link :to="{ path: '/staff/list'}" tag="li" class="fx-align">
          <div class="tips-cont">员工管理</div>
          <i class="icon-staff"></i>
        </router-link>
        <router-link :to="{ path: '/2'}" tag="li" class="fx-align">
          <div class="tips-cont">性格测试</div>
          <i class="icon-smile"></i>
        </router-link>
        <router-link :to="{ path: '/3'}" tag="li" class="fx-align">
          <div class="tips-cont">名片模板</div>
          <i class="icon-card"></i>
        </router-link>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      active: 'invoiceList'
    }
  },
  title() {
    return 'hello'
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/css/common.scss";
.page-menu {
  li {
    width: 60px;
    height: 60px;
    border: 1px solid darken($color-border, 10%);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    cursor: pointer;
    margin: 5px;
    transition: all 0.2s ease;
    position: relative;
    &.router-link-active {
      transform: scale(1.1);
      background: rgba(0, 0, 0, 0.2);
      i {
        color: $color-white;
      }
    }
    &:hover {
      transform: scale(1.2);
      .tips-cont {
        visibility: visible;
        opacity: 1;
      }
    }
    i {
      color: $color-main;
      font-size: 30px;
    }
    .tips-cont {
      transition: all 0.2s ease;
      visibility: hidden;
      opacity: 0;
      position: absolute;
      top: -40px;
      left: 50%;
      background: rgba(0, 0, 0, 0.5);
      color: $color-white;
      width: 110px;
      text-align: center;
      margin-left: -55px;
      padding: 5px 10px;
      border-radius: 3px;
      &:after {
        content: "";
        width: 0;
        height: 0;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 6px solid rgba(0, 0, 0, 0.5);
        position: absolute;
        bottom: -6px;
        left: 50%;
        margin-left: -3px;
      }
    }
  }
}
</style>
