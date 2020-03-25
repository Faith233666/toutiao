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
        <input type="password" placeholder="密码" />
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
  width: 10rem;
  height: 16.667rem;
  margin: 2.732rem auto;
  padding: .546rem;
  background-color: #f2f2f2;
  .top {
    span {
      display: inline-block;
      font-size: .656rem;
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
      font-size: .492rem;
      outline: none;
      background: #f2f2f2;
      padding: .027rem;
      margin-bottom: .273rem;
      border-bottom: .027rem solid black;
    }
    button {
      width: 100%;
      height: 1.366rem;
      font-size: .546rem;
      line-height: .546rem;
      margin-top: 1.366rem;
      border: none;
      border-radius: 1.639rem;
      color: white;
      background-color: #cc3300;
    }
  }
}
</style>