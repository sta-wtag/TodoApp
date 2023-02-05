<template>
  <div class="main-div flex-box">
    <div class="align-self-center content">
      <div class="flex-box">
        <SplashIcon class="align-self-center" />
        <div class="splash-text margin-left-28">TODOS</div>
      </div>
    </div>
  </div>
</template>
<script>
import SplashIcon from '@/assets/svg/SplashIcon.svg';
export default {
  components: {
    SplashIcon,
  },
  layout: 'splash',
  mounted() {},
};
</script>
<style lang="scss">
.splash-text {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 96px;
  line-height: 112px;
  color: $primary-text;
}
</style>
