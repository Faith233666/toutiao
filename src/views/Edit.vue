<template>
  <div class="box">
    <div class="top">
      <i class="iconfont iconjiantou2"></i>
      <span>编辑资料</span>
    </div>
    <div class="head">
      <span>
        <img src="../assets/80296589_p0_master1200.jpg" alt />
      </span>
    </div>
    <Editbar v-for='(item,index) in rows' :key='index' :label='item.label' :tips='item.tips'></Editbar>
  </div>
</template>

<script>
import Editbar from "@/components/Editbar";
export default {
  data()
  {
    return{
      rows:[
        {label:'昵称',tips:'火星网友'},
        {label:'密码',tips:'******'},
        {label:'性别',tips:'男'},
      ]
    }
  },
  components: {
    Editbar
  }
};
</script>

<style lang='less' scoped>
.box {
  .top {
    font-size: 0.389rem;
    align-items: center;
    font-weight: bold;
    display: flex;
    padding: 0.278rem 0rem;
    padding-left: 0.278rem;
    text-align: center;
    span {
      flex: 1;
    }
  }
  .head {
    text-align: center;
    img {
      width: 1.972rem;
      height: 1.972rem;
      border-radius: 50%;
      margin-left: 0.5rem;
    }
  }
}
</style>