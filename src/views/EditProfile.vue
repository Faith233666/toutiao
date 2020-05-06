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
    <!-- ActionSheet 动作面板 -->
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
      //本地存储的数据
      userJson: "",
      //个人信息的数据
      userInfo: "",
      //是否显示修改昵称的dialog弹出框
      show: false,
      //获取弹出框中修改昵称文本框的值
      nickname: "",
      //是否显示修改密码的dialog弹出框
      showPassword: false,
      //获取弹出框中修改密码文本框的值
      password: "",
      //设置上拉框的参数
      actions: [
        { name: "男", value: 1 },
        { name: "女", value: 0 }
      ],
      //是否显示上拉框
      showGender: false
    };
  },
  mounted() {
    //获取本地存储的信息，存入data中的userJson中
    let userJson = JSON.parse(localStorage.getItem("userInfo")) || [];
    this.userJson = userJson;
    this.$axios({
      //调用用户详情接口
      url: "/user/" + userJson.user.id,
      headers: {
        Authorization: userJson.token
      }
    }).then(res => {
      console.log(res);
      //获取个人信息数据，存入data中的userInfo中
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
        //传递图片地址，为了修改后台图片
        this.handleEdit({
          head_img: url
        });
      });
    },
    //修改后台的图片路径
    handleEdit(data) {
      //返回获取的后台请求
      //调用编辑用户信息接口
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
      //用request变量接收请求并添加成功的事件
      //传入昵称对象，修改昵称
      const request = this.handleEdit({ nickname: this.nickname });
      request.then(() => {
        //修改渲染的数据
        this.userInfo.nickname = this.nickname;
        //清空弹出框的文本
        this.nickname = "";
      });
    },
    //修改密码的事件
    handleEditChangePassword() {
      //用request变量接收请求并添加成功的事件
      //传入密码对象，修改密码
      const request = this.handleEdit({ password: this.password });
      request.then(() => {
         //清空弹出框的文本
        this.password = "";
      });
    },
    //修改性别的事件
    //item传actions中选中的对象
    onSelect(item) {
      //用request变量接收请求并添加成功的事件
      //传入性别对象，修改性别
      const request = this.handleEdit({ gender: item.value });
      request.then(() => {
        //修改渲染的数据
        this.userInfo.gender = item.value;
      });
    }
  },
  //注册组件
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