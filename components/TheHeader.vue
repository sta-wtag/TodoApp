<template>
  <div class="header">
    <div>
      <NavLogo />
      <span class="header-text">Todos</span>
    </div>

    <div class="flex-box">
      <div id="search-icon">
        <SearchIcon />
      </div>
      <select @change="switchLanguage">
        <option value="" disabled>{{ $t('SelectLanguage') }}</option>
        <option
          v-for="locale in locales"
          :key="locale.code"
          :value="locale.code"
        >
          {{ locale.name }}
        </option>
      </select>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import NavLogo from '@/assets/svg/navLogo.svg';
import SearchIcon from '@/assets/svg/searchIcon.svg';
export default {
  name: 'TheHeader',
  components: {
    NavLogo,
    SearchIcon,
  },
  data() {
    return {
      searchTask: '',
    };
  },
  computed: {
    ...mapGetters({
      locales: 'lang/getLocals',
      currentLocale: 'lang/getCurrentLocale',
    }),
  },
  mounted() {
    this.$i18n.setLocale(this.currentLocale.code);
  },
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
  color: $primary-text;
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
