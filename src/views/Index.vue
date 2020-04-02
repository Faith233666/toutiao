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
        <van-tab v-for="(item,index) in categories" :title="item.name" :key="index"></van-tab>
      </van-tabs>
    </div>
    <!-- list列表 组件 -->
    <!-- immediate-check这个属性可以阻止list组件默认就加载一次 -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
     <van-list :immediate-check="false" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div v-for='(item,index) in list' :key='index'>
       <PostItem1 :data='item' v-if='item.type==1&&item.cover.length==1'></PostItem1>
       <PostItem2 :data='item' v-if='item.type==1&&item.cover.length==3'></PostItem2>
       <PostItem3 :data='item' v-if='item.type==2'></PostItem3>
      </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import PostItem1 from '@/components/PostItem1'
import PostItem2 from '@/components/PostItem2'
import PostItem3 from '@/components/PostItem3'
export default {
  mounted()
  {
     let localCategories=JSON.parse(localStorage.getItem('categories'))||{};
     let {token}=JSON.parse(localStorage.getItem('userInfo'))||{};
     if(localCategories)
     {
     if(localCategories[this.active].name=='关注'&&!token)
     {
      this.reload();
     }
     else if(localCategories[this.active].name!='关注'&&token)
     {
       this.reload(token);
     }
     else{
        this.reload();
     }
   }
   this.$axios({
     url:'/post',
     params:{
       pageIndex:1,
       pageSize:5,
       category:this.categoryId
     }
   }).then(res=>{
     const{data}=res.data;
     this.list=data;
   })
   
  },
  data()
  {
    return{
      //tab栏数据
      categories: [],
      //判断点击栏目 与数组索引相同
      active:0,
      //需要渲染的条数
      list: [],
      //是否加载数据，到底后为true
      loading: false,
      //是否已加载完成，加载完成后不再触发load事件
      finished: false,
      //是否下拉刷新 下拉后为true
      refreshing: false,
      categoryId:999
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
    reload(token)
    {
      const config={
        url:'/category'
      }
      if(token)
      {
        config.headers={Authorization:token}
      }
       //请求栏目列表
      this.$axios(config).then(res=>{
        const {data}=res.data;
        localStorage.getItem('categories',JSON.stringify(data));
        data.push({name:'V'});
        this.categories=data;
        this.addPageIndex();
      })
    },
    addPageIndex()
    {
      this.categories=this.categories.map(v=>{
         v.pageIndex=1;
         return v;
      })
     console.log(this.categories);
    },
    onLoad() {
      setTimeout(() => {
      this.categories[this.active].pageIndex+=1;
       this.$axios({
         url:'/post',
         params:{
           pageIndex:this.categories[this.active].pageIndex,
           pageSize:5,
           category:this.categoryId
         }
       }).then(res=>{
        const {data,total}=res.data;
        this.list=[...this.list,...data];
        this.loading=false;
        if(this.list.length==total)
        {
          this.finished=true;
        }
       })
      }, 3000);
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于正在加载状态
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
  /deep/ .van-tabs__wrap
  {
    padding-right: 20/360*100vw;
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