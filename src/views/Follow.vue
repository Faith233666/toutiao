<template>
  <div class="box">
    <VmTop title="我的关注" showHome="false"></VmTop>
    <div class="news" v-for="(item,index) in follows" :key="index">
      <img :src="$axios.defaults.baseURL+item.head_img" alt />
      <div class="user">
        <span>{{item.nickname}}</span>
        <p>{{moment(item.create_date).format('YYYY-MM-DD hh:mm:ss')}}</p>
      </div>
      <div class="cancel">
        <span @click="cancel(item.id,index)">取消关注</span>
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
      follows: [],
      moment,
      userJson: ""
    };
  },
  components: {
    VmTop
  },
  mounted() {
    //将本地数据存入data的userJson中
    let userJson = JSON.parse(localStorage.getItem("userInfo"));
    this.userJson = userJson;
    //调用关注用户接口，渲染数据
    this.$axios({
      url: "/user_follows/",
      headers: {
        Authorization: userJson.token
      }
    }).then(res => {
      //将关注用户数据存入data中的follows数组中
      this.follows = res.data.data;
    });
  },
  methods: {
    //id 要删除的关注的人的id,index 数组循环的索引
    cancel(id, index) {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确定要取消关注么？"
        })
        .then(() => {
          this.$axios({
            //根据id发送取消关注接口的请求
            url: "/user_unfollow/" + id,
            headers: {
              Authorization: this.userJson.token
            }
          }).then(res => {
            this.$toast.success("取消关注成功!");
            //根据索引删除数组
            this.follows.splice(index, 1);
          });
        }).catch(() => {
        });
    }
  }
};
</script>

<style lang='less' scoped>
.news {
  font-size: 14/360 * 100vw;
  display: flex;
  padding: 20/360 * 100vw 20/360 * 100vw;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  img {
    width: 30/360 * 100vw;
    height: 30/360 * 100vw;
    border-radius: 50%;
    object-fit: cover;
  }
  .user {
    flex: 1;
    padding-left: 15/360 * 100vw;
    span {
      font-size: 18/360 * 100vw;
    }
    p {
      font-size: 16/360 * 100vw;
      color: #c3aba1;
    }
  }
  .cancel {
    padding: 10/360 * 100vw 15/360 * 100vw;
    font-size: 12/360 * 100vw;
    background: #e1e1e1;
    border-radius: 30px;
  }
}
</style>