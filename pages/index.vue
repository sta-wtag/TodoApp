<template>
  <div class="primary-background wrapper-div1">
    <div v-if="isListLoading">
      <splach-screen />
    </div>
    <div v-else class="height-full">
      <Header />
      <TaskContainer />
      <div v-if="isSearching" class="load-overlay flex-box">
        <LoadingIconLg class="spin-icon align-self-center" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex';
import LoadingIconLg from '@/assets/svg/LoadingIconLg.svg';
export default {
  name: 'IndexPage',
  components: {
    LoadingIconLg,
  },
  layout: 'default',
  computed: {
    ...mapGetters({ isListLoading: 'todos/getIsListLoading' }),
    ...mapState('todos', {
      isSearching: 'isSearching',
    }),
  },
  async beforeCreate() {
    await this.$store.dispatch('todos/setIsListLoading', true);
    this.$store.dispatch('todos/resetFilter');
    this.$store.dispatch('todos/setTodoList');
  },
};
</script>
<style>
@media only screen and (min-width: 1200px) {
  .wrapper-div {
    padding-top: 124px;
  }
}
@media only screen and (min-width: 992px) and (max-width: 1199px) {
  .wrapper-div {
    padding-top: 124px;
  }
}
@media only screen and (min-width: 768px) and (max-width: 991px) {
  .wrapper-div {
    padding-top: 124px;
  }
}
@media only screen and (max-width: 767px) and (min-width: 577px) {
  .wrapper-div {
    padding-top: 124px;
  }
}

@media only screen and (max-width: 576px) and (min-width: 376px) {
  .wrapper-div {
    padding-top: 88px;
  }
}
@media only screen and (max-width: 375px) and (min-width: 281px) {
  .wrapper-div {
    padding-top: 88px;
  }
}
@media only screen and (max-width: 280px) {
  .wrapper-div {
    padding-top: 88px;
  }
}
</style>
