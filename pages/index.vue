<template>
  <div class="mainDiv">
    <!-- <div class="card"></div> -->
  </div>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>
<style lang="scss">
  .mainDiv{
    width: 100%;
    height: 100vh;
    overflow:hidden;
    background-color: $base-color;
  }
   .card{
      width: 100px;
      height: 100px;
      @include borderPrimary 
      
   }
</style>
