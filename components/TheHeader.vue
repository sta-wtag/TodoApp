<template>
  <div class="header">
    <div>
      <NavLogo />
      <span class="header-text">Todos</span>
    </div>

    <div class="flex-box">
      <div
        id="search-icon"
        class="align-self-center margin-right-19"
        @click="setSearch"
      >
        <SearchIcon />
      </div>
      <input
        v-if="search"
        id="searchInputField"
        v-model="searchText"
        class="margin-right-19"
        @keyup.prevent="debounced"
      />

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
import debounce from '@/helpers/debounce.js';
export default {
  name: 'TheHeader',
  components: {
    NavLogo,
    SearchIcon,
  },
  data() {
    return {
      search: false,
      searchText: '',
      debounced: null,
    };
  },
  computed: {
    ...mapGetters({
      locales: 'lang/getLocals',
      currentLocale: 'lang/getCurrentLocale',
      isSearching: 'todos/getIsSearching',
    }),
  },
  mounted() {
    this.$i18n.setLocale(this.currentLocale.code);
    this.debounced = debounce(this.searchTask, 500);
  },
  methods: {
    switchLanguage(event) {
      this.$store.dispatch('lang/setLocale', event.target.value);
      this.$i18n.setLocale(event.target.value);
    },
    async searchTask() {
      this.$store.dispatch('todos/setIsSearching', true);
      await this.$store.dispatch('todos/setSearchText', this.searchText);
      this.$store.dispatch('todos/filterTaskList');
      this.$store.dispatch('todos/setIsSearching', false);
      this.$store.dispatch('todos/resetLimit');
      this.$store.dispatch('todos/setTotalPage');
    },
    async setSearch() {
      this.search = !this.search;
      await this.$store.dispatch('todos/setIsSearching', false);

      if (document.getElementById('searchInputField')) {
        document.getElementById('searchInputField').focus();
      }
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
