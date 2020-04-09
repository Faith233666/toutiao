<template>
  <div class="box">
    <div class="header">
      <div class="nav">
        <div class="icon">
          <i class="iconfont iconjiantou2" @click="$router.back()"></i>
          <span class="iconfont iconnew"></span>
        </div>
        <div class="follow" @click="followClick(post.has_follow)" :class="post.has_follow?'active':''">{{post.has_follow?'已关注':'关注'}}</div>
      </div>
      <div class="title">
        <h3>{{post.title}}</h3>
        <div class="subtitle">
         {{post.user.nickname}}
          <span class="date">{{moment(post.create_date).format('YYYY-MM-DD')}}</span>
        </div>
      </div>
      <div class="article">
        <p v-html="post.content"></p>
      </div>
      <div class="fun">
        <div class="praise" @click='praiseClick'>
          <i class="iconfont icondianzan"></i>{{post.like_length}}
        </div>
        <div class="transpond">
          <i class="iconfont iconweixin"></i>微信
        </div>
      </div>
    </div>
    <div class="content">
        <h3>精彩跟帖</h3>
        <p>暂无跟帖，抢占沙发</p>
    </div>
    <PostBar :data='post'></PostBar>
  </div>
</template>

<script>
import moment from 'moment';
import PostBar from '@/components/PostBar';
export default {
  components:{
    PostBar
  },
  data()
  {
     return{
         post:{
           //防止报undefined
           user:{
              
           }
         },
         moment,
         token:"",
         id:""
     }
  },
  mounted()
  {
    let {id}=this.$route.params;
    const {token}=JSON.parse(localStorage.getItem('userInfo'))||{};
    this.token=token;
    //获取到url地址的动态id
    //需要传递栏目的id
    let config={url:'/post/'+id}
    if(token)
    {
     config.headers={
         Authorization:token
     }
    }
    this.$axios(config).then(res=>{
      const {data}=res.data;
      // 替换文字内容里面的本地路径，把localhost:3000替换成基准路径，
      // “这个功能只对使用线上接口有效果”，如果使用的是本地的后台，不替换也可以
      data.content=data.content.replace(
        /http:\/\/localhost:3000/ig,
        this.$axios.defaults.baseURL
      )
      this.post=data;
      localStorage.setItem('postJson',JSON.stringify(data));
    })
  },
  methods:{
    //关注的点击事件
    followClick(item)
    { 
      if(item)
      {
          this.$axios({
         //需要传递用户的id
          url:'/user_unfollow/'+this.post.user.id,
          headers:{
            Authorization:this.token
          }
          }).then(res=>{
            this.post.has_follow=false;
            this.$toast.success('取消关注成功');
          })
       }
      else{
          this.$axios({
          url:'/user_follows/'+this.post.user.id,
          headers:{
            Authorization:this.token
          }
        }).then(res=>{
            this.post.has_follow=true;
            this.$toast.success('关注成功');
        })
      }
    },
    //点赞的点击事件
    praiseClick()
    {
      this.$axios({
          url:'/post_like/'+this.post.id,
          headers:{
            Authorization:this.token
          }
          }).then(res=>{
           const {message}=res.data;
           this.$toast.success(message);
           this.post.has_like=!this.post.has_like;
           if(this.post.has_like)
           {
             this.post.like_length+=1;
           }
           else
           {
             this.post.like_length-=1;
           }
          })
    },
    //收藏的点击事件
    collectClick()
    {
       this.$axios({
          url:'/post_star/'+this.post.id,
          headers:{
            Authorization:this.token
          }
          }).then(res=>{
           const {message}=res.data;
           this.$toast.success(message);
           this.post.has_star=!this.post.has_star;
          })
    }
  }
};
</script>

<style lang="less" scoped>
@vw: 3.6vw;
.box {
  font-size: 14 / @vw;
  .header {
    padding-bottom: 20 / @vw;
    border-bottom: 5 / @vw solid #e4e4e4;
    .nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10 / @vw;
      .icon {
        i {
          display: inline-block;
          transform: scale(1.5);
        }
        span {
          display: inline-block;
          transform: scale(5);
          margin-left: 30 / @vw;
          line-height: 1.3;
        }
      }
      .follow {
        font-size: 10 / @vw;
        padding: 5 / @vw 20 / @vw;
        background: red;
        color:white;
        border:1px solid black;
        border-radius: 50 / @vw;
      }
      .active{
      background: none;
      color: black;
    }
    }
    .title {
      padding: 0 10 / @vw;
      h3 {
        font-size: 19 / @vw;
      }
      .subtitle {
        font-size: 12 / @vw;
        padding: 5 / @vw 0 15 / @vw 0;
        color: #a5a4a1;
        span {
          margin-left: 10 / @vw;
        }
      }
    }
    .article {
      padding: 0 10 / @vw;
      p {
        line-height: 2;
        margin-bottom: 30 / @vw;
        /deep/ img{
          width: 100%;
        }
      }
    }
    .fun {
      padding: 0 10 / @vw;
      display: flex;
      justify-content: space-around;
      .praise {
        display: flex;
        align-items: center;
        padding: 5 / @vw 15 / @vw;
        border: 1px solid black;
        border-radius: 50px;
        i {
          margin-right: 5 / @vw;
          transform: scale(1.5);
        }
      }
      .transpond {
        display: flex;
        align-items: center;
        padding: 5 / @vw 15 / @vw;
        border: 1px solid black;
        border-radius: 50px;
        i {
          display: inline-block;
          margin-right: 5 / @vw;
          color: green;
          transform: scale(1.5);
        }
      }
    }
  }
  .content{
    text-align: center;
    border-bottom: 1px solid #e4e4e4 ;
    h3{
      margin: 15/@vw 0;
    }
    p{
      margin-bottom: 25/@vw;
      color: #a5a4a1;;
    }
  }
  .footer{
    margin: 15/@vw 10/@vw 10/@vw 10/@vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .writeFollow
    {
      flex: 1;
      padding:5/@vw;
      padding-left:15/@vw;
      border-radius: 50px;
      background: #d7d7d7;
      color:#765d63;
    }
    .footerIcons
    {
      position: relative;
       margin-left: 40/@vw;
       .message{
        padding:3/@vw 10/@vw;
        background: red;
        color: white;
        border-radius: 50px;
        font-size: 8/@vw;
        z-index: 1;
        position: absolute;
        top: -15px;
        left: 0;
       }
       i{
         display: inline-block;
         transform: scale(2);
         margin-right:30/@vw;
       }
      .active{
       color: red;
      }
    }
  }
}
</style>