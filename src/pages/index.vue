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
  
  @font-face {
  font-family: 'Roboto';
  src: url('../assets/fonts/Roboto-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}
 html, body {
    margin:0px;
    width:100%;
    height: 100%;
  }
  .mainDiv{
    // width:100vh;
    height: 100vh;
    background-color:red;
    padding: 62px 149px;
    background-color: $base-color;
  }
  
</style>
