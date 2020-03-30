<template>
  <div class="box">
    <VmTop title="我的收藏" showHome="false"></VmTop>
    <div class="star" v-for='(item,index) in userInfo' :key='index'>
      <div class="plan1">
        <div>
          <p>{{item.title}}</p>
          <span>火星时报 52跟帖</span>
        </div>
        <img :src="$axios.defaults.baseURL+item.cover[0].url" alt />
      </div>
      <!-- <div class="plan2">
        <p>撒的仅仅是家世界阿萨德静安寺加点水就是点击ssssss的三骄</p>
        <img
          src="../assets/80296589_p0_master1200.jpg"
          v-for="(item,index) in [1,1,1]"
          :key="index"
        />
        <span>火星时报 52跟帖</span>
      </div> -->
    </div>
  </div>
</template>

<script>
import VmTop from "@/components/VmTop";
export default {
  data()
  {
    return{
       userJson:'',
       userInfo:''
    }
  },
  mounted()
  {
    let userJson=JSON.parse(localStorage.getItem('userInfo'));
    this.userJson=userJson;
    this.$axios({
      url:'/user_star',
      headers:{
        Authorization:this.userJson.token
      }
    }).then(res=>{
      console.log(res);
      this.userInfo=res.data.data;
    })
  },
  components: {
    VmTop
  }
};
</script>

<style lang='less' scoped>
.box {
  font-size: 14/360 * 100vw;
  .star {
    padding: 10/360 * 100vw;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e4e4e4;
    .plan1 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      div {
        p {
          margin-bottom: 10px;
          /*1. 超出的部分隐藏 */
          overflow: hidden;
          /*2. 文字用省略号替代超出的部分 */
          text-overflow: ellipsis;
          /* 3. 弹性伸缩盒子模型显示 */
          display: -webkit-box;
          /* 4. 限制在一个块元素显示的文本的行数 */
          -webkit-line-clamp: 2;
          /* 5. 设置或检索伸缩盒对象的子元素的排列方式 */
          -webkit-box-orient: vertical;
        }
        span {
          font-size: 12/360 * 100vw;
          color: #8c8989;
        }
      }
      img {
        width: 130/360 * 100vw;
        height: 80/360 * 100vw;
        object-fit: cover;
        margin-left: 8px;
        flex-shrink: 0;
      }
    }
    .plan2 {
      p {
        margin-bottom: 10/360 * 100vw;
        /*1. 超出的部分隐藏 */
        overflow: hidden;
        /*2. 文字用省略号替代超出的部分 */
        text-overflow: ellipsis;
        /* 3. 弹性伸缩盒子模型显示 */
        display: -webkit-box;
        /* 4. 限制在一个块元素显示的文本的行数 */
        -webkit-line-clamp: 2;
        /* 5. 设置或检索伸缩盒对象的子元素的排列方式 */
        -webkit-box-orient: vertical;
      }
      img {
        width: 32%;
        height: 60/360 * 100vw;
        object-fit: cover;
        vertical-align: middle;
        flex-shrink: 0;
        &:nth-of-type(2) {
          margin: 0 2px;
        }
      }
      span {
        display: block;
        margin-top: 10/360 * 100vw;
        font-size: 12/360 * 100vw;
        color: #8c8989;
      }
    }
  }
}
</style>