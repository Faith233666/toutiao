<template>
  <div class="box">
      <div class="searchKey" v-if='toggle'>
        <!-- <ul>
          <li>美女的妙用<i class="iconfont iconjiantou1"></i></li>
          <li>美女的妙用<i class="iconfont iconjiantou1"></i></li>
          <li>美女的妙用<i class="iconfont iconjiantou1"></i></li>
        </ul> -->
       <div v-for='(item,index) in post' :key='index'>
        <PostItem1 :data='item' v-if='item.type==1&&item.cover.length==1'></PostItem1>
        <PostItem2 :data='item' v-if='item.type==1&&item.cover.length==3'></PostItem2>
        <PostItem3 :data='item' v-if='item.type==2'></PostItem3>
       </div>
      </div>
      <div class="header">
      <div class="logo">
        <i class="iconfont iconjiantou2"></i>
      </div>
      <div class="search">
        <i class="iconfont iconsearch"></i>
        <input type="text" v-model="value" autofocus @keyup.enter='handleClick'>
      </div>
         <span @click='handleClick'>搜索</span>
    </div>
    <div class="history">
     <h5>历史记录<i @click='removeHistory'>X</i></h5>
     <ul>
       <li v-for='(item,index) in history' :key='index' @click='itemClick(item)'>{{item}}</li>  
     </ul>
    </div>
</div>
</template>

<script>
import PostItem1 from '@/components/PostItem1'
import PostItem2 from '@/components/PostItem2'
import PostItem3 from '@/components/PostItem3'
export default {
data()
{
  return{
    toggle:false,
    value:"",
    history:JSON.parse(localStorage.getItem('history'))||[],
    post:""
  }
},
watch:
{
   value()
   {
     if(this.value=="")
     {
       this.toggle=false;
     }
   }
},
methods:{
  //搜索关键字
  handleClick()
  {
    if(this.value=="")return;
     this.history.unshift(this.value);
     //数组去重
     this.history=[...new Set(this.history)];
     localStorage.setItem('history',JSON.stringify(this.history));
     this.getlist();
  },
  //清除本地的历史记录
  removeHistory()
  {
    this.history=[];
    localStorage.removeItem('history');
  },
  //点击关键字搜索
  itemClick(item)
  {
    this.value=item;
    this.getlist();
  },
  //调用接口搜索
  getlist()
  {
     this.$axios({
       url:"/post_search",
       params:{
         keyword:this.value
       }
     }).then(res=>{
       this.toggle=true;
       const {data}=res.data;
       this.post=data;
     })
  }
},
//三种规则组件
components:{
    PostItem1,
    PostItem2,
    PostItem3
  },
}
</script>

<style lang="less" scoped>
@vw:3.6vw;
.box{
   font-size: 12/@vw;
   padding:0 20/@vw;
   .searchKey{
     position: absolute;
     width: 100%;
     top:38/@vw;
     left: 0;
     bottom: 0;
     background: #eee;
    padding: 0 20/@vw;
    ul{
      li{
       display: flex;
      justify-content: space-between;
      padding: 10/@vw 0;
       border-bottom:  1px solid #d7d7d7;
      }
    
    }
   }
   .logo i{
      font-size:15/@vw;
   }
 .header{
   display: flex;
   justify-content: space-between;
   align-items: center;
   .search{
    display: flex;
     flex: 1;
     height:32/@vw;
     align-items: center;
     margin: 5px 10/@vw;
     border:1px solid #d7d7d7;
     border-radius: 50px;
     overflow: hidden;
     i{
       margin: 10/@vw;
     }
     input{
       border: none;
       outline: none;
     }
   }
 }
 .history{
   h5{
     display: flex;
     justify-content: space-between;
     margin:10/@vw 0 10/@vw;
   }
   ul{
     display: flex;
     flex-wrap: wrap;
     border-bottom: 1px solid #d7d7d7;
     li{
       margin:0 15/@vw 15/@vw 0;
       font-size: 10/@vw;
     }
   }
 }
}
</style>