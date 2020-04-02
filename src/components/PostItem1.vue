<template>
  <div class="PostItem1">
  <div class="star">
      <div class="plan1">
        <div>
          <p>{{data.title}}</p>
          <span>{{data.user.nickname}} {{data.comment_length}}跟帖</span>
        </div>
        <img :src="$axios.defaults.baseURL+data.cover[0].url" alt />
      </div>
  </div>
  </div>
</template>

<script>
export default {
 props:['data']
}
</script>

<style lang='less' scoped> 
.PostItem1 {
  font-size: 14/360 * 100vw;
  .star {
    padding: 10/360 * 100vw;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e4e4e4;
    .plan1 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      div {
        p {
          margin-bottom: 10px;
          /*1. 超出的部分隐藏 */
          overflow: hidden;
          /*2. 文字用省略号替代超出的部分 */
          text-overflow: ellipsis;
          /* 3. 弹性伸缩盒子模型显示 */
          display: -webkit-box;
          /* 4. 限制在一个块元素显示的文本的行数 */
          -webkit-line-clamp: 2;
          /* 5. 设置或检索伸缩盒对象的子元素的排列方式 */
          -webkit-box-orient: vertical;
        }
        span {
          font-size: 12/360 * 100vw;
          color: #8c8989;
        }
      }
      img {
        width: 130/360 * 100vw;
        height: 80/360 * 100vw;
        object-fit:cover;
        margin-left: 8px;
        flex-shrink: 0;
      }
    }
  }
}
</style>