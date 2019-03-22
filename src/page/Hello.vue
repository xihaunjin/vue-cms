<template>
  <div class="hello">
    Hello {{name}}
  </div>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      name: 'xihuanjin'
    }
  },
  title() {
    return 'hello'
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
