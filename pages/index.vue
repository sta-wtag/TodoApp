<template>
  <div class="mainDiv">
    <TaskCard />
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  layout: 'default'
}
</script>
<style lang="scss">
  .mainDiv{
    width: 100%;
    height: 100vh;
    padding: 62px 149px;
    overflow:hidden;
    background-color: $base-color;
  }
  
</style>
