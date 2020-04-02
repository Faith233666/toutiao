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
      <!-- Tab标签页 组件 -->
      <!-- 结构如下 vab-tabs>vab-tab-van-pull-refersh>van-list>div -->
      <van-tabs v-model="active" swipeable sticky>
       <!-- tab栏切换 -->
      <van-tab v-for="(item,index) in categories" :title="item.name" :key="index">
    <!-- list列表 组件 -->
    <!-- immediate-check这个属性可以阻止list组件默认就加载一次 -->
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list :immediate-check="false" v-model="categories[active].loading" :finished="categories[active].finished" finished-text="没有更多了" @load="onLoad">
          <div v-for='(item,index) in categories[active].posts' :key='index'>
          <PostItem1 :data='item' v-if='item.type==1&&item.cover.length==1'></PostItem1>
          <PostItem2 :data='item' v-if='item.type==1&&item.cover.length==3'></PostItem2>
          <PostItem3 :data='item' v-if='item.type==2'></PostItem3>
              </div>
           </van-list>
         </van-pull-refresh>
      </van-tab>
    </van-tabs>
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
      categories: [],
      //判断点击栏目 与数组索引相同
      active:0,
      //需要渲染的条数
      // list: [],
      //是否加载数据，到底后为true
      // loading: false,
      // //是否已加载完成，加载完成后不再触发load事件
      // finished: false,
      //是否下拉刷新 下拉后为true
      refreshing: false,
      categoryId:999,
    }
  },
  mounted()
  {
    //获取本地存储的数据，用于判断登录与未登录的tab栏
    //本地存储为空默认返回null,null的布尔值为false
     let localCategories=JSON.parse(localStorage.getItem('categories'));
     let {token}=JSON.parse(localStorage.getItem('userInfo'))||{};
     if(localCategories)
     {
     if(localCategories[0].name=='关注'&&!token)
     {
      this.reload();
      return;
     }
     if(localCategories[0].name!='关注'&&token)
     {
       this.reload(token);
       return;
     }
    this.categories = localCategories;
    this.addPagelist();
   }
   else{
      this.reload(token);
    }
    //调用文章列表接口，pageIndex第一页，pageSize五条数据,category为头条的id
    this.$axios({
      url:'/post',
      params:{
        pageIndex:1,
        pageSize:5,
        category:this.categoryId
      }
    }).then(res=>{
      //结构出数据
      const{data}=res.data;
      //赋值给当前页面的posts数组
      this.categories[this.active].posts=data;
      //重新赋值来让页面刷新
      this.categories = [...this.categories];
    })
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
      //列表刷新
      this.getList();
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
        //获取栏目列表的数据
       const {data} = res.data;
       //在栏目数组最后面加上V符号
        data.push({name:'V'});
        this.categories=data;
        //将内容保存到本地存储
        localStorage.setItem('categories',JSON.stringify(data));
        //调用增加列表属性的函数
        this.addPagelist();
      })
    },
    addPagelist()
    {
      //在本地的categories数组中添加属性
      this.categories=this.categories.map(v=>{
        //页码
         v.pageIndex=1;
         //每个tab栏渲染的数据
         v.posts=[];
         //是否要加载
         v.loading=false;
         //是否加载完成
         v.finished=false;
         return v;
      })
    },
    onLoad() {
      //加载时触发
      this.categories[this.active].pageIndex+=1;
      this.getList();
    },
    //封装一个请求文章列表的方法
    getList()
    {
      //当加载完成的时候，跳出函数
      if(this.categories[this.active].finished)
      {
        return;
      }
      //获取当前tab栏的id和页码
      const {pageIndex,id}=this.categories[this.active];
      //调用文章列表接口,赋值当前的id和页码
        this.$axios({
         url:'/post',
         params:{
           pageIndex:pageIndex,
           pageSize:5,
           category:id
         }
       }).then(res=>{
        const {data,total}=res.data;
        //把新的文章合并到原来的文件中
        this.categories[this.active].posts=[...this.categories[this.active].posts,...data];
        //加载状态结束
        this.categories[this.active].loading=false;
        // 赋值的方式页面才会更新
         this.categories = [...this.categories];
        //是否是最后一页
        if( this.categories[this.active].posts.length==total)
        {
          //加载完成
         this.categories[this.active].finished=true;
        }
       })   
    },
    onRefresh() {
      // // 清空列表数据
      // this.finished = false;
      // // 重新加载数据
      // // 将 loading 设置为 true，表示处于正在加载状态
      // this.loading = true;
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