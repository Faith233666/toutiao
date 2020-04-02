<template>
  <div class="box">
    <VmTop title="我的跟帖" showHome="false"></VmTop>
    <div class="posts">
      <div class="pub" v-for="(item,index) in userInfo" :key="index">
        <div class="fromDate">{{moment(item.create_date).format('YYYY-MM-DD hh:mm')}}</div>
        <div class="reply" v-if="item.parent">
          <div>回复：{{item.parent.user.nickname}}</div>
          <p>{{item.parent.content}}</p>
        </div>
        <p>{{item.content}}</p>
        <div class="original">
          <div>原文：阿信分享《说好不哭》幕后故事：只听？？？？？？？？？</div>
          <span class="iconfont iconjiantou1"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VmTop from "@/components/VmTop";
import moment from "moment";
export default {
  data() {
    return {
      userJson: "",
      userInfo: "",
      moment
    };
  },
  mounted() {
    let userJson = JSON.parse(localStorage.getItem("userInfo"));
    this.userJson = userJson;
    //调用用户评论列表接口，渲染数据
    this.$axios({
      url: "/user_comments",
      headers: {
        Authorization: userJson.token
      }
    }).then(res => {
      console.log(res);
      //获取用户评论数据到data的userInfo中
      this.userInfo = res.data.data;
    });
  },
  components: {
    VmTop
  }
};
</script>

<style lang='less' scoped>
@vw:3.6vw;
.box {
  font-size: 12/360*100vw;
  .posts {
    .pub {
      padding: 15/360 * 100vw;
      padding-bottom: 10/360 * 100vw;
      border-bottom: 1px solid #e4e4e4;
      color: #8c8989;
      p {
        font-size: 14/360 * 100vw;
        padding: 10/360 * 100vw 0;
        color: black;
      }
      .reply {
        margin-top: 10/360 * 100vw;
        background: #e4e4e4;
        padding: 10/360 * 100vw;
        div {
          padding-bottom: 10/360 * 100vw;
        }
      }
      .original {
        display: flex;
        align-items: center;
        div {
          /*1. 先强制一行内显示文本*/
          white-space: nowrap;
          /*2. 超出的部分隐藏*/
          overflow: hidden;
          /*3. 文字用省略号替代超出的部分*/
          text-overflow: ellipsis;
        }
        span {
          margin-left: 20px;
        }
      }
    }
  }
}
</style>