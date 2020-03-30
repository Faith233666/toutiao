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
    let userJson = JSON.parse(localStorage.getItem("userInfo"));
    this.userJson = userJson;
    this.$axios({
      url: "/user_follows/",
      headers: {
        Authorization: userJson.token
      }
    }).then(res => {
      this.follows = res.data.data;
    });
  },
  methods: {
    cancel(id, index) {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确定要取消关注么？"
        })
        .then(() => {
          this.$axios({
            url: "/user_unfollow/" + id,
            headers: {
              Authorization: this.userJson.token
            }
          }).then(res => {
            this.$toast.success("取消关注成功!");
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