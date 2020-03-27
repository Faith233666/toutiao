<template>
  <div class="box">
    <div class="top">
      <div class="t-left">
        <span></span>
      </div>
      <div class="t-right">
        <span class="username"><i class="iconfont iconxingbienan"></i>鄙夷的网友</span>
        <span class="iconfont iconjiantou1"></span>
        <p>2019-10-10</p>
      </div>
    </div>
    <div class="list">
      <ul>
        <li>
          我的关注
          <span>
            关注的用户
            <i class="iconfont iconjiantou1"></i>
          </span>
        </li>
        <li>
          我的跟帖
          <span>
            跟帖/回复
            <i class="iconfont iconjiantou1"></i>
          </span>
        </li>
        <li>
          我的收藏
          <span>
            文章/视频
            <i class="iconfont iconjiantou1"></i>
          </span>
        </li>
        <li>
          设置
          <span>
            <i class="iconfont iconjiantou1"></i>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.box {
  width: 10rem;
  height: 16.667rem;
  margin: 2.732rem auto;
  background: #f2f2f2;
  .top {
    padding-bottom: 0.546rem;
    border-bottom: 0.137rem solid #e4e4e4;
    display: flex;
    padding-top: 0.546rem;
    .t-left {
      margin-left: 0.41rem;
      margin-right: 0.41rem;
      span {
        display: inline-block;
        width: 1.94rem;
        height: 1.94rem;
        border-radius: 50%;
        background: url("../assets/80296589_p0_master1200.jpg") -0.41rem -0.219rem;
        background-size: 2.486rem;
      }
    }
    .t-right {
      position: relative;
      flex: 2;
      .iconxingbienan {
        color: blue;
        vertical-align:middle;
        font-size:12px;
        margin-right: 0.137rem;
      }
      .username {
        font-size: 12px;
      }
      .iconjiantou1 {
        position: absolute;
        right: 0.383rem;
        top: 35px;
        color: #c3aba1;
      }
      p {
        font-size: 0.328rem;
        color: #c3aba1;
      }
    }
  }
  .list {
    padding-left: 0.546rem;
    font-size: 14px;
    padding-bottom: 0.546rem;
    li {
      padding: 0.41rem 0px;
      border-bottom: 1px solid #e4e4e4;
      span {
        font-size: 12px;
        display: inline-block;
        width: 2.322rem;
        margin-left: 5.137rem;
        color: #c3aba1;
        i {
          float: right;
        }
      }
      &:nth-child(4) span {
        margin-left: 5.874rem;
      }
    }
  }
}
</style>