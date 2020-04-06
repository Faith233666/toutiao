<template>
  <div class="login">
    <div class="top">
      <span class="iconfont iconicon-test"></span>
    </div>
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>
    <!-- form表单 组件 -->
    <!-- rules 规则   required:true表示必须的 message为不填时提示的信息 -->
    <van-form @submit="onSubmit" class="from">
      <van-field
        v-model="from.username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="from.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <!-- native-type绑定了submit表单提交事件 -->
        <van-button round block type="info" native-type="submit" class="van-login">登录</van-button>
      </div>
      <router-link to="/register">
        <div style="margin: 16px;">
          <van-button round block type="info" class="van-register">注册</van-button>
        </div>
      </router-link>
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    //v-model绑定的数据
    return {
      from: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    //form表单组件的提交事件
    onSubmit(values) {
      //调用登录接口
      this.$axios({
        url: "/login",
        method: "post",
        data: this.from
      }).then(res => {
        if (res.status == 200) {
          //toast轻提示框，成功提示
          this.$toast.success(res.data.message);
          //将返回的数据存入本地存储，以便后面使用
          localStorage.setItem("userInfo", JSON.stringify(res.data.data));
          //判断地址栏有没有return_url参数
          const {return_url}=this.$route.query;
          this.$router.replace(return_url||'/user');

        }
      });
    }
  }
};
</script>

<style lang='less' scoped>
.login {
  padding: 0.546rem;
  .top {
    span {
      display: inline-block;
      font-size: 0.656rem;
      font-weight: bold;
    }
  }
  .logo {
    display: flex;
    justify-content: center;
    span {
      font-size: 4.098rem;
      color: red;
    }
  }
  .user {
    text-align: center;
    input {
      border: 0rem;
      font-size: 0.492rem;
      outline: none;
      background: #f2f2f2;
      padding: 0.273rem;
      margin-bottom: 0.273rem;
      border-bottom: 0.027rem solid black;
    }
    button {
      font-size: 0.546rem;
      line-height: 0.546rem;
      margin-top: 1.366rem;
      border: none;
      border-radius: 1.639rem;
      color: white;
      background-color: #cc3300;
    }
  }
  .from {
    .van-cell {
      padding: 0.273rem 0px;
      border-bottom: 1px solid black;
      margin-bottom: 0.273rem;
    }
    .van-login {
      background: red;
      border: none;
      margin-top: 1.093rem;
    }
    .van-register {
      border: none;
      margin-top: 1.093rem;
    }
  }
}
</style>