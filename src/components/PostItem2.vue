<template>
  <div class="PostItem2">
  <div class="star">
        <div class="plan2">
        <p>林志玲穿透视黑纱裙米兰看秀腹部微隆显孕味</p>
        <img
          src="../assets/80296589_p0_master1200.jpg"
          v-for="(item,index) in [1,1,1]"
          :key="index"
        />
        <span>火星时报 52跟帖</span>
      </div>
  </div>
  </div>
</template>

<script>
export default {

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