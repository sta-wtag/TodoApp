<template>
  <div class="primary-background height-screen flex-box">
    <div class="align-self-center content relative-position">
      <div class="icon-anim"></div>
      <div class="flex-box">
        <SplashIcon class="align-self-center icon-size" />
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
@media only screen and (min-width: 1200px) {
  .splash-text {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 96px;
    line-height: 112px;
    color: $primary-text;
  }
}
@media only screen and (min-width: 992px) and (max-width: 1199px) {
  .splash-text {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 96px;
    line-height: 112px;
    color: $primary-text;
  }
}
@media only screen and (min-width: 768px) and (max-width: 991px) {
  .splash-text {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 96px;
    line-height: 112px;
    color: $primary-text;
  }
}
@media only screen and (max-width: 767px) and (min-width: 577px) {
  .splash-text {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 96px;
    line-height: 112px;
    color: $primary-text;
  }
}

@media only screen and (max-width: 576px) and (min-width: 376px) {
  .icon-size {
    width: 50px;
  }
  .splash-text {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 40px;
    line-height: 112px;
    color: $primary-text;
    margin-top: 20px;
  }
}
@media only screen and (max-width: 375px) and (min-width: 281px) {
  .icon-size {
    width: 50px;
  }
  .splash-text {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 40px;
    line-height: 112px;
    color: $primary-text;
    margin-top: 20px;
  }
}
@media only screen and (max-width: 280px) {
  .icon-size {
    width: 50px;
  }
  .splash-text {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 40px;
    line-height: 112px;
    color: $primary-text;
    margin-top: 20px;
  }
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
