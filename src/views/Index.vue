<template>
  <div class="box">
    <div class="header">
      <div class="logo">
        <i class="iconfont iconnew"></i>
      </div>
      <div class="search">
        <i class="iconfont iconsearch"></i>
        <span>搜索新闻</span>
      </div>
      <div class="user">
        <span class="iconfont iconwode"></span>
      </div>
    </div>
    <!-- tab栏切换 -->
    <div class="tab">
      <!-- Tab标签页 组件 -->
      <van-tabs v-model="active" swipeable sticky>
        <van-tab v-for="(item,index) in categories" :title="item" :key="index"></van-tab>
      </van-tabs>
    </div>
    <!-- list列表 组件 -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
     <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
       <!-- 第一种规则，单张图片 -->
    <PostItem1 v-for="item in list" :key="item" ></PostItem1>
      </van-list>
    </van-pull-refresh>
    <!-- 第二种规则，三张图片 -->
    <!-- <PostItem2></PostItem2> -->
    <!-- 第三种规则，视频 -->
    <!-- <PostItem3></PostItem3> -->
  </div>
</template>

<script>
import PostItem1 from '@/components/PostItem1'
import PostItem2 from '@/components/PostItem2'
import PostItem3 from '@/components/PostItem3'
export default {
  data()
  {
    return{
      //tab栏数据
      categories: ['关注','娱乐','体育','汽车','房产','关注',
        '关注','娱乐','体育','汽车','房产','关注', "∨"],
      //判断点击栏目 与数组索引相同
      active:0,
      //需要渲染的条数
      list: [],
      //是否加载数据，到底后为true
      loading: false,
      //是否已加载完成，加载完成后不再触发load事件
      finished: false,
      //是否下拉刷新 下拉后为true
      refreshing: false
    }
  },
  //三种规则组件
  components:{
    PostItem1,
    PostItem2,
    PostItem3
  },
  watch:{
    active()
    {
      //当点击了下箭头的时候，路由跳转
      if(this.active===this.categories.length-1)
      {
        this.$router.push('/列表页');
      }
    }
  },
  methods:{
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length+1);
        }
        // 加载状态结束
        this.loading = false;
        // 数据全部加载完成
        if (this.list.length >= 30) {
          this.finished = true;
        }
      },3000);
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    }
  }
};
</script>
<style lang='less' scoped>
.box {
  font-size: 14/360 * 100vw;
  .header {
    background: red;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo {
      height: 30px;
      line-height: 30px;
    }
    .logo i {
      display: block;
      font-size: 50/360 * 100vw;
      margin-left: 10/360 * 100vw;
      color: white;
      overflow: hidden;
    }
    .search {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(255, 255, 255, 0.5);
      padding: 5/360 * 100vw 0;
      margin: 5/360 * 100vw 20/360 * 100vw;
      border-radius: 50/360 * 100vw;
      color: white;
      span {
        margin-left: 5px;
      }
    }
    .user span {
      font-size: 25/360 * 100vw;
      margin-right: 10/360 * 100vw;
      color: white;
    }
  }
  /deep/ .van-tabs__nav{
    position: static;
     background: #eee;
    .van-tab:nth-last-child(2){
    background: #eee;
      width: 20/360*100vw;
      position: absolute;
      top:0;
      right: 0;
      box-sizing: unset;
    }
    .van-tabs__line{
      background-color: transparent;
    }
    .van-tab--active
    {
      border-bottom: 1px solid red;
    }
    .van-ellipsis{
      flex-basis:14% !important;
    }
}
}

</style>