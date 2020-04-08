<template>
    <div class="footer">
      <div class="writeFollow">写跟帖</div>
      <div class="footerIcons">
      <div class="message">{{data.comment_length>100?'99':data.comment_length}}</div>
       <i class="iconfont iconpinglun-"></i>
        <i class="iconfont iconshoucang" @click="collectClick" :class="data.has_star?'active':''"></i>
        <i class="iconfont iconfenxiang"></i>
      </div>
    </div>
</template>

<script>
export default {
 props:['data'],
 methods:{
   //收藏的点击事件
    collectClick()
    {
      let {token}=JSON.parse(localStorage.getItem('userInfo'));
       this.$axios({
          url:'/post_star/'+this.data.id,
          headers:{
            Authorization:token
          }
          }).then(res=>{
           const {message}=res.data;
           this.$toast.success(message);
           this.data.has_star=!this.data.has_star;
          })
    }
 }
}
</script>
<style lang='less' scoped>
@vw:3.6vw;
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
</style>