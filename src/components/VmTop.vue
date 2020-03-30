<template>
  <div class="nav">
    <i class="iconfont iconjiantou2" @click="$router.back()"></i>
    <div>{{title}}</div>
    <i v-if='showHome=="true"' class="iconfont iconshouye" @click="$router.push('/login')"></i>
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
  padding: 10/360*100vw 20/360*100vw;;
  border-bottom: 1px solid #e4e4e4;
  i {
    font-size: 20/360*100vw;
  }
  div {
    font-size: 17/360*100vw;
    font-weight: bold;
  }
}
</style>