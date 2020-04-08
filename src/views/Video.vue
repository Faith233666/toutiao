<template>
   <div class="box">
     <video v-if='post.content' :src="$axios.defaults.baseURL+post.content" class="video" controls :poster="$axios.defaults.baseURL+post.cover[0].url"></video>
     <div class="header">
      <div class="user">
         <img v-if='post.user.head_img' :src="$axios.defaults.baseURL+post.user.head_img" alt="">
         火星时报
      </div>
         <div class="follow" @click="followClick(post.has_follow)" :class="post.has_follow?'active':''">{{post.has_follow?'已关注':'关注'}}</div>
     </div>
      <div class="title">
        <h3>{{post.title}}</h3>
      </div>
      <div class="fun">
      <div class="praise">
      <i class="iconfont icondianzan" @click=" praiseClick()"></i>{{post.like_length}}
      </div>
      <div class="transpond">
        <i class="iconfont iconweixin"></i>微信
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
import PostBar from '@/components/PostBar';
export default {
  components:{
    PostBar
  },
  data()
  {
    return{
      post:{
        user:{},
        cover:[{}]
      }
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
      this.post=data;
      localStorage.setItem('postJson',JSON.stringify(data));
    })
  },
  methods:{
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
  }
}
</script>

<style lang='less' scoped>
@vw:3.6vw;
.box{
  font-size: 14/@vw;
  .video{
    width: 100%;
    height: 150/@vw;
  }
  .header{
    padding:10/@vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user{
      color:#a5a4a1;
     img{
      width: 25/@vw;
      border-radius: 50%;
      object-fit: cover;
      vertical-align: bottom;
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
  .title{
    padding: 15/@vw 0 30/@vw 10/@vw;
    h3{
       font-weight: normal;
    }
  }
  .fun {
  padding: 0 10 / @vw;
  display: flex;
  justify-content: space-around;
  padding-bottom: 20/@vw;
  border-bottom: 5px solid #e4e4e4;
  .praise {
    display: flex;
    align-items: center;
    padding: 5 / @vw 15 / @vw;
    border: 1px solid black;
    border-radius: 50px;
    i {
      margin-right: 10 / @vw;
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
      margin-right: 5/ @vw;
      color: green;
      transform: scale(1.5);
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
}
</style>