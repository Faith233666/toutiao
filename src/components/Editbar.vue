<template>
   <router-link to='#'>
      <div class="list">
      <div>{{label}}</div>
      <div class="tips">
         {{tips}}
        <i class="iconfont iconjiantou1"></i>
      </div>
    </div>
   </router-link>
</template>

<script>
export default {
props:['label','tips']
}
</script>

<style lang='less' scope>
 .list {
    font-size: 0.389rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 0.556rem;
    padding: 0.278rem 0.278rem 0.278rem 0px;
    border-bottom: 1px solid #eee;
    .tips {
      color: #999;
    }
    i {
      margin-left: 0.139rem;
    }
  }
</style>