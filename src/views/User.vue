<template>
  <div class="box">
    <div class="nav">
      <i class="iconfont iconjiantou2" @click="$router.back()"></i>
      <div>个人中心</div>
      <i class="iconfont iconshouye" @click='$router.push("/login")'></i>
    </div>
    <div class="top">
      <div class="t-left">
        <span>
          <!-- $axios.defaults.baseURL为基地址http://127.0.0.1:3000 -->
          <!-- 能通过this调用的参数和方法都可以在模板中使用 -->
          <img :src="$axios.defaults.baseURL+userInfo.head_img" />
        </span>
      </div>
      <div class="t-right">
        <span class="username">
          <i class="iconfont iconxingbienan"></i>
          {{userInfo.nickname}}
        </span>
        <!-- 日期插件固定写法 -->
        <p>{{moment(userInfo.create_date).format('YYYY-MM-DD')}}</p>
      </div>
      <span class="iconfont iconjiantou1"></span>
    </div>
    <!-- 循环遍历，Vue要求要加一个不唯一的key -->
    <Listbar v-for="(item,index) in rows" :key="index" :label="item.label" :tips="item.tips"></Listbar>
    <Listbar @click.native="handleClick" label="退出" />
  </div>
</template>

<script>
import Listbar from "@/components/Listbar";
//引入第三方的日期格式处理的工具库
import moment from "moment";
export default {
  data() {
    return {
      rows: [
        { label: "我的关注", tips: "关注的用户" },
        { label: "我的跟帖", tips: "跟帖回复" },
        { label: "我的收藏", tips: "文章视频" }
      ],
      userInfo: {},
      moment
    };
  },
  components: {
    Listbar
  },
  mounted() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.$axios({
      url: "/user/" + userInfo.user.id,
      headers: {
        Authorization: userInfo.token
      }
    }).then(res => {
      const data = res.data.data;
      this.userInfo = data;
    });
  },
  methods: {
    // 退出的事件
    handleClick() {
      // 询问用户是否确定退出
      this.$dialog
        .confirm({
          title: "提示",
          message: "确定退出吗？"
        })
        .then(() => {
          // 点击确定时候触发的函数
          // 清除本地的存储的用户数据
          localStorage.removeItem("userInfo");
          // 跳转到登录页,必须要使用replace。因为退出不可能再返回个人中心
          this.$router.replace("/login");
        })
        .catch(() => {
          // 点击取消按钮触发的函数
        });
    }
  }
};
</script>
<style lang="less" scoped>
.box {
  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.273rem 0.546rem;
    border-bottom: 1px solid #e4e4e4;
    i {
      font-size: 0.546rem;
    }
    div {
      font-size: 0.437rem;
      font-weight: bold;
    }
  }
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.273rem 0.546rem;
    border-bottom: 0.137rem solid #e4e4e4;
    .t-left {
      margin-left: 0.41rem;
      margin-right: 0.41rem;
      span {
        img {
          width: 1.94rem;
          height: 1.94rem;
          border-radius: 50%;
        }
      }
    }
    .t-right {
      position: relative;
      flex: 2;
      .iconxingbienan {
        color: blue;
        vertical-align: middle;
        font-size: 0.333rem;
        margin-right: 0.137rem;
      }
      .username {
        font-size: 0.328rem;
      }
      .iconjiantou1 {
        position: absolute;
        right: 0.383rem;
        top: 0.956rem;
        color: #c3aba1;
      }
      p {
        font-size: 0.328rem;
        color: #c3aba1;
      }
    }
  }
}
</style>