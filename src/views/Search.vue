<template>
  <div class="box">
      <div class="searchKey" :style="toggle==false?'display:none':'display:block'">
        <ul>
          <li>美女的妙用<i class="iconfont iconjiantou1"></i></li>
          <li>美女的妙用<i class="iconfont iconjiantou1"></i></li>
          <li>美女的妙用<i class="iconfont iconjiantou1"></i></li>
        </ul>
      </div>
      <div class="header">
      <div class="logo">
        <i class="iconfont iconjiantou2"></i>
      </div>
      <div class="search">
        <i class="iconfont iconsearch"></i>
        <input type="text" @focus='focusClick' @blur='blurClick'>
      </div>
         <span>搜索</span>
    </div>
    <div class="history">
     <h5>历史记录</h5>
     <ul>
       <li>美女</li>
       <li>美女</li>
       <li>美女</li>
       <li>美女</li>
       <li>美女</li>
       <li>美女</li>
       <li>美女</li>
       <li>美女</li>
       <li>美女</li>
       <li>美女</li>
       <li>美女</li>
       <li>美女</li>
       <li>美女</li>
       <li>美女</li>
       <li>美女</li>
       <li>美女</li>
       <li>美女</li>
     </ul>
    </div>
</div>
</template>

<script>
export default {
data()
{
  return{
    toggle:false
  }
},
methods:{
  focusClick()
  {
    this.toggle=true;
  },
  blurClick()
  {
    this.toggle=false;
  }
}
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