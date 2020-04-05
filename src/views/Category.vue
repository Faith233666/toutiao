<template>
   <div class="box">
       <VmTop title="栏目管理"></VmTop>
       <div class="dellist">
         <p>点击删除以下频道</p>
         <ul class="list" >
             <li v-for="(item,index) in addlist" :key="index" :class="['关注','头条'].includes(item.name)?'active':''" 
             @click='addClick(item,index)'>{{item.name}}</li>
         </ul>
       </div>
       <div class="addlist">
         <p>点击添加以下频道</p>
         <ul class="list">
            <li v-for="(item,index) in dellist" :key="index"  @click='delClick(item,index)'>{{item.name}}</li>
         </ul>
       </div>
   </div>
</template>

<script>
import VmTop from '@/components/VmTop';
export default {
  data()
  {
    return{
      categories:"",
      addlist:"",
      dellist:""
    }
  },
  mounted()
  {
     let categories=JSON.parse(localStorage.getItem('categories'));
     this.categories=categories;
     let addlist=categories.filter(item=>{
       return item.is_top==1;
     })
     let dellist=categories.filter(item=>{
       return item.is_top==0;
     })
     this.addlist=addlist;
     this.dellist=dellist;
  },
  destroyed()
  {
     this.categories=[...this.addlist,...this.dellist,this.categories[this.categories.length-1]];
     localStorage.setItem('categories',JSON.stringify(this.categories));
  },
  methods:{
    addClick(item,index)
    {
      if(item.name=='关注'||item.name=='头条') return;
      const del=this.addlist.splice(index,1);
      item.is_top=0;
      this.dellist.push(del[0]);
      
    },
    delClick(item,index)
    {
      const del=this.dellist.splice(index,1);
      item.is_top=1;
      this.addlist.push(del[0]);
    }
  },
  components:{
    VmTop
  }
}
</script>

<style lang='less' scoped>
@vw:3.6vw;
.box{
  .active{
    color:grey;
  }
  padding: 10/@vw;
  p{
   margin: 10/@vw;
    font-size:14/@vw;
  }
.list{
    display: flex;
    flex-wrap: wrap;
    li{
      margin: 5/@vw 15/@vw;
      text-align: center;
      font-size: 16/@vw;
      padding:5/@vw 10/@vw;
      border: 1px solid black;
    }
  }
}
</style>