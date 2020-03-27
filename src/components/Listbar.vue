<template>
  <router-link to='#'>
    <li>
      {{label}}
      <span>
       {{tips}}
        <i class="iconfont iconjiantou1"></i>
      </span>
    </li>
  </router-link>
</template>

<script>
export default {
  props:['label','tips']
};
</script>
<style>
</style>