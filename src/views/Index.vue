<template>
  <div class="box">
    <div class="header">
      <div class="logo">
        <i class="iconfont iconnew" @click='$router.push("/login")'></i>
      </div>
      <div class="search" @click='$router.push("/search")'>
        <i class="iconfont iconsearch"></i>
        <span>搜索新闻</span>
      </div>
      <div class="user">
        <router-link to='/user'>
          <span class="iconfont iconwode"></span>
        </router-link>
      </div>
    </div>
      <!--   Tab标签页 组件   -->
      <!-- 结构如下 vab-tabs>vab-tab-van-pull-refersh>van-list>div -->
      <van-tabs v-model="active" swipeable sticky @scroll="handleScroll">
       <!-- tab栏切换 -->
      <van-tab v-for="(item,index) in categories" :title="item.name" :key="index" v-if='item.is_top==1||item.name=="V"'>
    <!-- list列表 组件 -->
    <!-- immediate-check这个属性可以阻止list组件默认就加载一次 -->
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list :immediate-check="false" v-model="item.loading" :finished="item.finished" finished-text="没有更多了" @load="onLoad">
          <div v-for='(Subitem,Subindex) in item.posts' :key='Subindex'>
          <PostItem1 :data='Subitem' v-if='Subitem.type==1&&Subitem.cover.length==1'></PostItem1>
          <PostItem2 :data='Subitem' v-if='Subitem.type==1&&Subitem.cover.length==3'></PostItem2>
          <PostItem3 :data='Subitem' v-if='Subitem.type==2'></PostItem3>
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
  //页面缓存所需要的属性
  name:"index",
  //组件的路由守卫
  beforeRouteEnter (to, from, next) {
    //当进入页是栏目管理页的时候，定位到第一个栏目，重新请求栏目管理页数据
    if(from.path=='/category')
    {
       next(vm => {
        vm.active=0;
        vm.pageReload();
      })
    }
    //请求栏目管理数据
    else{
      next(vm=>{
        vm.pageReload();
      });
    }  
  },
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
      token:""
      // categoryId:999
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
      const arr=this.categories.filter(item=>{
        return item.is_top==1 || item.name=='V'
      })
      //当点击了下箭头的时候，路由跳转
      if(this.active===arr.length-1)
      {
        this.$router.push('/category');
      }
      //当栏目切换的时候，需要重新请求当前栏目的内容
      this.getList();
    // scrollTo() 方法可把内容滚动到指定的坐标 第一个参数为X轴，第二个参数为Y轴
    //加定时器，等待文章渲染完成后才进行滚动
     setTimeout(() => {
         window.scrollTo(0,this.categories[this.active].scrollY);
     }, 20);
    }
  },
  methods:{
    pageReload()
    {
     //获取本地存储的数据，用于判断登录与未登录的tab栏
    //本地存储为空默认返回null,null的布尔值为false
     let localCategories=JSON.parse(localStorage.getItem('categories'));
     let {token}=JSON.parse(localStorage.getItem('userInfo'))||{};
     this.token=token;
     if(localCategories)
     {
     if(localCategories[0].name=='关注'&&!token)
     {
      this.reload();
     }
    else if(localCategories[0].name!='关注'&&token)
     {
       this.reload(token);
     }
     //当页面有token，name也等于关注的时候执行的分支
     else{
      this.categories = localCategories;
      this.addPagelist();
     }
     }
     //如果没有本地存储，重新请求
   else{
      this.reload();
    }
    },
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
         v.scrollY=0;
         v.isload=false;
         return v;
      })
      //页面一开始的时候执行一次加载
      this.getList();
    },
    onLoad() {
      //加载时触发
      this.getList();
    },
    //封装一个请求文章列表的方法
    getList()
    {
      //获取当前tab栏的id和页码
      const {pageIndex,id,finished,name,isload}=this.categories[this.active];
      //如果正在加载，直接返回
      if(isload) return;
      //如果没有加载，设置为正在加载
      this.categories[this.active].isload=true;
      //给当前栏目页数加1
      this.categories[this.active].pageIndex+=1;
      //当加载完成的时候，跳出函数
      if(finished) return;
      const config={
         url:'/post',
         params:{
           pageIndex:pageIndex,
           pageSize:5,
           category:id
         }
       };
       if(name=='关注')
       {
         config.headers={Authorization:this.token}
       }
      //调用文章列表接口,赋值当前的id和页码
        this.$axios(config).then(res=>{
        const {data,total}=res.data;
        //把新的文章合并到原来的文件中
        this.categories[this.active].posts=[...this.categories[this.active].posts,...data];
        //加载状态结束
        this.categories[this.active].loading=false;
        // 赋值的方式页面才会更新
         this.categories = [...this.categories];
        //是否是最后一页
        if(this.categories[this.active].posts.length==total)
        {
          //加载完成
         this.categories[this.active].finished=true;
        }
         //加载完毕后将isload的状态设置为false
         this.categories[this.active].isload=false;
       }) 
    },
    onRefresh() {
      // // 清空列表数据
      // this.finished = false;
      // // 重新加载数据
      // // 将 loading 设置为 true，表示处于正在加载状态
      // this.loading = true;
      this.onLoad();
    },
    handleScroll(data)
    {
      //因为栏目不管是从本地获取还是接口获取，都需要时间
      //要等this.categories有值的时候才设置滚动条的高度
      if(this.categories.length==0) {return}
      //scrollTop是滚动条的距离
       const {scrollTop}=data;
       //把滚动条的高度设置为当前栏目下的scrollY
       this.categories[this.active].scrollY=scrollTop;
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