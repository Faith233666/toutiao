<template>
  <div class="register">
    <div class="top">
      <span class="iconfont iconicon-test"></span>
    </div>
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>
    <!-- <div class="user">
      <input type="text" v-model="from.username" placeholder="用户名/手机号码" />
      <input type="password" v-model="from.password" placeholder="密码" />
      <button type="submit" @click="handleclick">登录</button>
    </div>-->
    <!-- rules 规则  required 必填项 message 提示信息 -->
    <van-form @submit="onSubmit" class="from">
      <van-field
        v-model="from.username"
        name="用户名/手机号码"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写手机号码' }]"
      />
      <van-field
        v-model="from.nickname"
        name="昵称"
        label="昵称"
        placeholder="昵称"
        :rules="[{ required: true, message: '请填写昵称' }]"
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
        <van-button round block type="info" native-type="submit" class="van-register">注册</van-button>
      </div>
      <router-link to="/login">
        <div style="margin: 16px;">
          <van-button round block type="info" class="van-login">登录</van-button>
        </div>
      </router-link>
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      from: {
        username: "",
        password: "",
        nickname: ""
      }
    };
  },
  methods: {
    onSubmit(values) {
      this.$axios({
        url: "/register",
        method: "post",
        data: this.from
      }).then(res => this.$toast.success(res.data.message));
    }
  }
};
</script>
<style lang='less' scoped>
// scoped表示当前组件不影响到其他组件
.register {
  width: 10rem;
  margin: 2.732rem auto;
  padding: 0.546rem;
  background-color: #f2f2f2;
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
      width: 100%;
      border: 0rem;
      font-size: 0.492rem;
      outline: none;
      background: #f2f2f2;
      padding: 0.273rem;
      margin-bottom: 0.273rem;
      border-bottom: 0.027rem solid black;
    }
    button {
      width: 100%;
      height: 1.366rem;
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
      padding: 10px 0px;
      background: #f2f2f2;
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