<template>
  <div>
    <SplashScreen v-if="showHideSpinner" />
    <div v-else>
      <TheHeader />
      <Nuxt />
    </div>
  </div>
</template>
<script>
import SplashScreen from '@/components/splashScreen.vue';
export default {
  name: 'Default',
  components: {
    SplashScreen,
  },
  data() {
    return {
      showHideSpinner: true,
    };
  },

  beforeCreate() {
    this.showHideSpinner = true;
  },
  mounted() {
    setTimeout(() => {
      this.showHideSpinner = false;
    }, 3000);
  },
};
</script>
