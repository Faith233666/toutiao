<template>
  <div class="box">
    <div class="header">
      <div class="nav">
        <div class="icon">
          <i class="iconfont iconjiantou2"></i>
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
        <div class="praise">
          <i class="iconfont icondianzan"></i>112
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
    <div class="footer">
      <div class="writeFollow">写跟帖</div>
      <div class="footerIcons">
      <div class="message">{{post.comment_length}}</div>
       <i class="iconfont iconpinglun-"></i>
        <i class="iconfont iconshoucang"></i>
        <i class="iconfont iconfenxiang"></i>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  data()
  {
     return{
         post:{
           //防止报undefined
           user:{
              
           }
         },
         moment,
     }
  },
  mounted()
  {
    const {token}=JSON.parse(localStorage.getItem('userInfo'));
    //获取到url地址的动态id
    let {id}=this.$route.params;
    let config={url:'/post/'+id}
    if(token)
    {
     config.headers={
         Authorization:token
     }
    }
    this.$axios(config).then(res=>{
      const {data}=res.data;
      this.post=data;
      localStorage.setItem('postJson',JSON.stringify(data));
    })
  },
  methods:{
    followClick(item)
    { 
      const {token}=JSON.parse(localStorage.getItem('userInfo'))||{};
      if(item)
      {
          let {id}=this.$route.params;
          this.$axios({
          url:'/user_unfollow/'+id,
          headers:{
            Authorization:token
          }
          }).then(res=>{
            console.log(res);
            this.post.has_follow=false;
            this.$toast.success('取消关注成功');
          })
       }
      else{
          let {id}=this.$route.params;
          this.$axios({
          url:'/user_follows/'+id,
          headers:{
            Authorization:token
          }
        }).then(res=>{
            this.post.has_follow=true;
            this.$toast.success('关注成功');
        })
      }
    }
  }
};
</script>

<style lang="less" scoped>
@vw: 3.6vw;
.active{
  background: red;
  color:white;
}
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
        color: black;
        border:1px solid black;
        border-radius: 50 / @vw;
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
    }
  }
}
</style>