<template>
  <div class="box">
    <VmTop title="我的收藏" showHome="false"></VmTop>
    <div v-for='(item,index) in userInfo' :key='index'>
      <PostItem1 :data='item' v-if='item.type==1&&item.cover.length==1'></PostItem1>
      <PostItem2 :data='item' v-if='item.type==1&&item.cover.length==3'></PostItem2>
      <PostItem3 :data='item' v-if='item.type==2'></PostItem3>
    </div>
  </div>
</template>

<script>
import VmTop from "@/components/VmTop";
import PostItem1 from '@/components/PostItem1'
import PostItem2 from '@/components/PostItem2'
import PostItem3 from '@/components/PostItem3'
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
    VmTop,
  PostItem1,
  PostItem2,
  PostItem3
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
  }
}
</style>