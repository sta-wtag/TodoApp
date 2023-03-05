<template>
  <div class="header">
    <div class="header-padding flex-box space-between">
      <div class="flex-box">
        <NavLogo class="align-self-center" />
        <span class="header-text header-text-small">Todos</span>
      </div>

      <div class="flex-box">
        <input
          v-if="showSearchInput"
          ref="searchInputField"
          v-model="searchText"
          class="input-search text-search"
          @keyup.prevent="debounced"
        />
        <div
          id="search-icon"
          class="align-self-center search-icon"
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
            {{ locale.code }}
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
  watch: {
    showSearchInput(val) {
      if (!val) {
        this.searchText = '';
      }
    },
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
      await this.$store.dispatch('todos/setSearchText', this.searchText); // await used to mimic api call and show
      this.$store.dispatch('todos/filterTaskList');
      this.$store.dispatch('todos/setIsSearching', false);
      this.$store.dispatch('todos/resetLimit');
      this.$store.dispatch('todos/setTotalPage');
    },
    setSearch() {
      this.search = !this.search;

      this.$store.dispatch('todos/setShowSearchField', this.search);

      if (this.search) {
        this.$nextTick(() => {
          // $nextTick allows you to execute code after you have changed some data and Vue.js has updated the virtual DOM based on your data change, but before the browser has rendered that change on the page.
          // Let's say you changed some data; Vue then updates the vDOM based on that data change (the changes are not yet rendered to the screen by the browser).
          // If you used nextTick at this point, your callback would get called immediately, and the browser would update the page after that callback finished executing.
          // If you instead used setTimeout, then the browser would have a chance to update the page, and then your callback would get called.
          this.$refs.searchInputField.focus();
        });
      }
    },
  },
};
</script>
<style lang="scss">
.header {
  text-align: center;
  background-color: white;
  border-bottom: 1px solid $border-primary;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 1;
}
select {
  width: 40px;
  border: none;
  background-color: white;
  color: $button-background;
}

option {
  position: absolute;
  left: 0;
}

@media only screen and (min-width: 1200px) {
  .header-padding {
    margin: 15px 150px;
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
  .input-search {
    width: 518px;
    height: 36px;
    padding: 0px 12px;
    border: 3px solid #d1d8ff;
    border-radius: 5px;
    margin-right: 20px;
  }
  .search-icon {
    margin-right: 20px;
  }
}
@media only screen and (min-width: 992px) and (max-width: 1199px) {
  .header-padding {
    margin: 15px 150px;
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
  .input-search {
    width: 318px;
    height: 36px;
    padding: 0px 12px;
    border: 3px solid #d1d8ff;
    border-radius: 5px;
    margin-right: 20px;
  }
  .search-icon {
    margin-right: 20px;
  }
}
@media only screen and (min-width: 768px) and (max-width: 991px) {
  .header-padding {
    margin: 15px 80px;
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
  .input-search {
    width: 250px;
    height: 36px;
    padding: 0px 12px;
    border: 3px solid #d1d8ff;
    border-radius: 5px;
    margin-right: 20px;
  }
  .search-icon {
    margin-right: 20px;
  }
}
@media only screen and (max-width: 767px) and (min-width: 577px) {
  .header-padding {
    margin: 15px 60px;
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
  .input-search {
    width: 120px;
    height: 36px;
    padding: 0px 12px;
    border: 3px solid #d1d8ff;
    border-radius: 5px;
    margin-right: 14px;
  }
  .search-icon {
    margin-right: 14px;
  }
}

@media only screen and (max-width: 576px) and (min-width: 376px) {
  .header-padding {
    margin: 15px 16px;
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
  .input-search {
    width: 120px;
    height: 36px;
    padding: 0px 12px;
    border: 3px solid #d1d8ff;
    border-radius: 5px;
    margin-right: 14px;
  }
  .search-icon {
    margin-right: 14px;
  }
}
@media only screen and (max-width: 375px) {
  .header-padding {
    margin: 15px 16px;
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
  .input-search {
    width: 80px;
    height: 36px;
    padding: 0px 12px;
    border: 3px solid #d1d8ff;
    border-radius: 5px;
    margin-right: 14px;
  }
  .search-icon {
    margin-right: 14px;
  }
}
</style>
