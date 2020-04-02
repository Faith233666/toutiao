<template>
  <div class="PostItem3">
  <div class="star">
      <div class="plan3">
        <p>{{data.title}}</p>
        <div class="video">
          <div class="shipin"><i class='iconfont iconshipin'></i></div>
         <img :src="$axios.defaults.baseURL+data.cover[0].url" alt="">
        </div>
        <span>火星时报 52跟帖</span>
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
.PostItem3 {
  font-size: 14/360 * 100vw;
  .star {
    padding: 10/360 * 100vw;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e4e4e4;
  .plan3 {
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
      .video{
        position: relative;
        .shipin{
          position: absolute;
          top:50%;
          left:50%;
          transform: translateX(-25/360*100vw) translateY(-25/360*100vw);
          width: 50/360*100vw;
          height: 50/360*100vw;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(0,0,0,0.2);
          border-radius: 50%;
          i{
            font-size: 35/360*100vw;
            color: white;
          }
        }
        img{
          width: 100%;
          height: 140/360*100vw;
          object-fit: cover;
        }
      }
      span{
          display: block;
        margin-top: 10/360 * 100vw;
        font-size: 12/360 * 100vw;
        color: #8c8989;
      }
    }
  }
}
</style>