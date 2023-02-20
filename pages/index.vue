<template>
  <div class="primary-background height-screen flex-box">
    <div class="align-self-center content relative-position">
      <div class="icon-anim"></div>
      <div class="flex-box">
        <SplashIcon class="align-self-center" />
        <div class="splash-text margin-left-7">TODOS</div>
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
  mounted() {
    setTimeout(() => {
      this.$router.push('/home');
    }, 3000);
  },
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
.icon-anim {
  background: $base-color;
  position: absolute;
  width: 600px;
  height: 300px;
  animation-name: fade;
  animation-duration: 5000ms;
  animation-iteration-count: 1;
}
@keyframes fade {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
