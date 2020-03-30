<template>
  <div>
    <NaigateBar title="编辑资料" showHome="false"></NaigateBar>
    <div class="avator">
      <img :src="$axios.defaults.baseURL+userInfo.head_img" />
      <!-- Uploader上传文件的组件 -->
      <van-uploader :after-read="afterRead" class="upload" />
    </div>
    <ListBar label="昵称" :tips="userInfo.nickname" @click.native="show=true"></ListBar>
    <!-- dialog弹出框组件 -->
    <van-dialog v-model="show" title="昵称修改" show-cancel-button @confirm="handleEditChangeNickname">
      <van-field v-model="nickname" placeholder="请输入昵称" />
    </van-dialog>
    <ListBar label="密码" tips="******" @click.native="showPassword=true"></ListBar>
    <!-- dialog弹出框组件 -->
    <van-dialog
      v-model="showPassword"
      title="密码修改"
      show-cancel-button
      @confirm="handleEditChangePassword"
    >
      <van-field type="password" v-model="password" placeholder="请输入密码" />
    </van-dialog>
    <ListBar label="性别" :tips="['女','男'][userInfo.gender]" @click.native="showGender=true"></ListBar>
    <!-- ActionSheet 上拉菜单 -->
    <van-action-sheet
      v-model="showGender"
      :actions="actions"
      @select="onSelect"
      close-on-click-action
    />
  </div>
</template>

<script>
import NaigateBar from "@/components/NavigateBar";
import ListBar from "@/components/Listbar";
export default {
  data() {
    return {
      userJson: "",
      userInfo: "",
      show: false,
      nickname: "",
      showPassword: false,
      password: "",
      actions: [
        { name: "男", value: 1 },
        { name: "女", value: 0 }
      ],
      showGender: false
    };
  },
  mounted() {
    let userJson = JSON.parse(localStorage.getItem("userInfo")) || [];
    this.userJson = userJson;
    this.$axios({
      url: "/user/" + userJson.user.id,
      headers: {
        Authorization: userJson.token
      }
    }).then(res => {
      console.log(res);
      this.userInfo = res.data.data;
    });
  },
  methods: {
    //获取file文件的信息
    afterRead(file) {
      const formdata = new FormData();
      formdata.append("file", file.file);
      //将文件上传到后台
      this.$axios({
        method: "post",
        url: "/upload",
        headers: {
          Authorization: this.userJson.token
        },
        data: formdata
      }).then(res => {
        const { url } = res.data.data;
        this.userInfo.head_img = url;
        this.handleEdit({
          head_img: url
        });
      });
    },
    //修改后台的图片路径
    handleEdit(data) {
      return this.$axios({
        method: "post",
        url: "/user_update/" + this.userInfo.id,
        headers: {
          Authorization: this.userJson.token
        },
        data: data
      }).then(res => {
        console.log(res);
        this.$toast.success("修改成功");
      });
    },
    //修改昵称的事件
    handleEditChangeNickname() {
      const request = this.handleEdit({ nickname: this.nickname });
      request.then(() => {
        this.userInfo.nickname = this.nickname;
        this.nickname = "";
      });
    },
    //修改密码的事件
    handleEditChangePassword() {
      const request = this.handleEdit({ password: this.password });
      request.then(() => {
        this.password = "";
      });
    },
    //修改性别的事件
    onSelect(item) {
      const request = this.handleEdit({ gender: item.value });
      request.then(() => {
        this.userInfo.gender = item.value;
      });
    }
  },
  components: {
    NaigateBar,
    ListBar
  }
};
</script>

<style lang='less' scoped>
.avator {
  position: relative;
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 0.278rem 0px;
  img {
    width: 2.778rem;
    height: 2.778rem;
    border-radius: 50%;
  }
  .upload {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -1.222rem;
    margin-top: -1.222rem;
    opacity: 0;
    // transform: translateX(-1.111rem) translateY(-1.111rem);
  }
}
</style>