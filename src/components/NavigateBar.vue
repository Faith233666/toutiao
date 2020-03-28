<template>
  <div class="nav">
    <i class="iconfont iconjiantou2" @click="$router.back()"></i>
    <div>{{title}}</div>
    <i v-if='showHome==true' class="iconfont iconshouye" @click="$router.push('/login')"></i>
    <i v-else class="iconfont iconshouye" style="opacity:0"></i>
  </div>
</template>

<script>
export default {
  props:['title','showHome']
};
</script>

<style lang='less' scoped>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.273rem 0.546rem;
  border-bottom: 1px solid #e4e4e4;
  i {
    font-size: 0.546rem;
  }
  div {
    font-size: 0.437rem;
    font-weight: bold;
  }
}
</style>