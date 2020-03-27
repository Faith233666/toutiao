<template>
  <div class="container">
    <div class="header">
      <div class="avatar">
        <img src="https://www.baidu.com/img/bd_logo1.png" alt />
      </div>
      <div class="profile">
        <div>
          <span class="iconfont iconxingbienan"></span>
          火星网友
        </div>
        <p>2020-03-27</p>
      </div>
      <span class="arrow iconfont iconjiantou1"></span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang='less'>
.header {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom:5px #eee solid;
  .avatar{
    img{
      width:70px;
      height:70px;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  .profile{
    flex:1;
    padding-left: 20px;
    line-height: 1.5;
    p{
      color:#999;
    }
  }
}
</style>