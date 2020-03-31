<template>
  <div class="box">
    <VmTop title="我的收藏" showHome="false"></VmTop>
    <div class="star">
      <div class="plan1">
        <div>
          <p>林志玲穿透视黑纱裙米兰看秀腹部微隆显孕味</p>
          <span>火星时报 52跟帖</span>
        </div>
        <img src="../assets/80296589_p0_master1200.jpg" alt />
      </div>
    </div>
    <div class="star">
      <div class="plan2">
        <p>林志玲穿透视黑纱裙米兰看秀腹部微隆显孕味</p>
        <img
          src="../assets/80296589_p0_master1200.jpg"
          v-for="(item,index) in [1,1,1]"
          :key="index"
        />
        <span>火星时报 52跟帖</span>
      </div>
    </div>
    <div class="star">
      <div class="plan3">
        <p>林志玲穿透视黑纱裙米兰看秀腹部微隆显孕味</p>
        <div class="video">
          <div class="shipin"><i class='iconfont iconshipin'></i></div>
         <img src="../assets/80296589_p0_master1200.jpg" alt="">
        </div>
        <span>火星时报 52跟帖</span>
      </div>
    </div>
  </div>
</template>

<script>
import VmTop from "@/components/VmTop";
export default {
  data() {
    return {
      userJson: "",
      userInfo: ""
    };
  },
  mounted() {
    //获取本地数据到data的userJson中
    let userJson = JSON.parse(localStorage.getItem("userInfo"));
    this.userJson = userJson;
    //调用收藏文章列表接口，渲染数据
    this.$axios({
      url: "/user_star",
      headers: {
        Authorization: this.userJson.token
      }
    }).then(res => {
      console.log(res);
      //获取收藏文章到data的userInfo中
      this.userInfo = res.data.data;
    });
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
    .plan3 {
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
      .video{
        position: relative;
        .shipin{
          position: absolute;
          top:50%;
          left:50%;
          transform: translateX(-25/360*100vw) translateY(-25/360*100vw);
          width: 50/360*100vw;
          height: 50/360*100vw;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(0,0,0,0.2);
          border-radius: 50%;
          i{
            font-size: 35/360*100vw;
            color: white;
          }
        }
        img{
          width: 100%;
          height: 140/360*100vw;
          object-fit: cover;
        }
      }
      span{
          display: block;
        margin-top: 10/360 * 100vw;
        font-size: 12/360 * 100vw;
        color: #8c8989;
      }
    }
  }
}
</style>