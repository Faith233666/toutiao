<template>
<router-link :to="'/post/'+data.id">
  <div class="PostItem2">
  <div class="star">
        <div class="plan2">
        <p>{{data.title}}</p>
        <img
          :src="$axios.defaults.baseURL+item.url"
          v-for="(item,index) in data.cover"
          :key="index"
        />
        <span>{{data.user.nickname}} {{data.comment_length}}跟帖</span>
      </div>
  </div>
  </div>
</router-link>
</template>

<script>
export default {
 props:['data']
}
</script>

<style lang='less' scoped> 
.PostItem2 {
  font-size: 14/360 * 100vw;
  .star {
    padding: 10/360 * 100vw;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e4e4e4;
    .plan2 {
      p {
        margin-bottom: 10/360 * 100vw;
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
      img {
        width: 32%;
        height: 60/360 * 100vw;
        object-fit: cover;
        vertical-align: middle;
        flex-shrink: 0;
        &:nth-of-type(2) {
          margin: 0 2px;
        }
      }
      span {
        display: block;
        margin-top: 10/360 * 100vw;
        font-size: 12/360 * 100vw;
        color: #8c8989;
      }
    }
  }
}
</style>