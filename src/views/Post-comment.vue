<template>
  <div class="box">
    <VmTop title="精彩跟帖"></VmTop>
    <!-- list列表 组件 -->
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
          <p>{{moment(item.create_date).fromNow()}}</p>
        </div>
        <span class="speak" @click="replyClick(item)">回复</span>
      </div>
      <!-- 这是回复 -->
      <FloorComment :data='item.parent' v-if='item.parent' @reply='replyClick'></FloorComment>
      <div class="content">
        <p>{{item.content}}</p>
      </div>
    </div>
    </van-list>
    <div class='leave'>
   <!-- Field输入框 组件 -->
    <van-field
    rows="1"
    autosize
    type="textarea"
    placeholder='发布评论'
    ref="textarea"
    @click.native='show=true'
  />
  <van-action-sheet v-model="show" title="留言" class="dialog">
  <div class="content">
     <van-field class="field"
    v-model="message"
    rows="1"
    autosize
    type="textarea"
    :placeholder='reply.user?"@回复 "+reply.user.nickname:"发布评论"'
    ref="textarea"
   />
    <button @click='btnclick'>发布</button>
    </div>
   </van-action-sheet> 
    </div>
  </div>
</template>

<script>
import VmTop from "@/components/VmTop";
import FloorComment from '@/components/FloorComment'
import moment from 'moment';
moment.locale('zh-CN');
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
      moment,
      reply:{},
      show: false,
      value:"",
    }
  },
  mounted() {
    //获取id和token保存到data中，请求评论列表数据
    let { id } = this.$route.params;
    let {token}=JSON.parse(localStorage.getItem('userInfo'))||{};
    this.token=token;
    this.pid = id;
    this.getList();
  },
  watch:{
     show()
     {
        if(this.show==false)
        {
          this.message="";
          this.reply={};
        }
     }
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
      //合并多页请求的数据
      this.post =[...this.post,...data];
      //停止加载
      this.loading=false;
      //当一页加载数小于5的时候，结束加载
      if(data.length<5)
      {
        this.finished=true;
      }
    });
    },
     onLoad()
     {
       //一页加载完毕后继续加载
       this.getList();
     },
     btnclick()
     {
       //当回复内容为空的时候，跳出函数
       if(this.message.trim()=="") return;
       let config={ content:this.message}
        //判断是否有reply楼层回复数据
       if(this.reply)
        {
           config.parent_id=this.reply.id;
        }
        this.$axios({
          method:'post',
          url:"/post_comment/"+this.pid,
          headers:{
            Authorization:this.token
          },
          data: config
        }).then(res=>{
          this.$toast.success('发布成功');
          //初始化页数
          this.pageIndex=1;
          //初始化完成状态
          this.finished=false;
          //清空post，防止评论合并后重复
          this.post=[];
          //关闭弹出框
          this.show=false;
          this.getList();
        })
     },
     replyClick(item)
     {
       //因为点击的时候失去了焦点，触发了失去焦点事件，所以要定时器
        setTimeout(() => {
        //获取回复的对象
        this.reply=item;
        this.show=true;
        }, 200);
     }
  },
  components: {
    //注册组件
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
  }
}
 .dialog .content {
  display: flex;
  padding: 16px;
  align-items: center;
  .field{
    flex: 1;
  }
  button{
     margin-left: 10px;
     width: 60px;
     height: 30px;
     border-radius: 10px;
     background: red;
     color: white;
     padding:5px;
     flex-shrink: 0;
  }
}
</style>