<template>
  <div id="app">
    <transition name="fade"
      mode="out-in">
      <keep-alive>
        <router-view class="view"></router-view>
      </keep-alive>
    </transition>
    <section class="menu-cont"
      v-if="!isShowMenu">
      <l-menu></l-menu>
    </section>
  </div>
</template>

<script>
import Menu from "./page/Menu.vue";

export default {
  name: 'app',
  components: {
    "l-menu": Menu
  },
  computed: {
    isShowMenu() {
      return this.$route.name === 'Login'
    }
  }
}
</script>

<style lang="scss">
@import "./assets/css/base_m.scss";
@import "./assets/css/ele_reset.scss";
#app {
  padding: 8px 16px 120px;
}

.menu-cont {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  padding: 8px 0;
  background: rgba(0, 0, 0, 0.5);
}
</style>
