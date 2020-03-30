<template>
  <div class="box">
    <VmTop title="我的关注" showHome='false'></VmTop>
    <div class="news" v-for="(item,index) in follows" :key='index'>
          <img :src="$axios.defaults.baseURL+item.head_img" alt="">
       <div class="user">
          <span>{{item.nickname}}</span>
          <p>{{moment(item.create_date).format('YYYY-MM-DD hh:mm:ss')}}</p>
       </div>
       <div class="cancel">
          <span>取消关注</span>
       </div>
    </div>
  </div>
</template>

<script>
import VmTop from '@/components/VmTop';
import moment from 'moment'
export default {
  data()
  {
   return{
     follows:[],
     moment
   }
  },
  components:{
    VmTop
  },
  mounted()
  {
    let userJson=JSON.parse(localStorage.getItem('userInfo'));
    this.$axios({
      url:'/user_follows/',
      headers:{
        Authorization:userJson.token
      }
    }).then(res=> {
         this.follows=res.data.data;
         console.log(this.follows);
    })
  }
}
</script>

<style lang='less' scoped>

  .news{
    font-size: 14/360 * 100vw;
    display: flex;
    padding:20/360 * 100vw 20/360 * 100vw;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
    img{
       width: 30/360 * 100vw;
       height: 30/360 * 100vw;
       border-radius: 50%;
       object-fit: cover;
    }
    .user{
      flex: 1;
      padding-left: 15/360 * 100vw;
      span{
        font-size: 18px;
      }
      p{
        font-size: 16px;
        color:#c3aba1;
      }
    }
    .cancel{
      padding:10px 15px;
      font-size: 12px;
      background: #e1e1e1;
      border-radius:30px;
    }
  }
</style>