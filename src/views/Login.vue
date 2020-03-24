<template>
  <div class="login">
    <div class="top">
      <span class="iconfont iconicon-test"></span>
    </div>
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>
    <div class="user">
      <form action='javascript:;'>
        <input type="text" placeholder="用户名/手机号码" />
        <input type="text" placeholder="密码" />
        <button type="submit">登录</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang='less' >
.login {
  width: 366px;
  height: 610px;
  margin: 100px auto;
  padding: 20px;
  background-color: #f2f2f2;
  .top {
    span {
      display: inline-block;
      font-size: 24px;
      font-weight: bold;
    }
  }
  .logo {
    display: flex;
    justify-content: center;
    span {
      font-size: 150px;
      color: red;
    }
  }
  .user {
    text-align: center;
    input {
      width: 100%;
      border: 0px;
      font-size: 18px;
      outline: none;
      background: #f2f2f2;
      padding: 10px;
      margin-bottom: 10px;
      border-bottom: 1px solid black;
    }
    button {
      width: 100%;
      height: 50px;
      font-size: 20px;
      line-height: 20px;
      margin-top: 50px;
      border: none;
      border-radius: 60px;
      color: white;
      background-color: #cc3300;
    }
  }
}
</style>