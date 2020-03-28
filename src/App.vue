<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
@import url("//at.alicdn.com/t/font_1426139_jm7n2373nlh.css");
@import url("../node_modules/vant/lib/index.css");
@media screen and (max-width: 680px){
  html{
        font-size: 68px;
  }
}
@media screen and (max-width: 480px){
  html{
        font-size: 48px;
  }
}
@media screen and (max-width: 360px){
  html{
        font-size: 36px;
  }
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
a {
  color: inherit;
  text-decoration: none;
}
a:hover {
  color: inherit;
}
ul,
li,
ol {
  list-style: none;
}
i,
em {
  font-style: normal;
}
</style>
