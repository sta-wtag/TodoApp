<template>
  <div class="main-div relative-position">
    <div class="title-text">{{ $t('PageTitle') }}</div>
    <div class="space-between flex-box margin-top-28 margin-bottom-34">
      <div>
        <button
          class="create-button text-button flex-box"
          :disabled="isSearching"
          @click="showAddTodoCard"
        >
          <PlusIcon class="align-self-center margin-right-5" />
          {{ $t('create') }}
        </button>
      </div>
      <FilterComponent :options="filterOptions" />
    </div>
    <div class="list-div">
      <form v-if="showAddCard" @submit.prevent="submitForm">
        <div class="card">
          <textarea id="taskDescription" v-model="taskDescription"></textarea>
          <label v-if="titleInputError" for="taskDescription">
            {{ $t('validation.todo.title.required') }}
          </label>
          <div class="flex-box">
            <button class="add-button" type="submit">
              {{ $t('AddTask') }}
            </button>
            <div class="margin-top-13" @click="clearField()">
              <DeleteIcon />
            </div>
          </div>
        </div>
      </form>
      <div v-for="task in todoList" :key="task.id">
        <TaskCard :card-data="task" />
      </div>

      <div v-if="isSearching" class="load-overlay">
        <div class="spin-icon">
          <LoadingIcon />
        </div>
      </div>
    </div>
    <div class="center-item">
      <button
        v-if="loadMoreTask"
        class="load-button text-button"
        @click="loadMore"
      >
        {{ $t('load-more') }}
      </button>
      <button
        v-if="showLessTask"
        class="load-button text-button"
        @click="showLess"
      >
        {{ $t('show-less') }}
      </button>
    </div>
    <div v-if="hasNoTask" class="wrapper">
      <div class="content">
        <div class="center-item">
          <NoTaskLogo />
        </div>
        <div class="info-text margin-top-32">
          {{ $t('NoTask') }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex';
import { LIMIT, SUCCESS, ERROR } from '../constants';

import FilterComponent from '@/components/buttons/FilterComponent.vue';
import DeleteIcon from '@/components/buttons/DeleteIcon.vue';
import PlusIcon from '@/assets/svg/plusIcon.svg';
import NoTaskLogo from '@/assets/svg/noTask.svg';
import LoadingIcon from '@/components/buttons/LoadingIcon.vue';
import global from '@/mixins/global';

export default {
  name: 'IndexPage',
  components: {
    DeleteIcon,
    FilterComponent,
    NoTaskLogo,
    PlusIcon,
    LoadingIcon,
  },
  mixins: [global],
  data: () => ({
    titleInputError: false,
    titleErrorMsg: '',
    showAddCard: false,
    taskDescription: '',
  }),
  computed: {
    ...mapGetters('todos', {
      todoList: 'getListPerPage',
      totalPage: 'getTotalPage',
      filterOptions: 'getFilterOptions',
    }),
    ...mapState('todos', {
      perPage: 'perPage',
      page: 'page',
      isSearching: 'isSearching',
    }),
    hasNoTask() {
      return this.todoList && this.todoList.length <= 0;
    },
    loadMoreTask() {
      return !this.hasNoTask && this.page < this.totalPage;
    },
    showLessTask() {
      return (
        !this.hasNoTask &&
        this.page >= this.totalPage &&
        this.page !== 1 &&
        this.todoList.length > LIMIT
      );
    },
  },
  mounted() {
    this.$store.dispatch('todos/setTotalPage');
    this.$store.dispatch('todos/setActiveFilterOption', this.filterOptions[0]);
    this.$store.dispatch('todos/filterTaskList');
  },
  methods: {
    showAddTodoCard() {
      this.$store.dispatch('todos/setSearchText', '');
      this.$store.dispatch('todos/setShowSearchField', false);
      this.showAddCard = true;
    },
    submitForm(e) {
      e.preventDefault();
      this.taskDescription = this.sanitizeInput(this.taskDescription);

      if (!this.$helper.checkForm(this.taskDescription)) {
        this.titleInputError = true;
        this.titleErrorMsg = 'Field is empty';
        this.triggerToast(ERROR);

        return;
      }

      this.addTask();
    },
    addTask() {
      this.$store.dispatch('todos/addTask', this.taskDescription);
      this.$store.dispatch('todos/setTotalPage');
      this.triggerToast(SUCCESS);
      this.clearField();
    },
    clearField() {
      this.showAddCard = false;
      this.titleInputError = false;
      this.titleErrorMsg = '';
      this.taskDescription = '';
    },
    loadMore() {
      this.$store.dispatch('todos/increaseLimit');
    },
    showLess() {
      this.$store.dispatch('todos/resetLimit');
    },
  },
};
</script>
<style lang="scss">
html,
body {
  margin: 0px;
  width: 100%;
  height: 100%;
}
.main-div {
  height: 100vh;
  background-color: red;
  padding: 62px 149px;
  background-color: $base-color;
}
.add-button {
  margin-right: 19px;
  margin-top: 13px;
}
.center-item {
  display: flex;
  justify-content: center;
}
.list-div {
  display: grid;
  row-gap: 34px;
  column-gap: 54px;
  grid-template-columns: auto auto auto;
  padding: 10px;
}
.wrapper {
  align-items: center;
  display: flex;
  height: calc(100% - (70px + 70px));
}
.content {
  margin: auto;
  width: 500px;
}

.load-button {
  background: $button-background;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 9px 18px;
  cursor: pointer;
  margin: 57px 0px;
}
.create-button {
  background: $primary-text;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 9px 20px;
  cursor: pointer;
}
</style>
