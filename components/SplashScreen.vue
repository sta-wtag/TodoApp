<template>
  <div class="primary-background splash-screen">
    <SplashIcon />
    <span class="splash-text margin-left-7">TODOS</span>
  </div>
</template>
<script>
import SplashIcon from '@/assets/svg/SplashIcon.svg';
export default {
  components: {
    SplashIcon,
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

@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.splash-screen {
  display: flex;
  height: 100vh;
  width: 100%;
  justify-content: center;
  flex-wrap: nowrap;
  align-items: center;
  animation-name: fade;
  animation-duration: 2s;
  animation-iteration-count: 1;
}
</style>
