<template>
  <div>
    <NaigateBar title="编辑资料" showHome="false"></NaigateBar>
    <div class="avator"> 
      <img src="../assets/80296589_p0_master1200.jpg">
    </div>
    <ListBar label='姓名' tips='火星男友'></ListBar>
    <ListBar label='密码' tips='******'></ListBar>
    <ListBar label='性别' tips='男'></ListBar>
  </div>
</template>

<script>
import NaigateBar from "@/components/NavigateBar";
import ListBar from "@/components/Listbar";
export default {
  components: {
    NaigateBar,
    ListBar
  }
};
</script>

<style lang='less' scoped>
 .avator{
   display: flex;
   justify-content: center;
   align-content: center;
   padding: .278rem 0px;
   img{
     width:1.944rem;
     height: 1.944rem;
     border-radius: 50%;
   }
 }
</style>