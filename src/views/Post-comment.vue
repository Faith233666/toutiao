<template>
  <div class="box">
    <VmTop title="精彩跟帖"></VmTop>
    <van-list
    v-model="loading"
    :finished="finished"
    :immediate-check=false
    finished-text="没有更多了"
    @load="onLoad"
    >
    <div class="comment" v-for='(item,index) in post' :key='index'>
      <div class="parents">
        <img :src="$axios.defaults.baseURL+item.user.head_img" alt />
        <div class="user-info">
          <h4>{{item.user.nickname}}</h4>
          <p>2小时前</p>
        </div>
        <span class="speak">回复</span>
      </div>
      <!-- 这是回复 -->
      <FloorComment :data='item.parent' v-if='item.parent'></FloorComment>
      <div class="content">
        <p>{{item.content}}</p>
      </div>
    </div>
    </van-list>
    <div class='leave'>
    <van-field
    v-model="message"
    rows="1"
    :autosize='isFocus'
    type="textarea"
    placeholder="发布评论"
    @blur="blurClick()"
    @focus="focusClick()"
  
  />
    <button v-if='!isFocus'>发布</button>
    </div>
  </div>
</template>

<script>
import VmTop from "@/components/VmTop";
import FloorComment from '@/components/FloorComment'
export default {
  data() {
    return {
      pid: "",
      token: "",
      post: "",
      loading:false,
      finished:false,
      pageIndex:1,
      message:"",
      isFocus:true,
    };
  },
  mounted() {
    let { id } = this.$route.params;
    this.pid = id;
    this.getList();
  },
  methods:{
    getList()
    {
      const pageIndex=this.pageIndex;
      this.pageIndex+=1;
      this.$axios({
      url: "/post_comment/"+this.pid,
      params:{
       pageIndex:pageIndex,
       pageSize:5
      },
    }).then(res => {
      const {data}=res.data;
      this.post =[...this.post,...data];
      this.loading=false;
      if(data.length<5)
      {
        this.finished=true;
      }
    });
    },
     onLoad()
     {
       this.getList();
     },
     focusClick()
     {
       this.isFocus=false;
     },
     blurClick()
     {
      this.isFocus=true;
     }
  },
  components: {
    VmTop,
    FloorComment
  }
};
</script>

<style lang='less' scoped>
@vw: 3.6vw;
.box {
  font-size: 14 / @vw;
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
  .leave{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    position: fixed;
    left:0;
    bottom:0;
   .van-field
   {
     background:#f5f0f0;
   }
   button{
    padding: 5/@vw 10/@vw;
    margin-left: 10px;
    flex-shrink: 0;
    border-radius: 50px;
    background: red;
    color:white;
   
     
   }
  }
}
</style>