<template>
  <div class="header">
    <div class="header-padding flex-box space-between">
      <div class="flex-box">
        <NavLogo class="align-self-center" />
        <span class="header-text header-text-small">Todos</span>
      </div>

      <div class="display-only">
        <input
          v-if="showSearchInput"
          id="searchInputField"
          v-model="searchText"
          class="margin-right-5 input-search text-search"
          @keyup.prevent="debounced"
        />
        <div
          id="search-icon"
          class="align-self-center margin-right-5"
          @click="setSearch"
        >
          <SearchIcon />
        </div>

        <select class="text-button" @change="switchLanguage">
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
      showSearchInput: 'todos/getShowSearchField',
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
      await this.$store.dispatch('todos/setShowSearchField', this.search);

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> parent of b40413b (Merge branch 'features/styleTaskCard' into features/styleTaskList)
      await this.$store.dispatch('todos/setShowSearchField', this.search);

      if (this.$refs.searchInputField) {
        this.$refs.searchInputField.focus();
<<<<<<< HEAD
=======
      if (document.getElementById('searchInputField')) {
        document.getElementById('searchInputField').focus();
>>>>>>> parent of 5534b5c (Merge branch 'features/styleTaskList' into features/integrateSupabase)
=======
>>>>>>> parent of b40413b (Merge branch 'features/styleTaskCard' into features/styleTaskList)
      }
    },
  },
};
</script>
<style lang="scss">
select {
  padding: 0px 12px;
  border: 1px solid $border-primary;
  border-radius: 5px;
  background-color: white;
  color: $button-background;
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
.input-search {
  width: 518px;
  height: 36px;
  padding: 0px 12px;
  border: 3px solid #d1d8ff;
  border-radius: 5px;
}
.header {
  text-align: center;
  background-color: white;
  border-bottom: 1px solid $border-primary;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 1;
}
@media only screen and (min-width: 768px) {
  .header-padding {
    margin: 15px 150px;
  }

  .display-only {
    display: flex;
  }
  .header-text {
    font-family: Roboto;
    font-size: 36px;
    font-weight: 700;
    line-height: 42.19px;
    letter-spacing: 0em;
    text-align: left;
    color: $primary-text;
    margin-left: 14px;
  }
}
@media only screen and (max-width: 400px) {
  .header-padding {
    margin: 15px 16px;
  }
  .display-only {
    display: none;
  }
  .header-text-small {
    font-family: Roboto;
    font-size: 24px;
    font-weight: 700;
    line-height: 42.19px;
    letter-spacing: 0em;
    text-align: left;
    color: $primary-text;
    margin-left: 14px;
  }
}
</style>
