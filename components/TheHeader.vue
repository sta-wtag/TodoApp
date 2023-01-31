<template>
  <div class="header">
    <div>
      <img :src="navLogo" />
      <span class="header-text">Todos</span>
    </div>

    <div class="flex-box">
      <div id="search-icon">
        <img :src="seachIcon" />
      </div>
      <select @change="switchLanguage">
        <option value="" disabled>{{ $t('SelectLanguage') }}</option>
        <option v-for="locale in locales" :key="locale.code">
          {{ locale.name }}
        </option>
      </select>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import navLogo from '@/assets/svg/navLogo.svg';
import seachIcon from '@/assets/svg/searchIcon.svg';
export default {
  name: 'TheHeader',
  data() {
    return {
      searchTask: '',
      navLogo,
      seachIcon,
    };
  },
  computed: {
    ...mapGetters({
      locales: 'lang/getLocals',
      currentLocale: 'lang/getCurrentLocale',
    }),
  },
  mounted() {},
  methods: {
    switchLanguage(event) {
      this.$store.dispatch('lang/setLocale', event.target.value);
      this.$i18n.setLocale(event.target.value);
    },
  },
};
</script>
<style lang="scss">
.header {
  text-align: center;
  display: flex;
  padding: 15px 150px;
  background-color: white;
  justify-content: space-between;
}
.header-text {
  font-family: Roboto;
  font-size: 36px;
  font-weight: 700;
  line-height: 42px;
  letter-spacing: 0em;
  text-align: left;
  color: $primaryText;
  margin-left: 14px;
}
@keyframes example {
  0% {
    right: 0px;
  }
  25% {
    right: 100px;
  }
  50% {
    right: 200px;
  }
  100% {
    right: 500px;
  }
}
.search-icon {
  position: relative;
  animation-name: example;
  animation-duration: 1s;
}
</style>
