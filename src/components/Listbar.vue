<template>
     <!-- 列表按钮栏 -->
    <div class="listbar">
        <router-link to="#">
            <div>{{label}}</div>
            <div class="tips">
                {{tips}}
                <span class="iconfont iconjiantou1"></span>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
  props:['label','tips']
};
</script>
<style lang='less' scope>
.listbar {
    font-size: .389rem;
    padding-left:1.25rem;
    height: 1.5rem;
    line-height: 1.5rem;

    a {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px #eee solid;
      align-items: center;
      padding-right: 1.25rem;
    }

    .tips {
      color: #999;
      span {
        margin-left: .313rem;
      }
    }
  }
</style>