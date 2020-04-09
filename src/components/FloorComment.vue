<template>
    <div class="son">
        <FloorComment :data='data.parent' v-if='data.parent'></FloorComment>
        <div class="comment active">
          <div class="parents">
            <div class="user-info">
              <h4>{{data.user.nickname}}</h4>
              <p>2小时前</p>
            </div>
            <span class="speak">回复</span>
          </div>
          <div class="content">
            <p>{{data.content}}</p>
          </div>
        </div>
      </div>
</template>

<script>
export default {
  name:'FloorComment',
  props:['data']
}
</script>

<style lang='less' scoped>
  .son{
    @vw:3.6vw;
    .active {
    background: rgba(210, 209, 209, 0.5);
  }
  .comment {
    padding: 15 / @vw 10 / @vw;
    border-bottom: 1px solid #eee;
    .parents {
      display: flex;
      justify-content: space-between;
      align-items: center;

      img {
        width: 25 / @vw;
        height: 24 / @vw;
        border-radius: 50%;
        object-fit: cover;
        margin-right: 10 / @vw;
      }
      .user-info {
        flex: 1;
        p {
          font-size: 12 / @vw;
          color: #a5a4a1;
        }
      }
      span {
        font-size: 12 / @vw;
        color: #a5a4a1;
      }
    }
    .content {
      padding-top: 15 / @vw;
    }
  }
  }
</style>