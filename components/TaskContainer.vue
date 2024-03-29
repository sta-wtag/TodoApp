<template>
  <div class="height-full flex-box flex-direction-column">
    <div class="main-div-padding wrapper-div">
      <div class="title-text">{{ $t('PageTitle') }}</div>
      <div class="space-between flex-box home-button">
        <button
          class="create-button text-button flex-box gap-1"
          data-testid="create-button"
          @click="showAddTodoCard"
        >
          <PlusIcon class="align-self-center margin-right-1" />
          <div class="align-self-center">{{ $t('create') }}</div>
        </button>
        <FilterComponent
          :options="filterOptions"
          @closeAddCard="closeAddCard"
        />
      </div>
      <div class="list-div grid-template-column">
        <form v-if="showAddCard" @submit.prevent="submitForm">
          <div
            ref="addButton"
            class="card padding-4"
            :class="{ 'anim-card': animcard }"
          >
            <textarea
              id="taskTitle"
              v-model="taskDescription"
              data-testid="taskTitle"
            ></textarea>
            <label
              v-if="titleErrorMsg"
              data-testid="task-error-message"
              class="inputError"
              for="taskTitle"
            >
              {{ $t('validation.todo.title.required') }}
            </label>
            <div class="flex-box margin-top-3">
              <button class="add-button" data-testid="add-button" type="submit">
                {{ $t('AddTask') }}
              </button>
              <div class="align-self-center" @click="clearField">
                <DeleteIcon />
              </div>
            </div>
          </div>
        </form>
        <div v-for="task in todoList" :key="task.id">
          <TaskCard :card-data="task" />
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
    </div>
    <div
      v-if="hasNoTask"
      class="flex-grow-1 flex-box flex-direction-column center-item no-task"
    >
      <div class="">
        <div class="center-item">
          <NoTaskLogo />
        </div>
        <div class="info-text margin-top-8 text-center">
          {{ noTaskMessage }}
        </div>
      </div>
    </div>
    <div
      v-if="hasNoFilteredTask && searchText === ''"
      class="flex-grow-1 flex-box flex-direction-column center-item"
    >
      <div class="">
        <div class="center-item">
          <NoTaskLogo />
        </div>
        <div v-if="noCompletedTask" class="info-text margin-top-8 text-center">
          {{ $t('NoCompleteTask') }}
        </div>
        <div v-if="noIncompleteTask" class="info-text margin-top-8 text-center">
          {{ $t('NoIncompleteTask') }}
        </div>
      </div>
    </div>
    <div
      v-if="searchText !== '' && hasNoFilteredTask"
      class="flex-grow-1 flex-box flex-direction-column center-item"
    >
      <div class="">
        <div class="center-item">
          <NoTaskLogo />
        </div>
        <div class="info-text margin-top-8 text-center">
          {{ $t('NoMatchFound') }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex';
import NoTaskLogo from '@/assets/svg/noTask.svg';
import global from '@/mixins/global';
import DeleteIcon from '@/components/buttons/DeleteIcon.vue';
import FilterComponent from '@/components/buttons/FilterComponent.vue';
import PlusIcon from '@/assets/svg/plusIcon.svg';
import { SUCCESS, ERROR, ADD } from '@/constants.js';

import { checkForm } from '@/helpers/helper';

export default {
  name: 'TaskContainer',
  components: {
    DeleteIcon,
    FilterComponent,
    NoTaskLogo,
    PlusIcon,
  },
  mixins: [global],
  data: () => ({
    titleInputError: false,
    titleErrorMsg: '',
    showAddCard: false,
    taskDescription: '',
    noCompletedTask: false,
    noIncompleteTask: false,
    loading: false,
    animcard: false,
    count: 0,
  }),

  computed: {
    ...mapGetters('todos', {
      todoList: 'getListPerPage',
      totalPage: 'getTotalPage',
      filterOptions: 'getFilterOptions',
      requestInProcess: 'getCompleteRequest',
      activeFilter: 'getActiveFilterOption',
      totalTaskList: 'getTodoList',
    }),
    ...mapState('todos', {
      perPage: 'perPage',
      page: 'page',
      isSearching: 'isSearching',
      searchText: 'searchText',
    }),
    hasNoTask() {
      return (
        this.todoList &&
        this.todoList.length <= 0 &&
        this.totalTaskList &&
        this.totalTaskList.length <= 0
      );
    },
    hasNoFilteredTask() {
      return (
        this.todoList &&
        this.todoList.length <= 0 &&
        this.totalTaskList &&
        this.totalTaskList.length > 0
      );
    },
    noTaskMessage() {
      return this.$t('NoTask');
    },
    loadMoreTask() {
      return !this.hasNoTask && this.page < this.totalPage;
    },
    showLessTask() {
      return !this.hasNoTask && this.page === this.totalPage && this.page !== 1;
    },
  },
  watch: {
    activeFilter(option) {
      if (option?.title === 'Complete') {
        this.noCompletedTask = true;
        this.noIncompleteTask = false;
      } else if (option?.title === 'Incomplete') {
        this.noIncompleteTask = true;
        this.noCompletedTask = false;
      }
    },
    taskDescription(value) {
      if (value.length > 0) {
        this.titleErrorMsg = false;
      } else {
        this.titleErrorMsg = true;
      }
    },
  },
  mounted() {
    this.loading = true;

    if (this.filterOptions && this.filterOptions.length > 0) {
      this.$store.dispatch(
        'todos/setActiveFilterOption',
        this.filterOptions[0]
      );
    }

    this.$store.dispatch('todos/setTotalPage');

    this.$store.dispatch('todos/filterTaskList');
    this.loading = false;
  },
  methods: {
    closeAddCard() {
      this.showAddCard = false;
    },
    showAddTodoCard() {
      if (this.$refs.addButton) {
        this.$refs.addButton.classList.remove('anim-card');
      }

      if (!this.showAddCard) {
        this.$store.dispatch('todos/setSearchText', '');
        this.$store.dispatch('todos/setShowSearchField', false);
        this.showAddCard = true;
      }

      if (this.count === 0) {
        this.count++;
      } else {
        this.animcard = !this.animcard;
      }
    },
    submitForm(e) {
      e.preventDefault();
      this.taskDescription = this.sanitizeInput(this.taskDescription);

      if (!checkForm(this.taskDescription)) {
        this.titleInputError = true;
        this.titleErrorMsg = 'Field is empty';

        return;
      }

      this.addTask();
    },
    async addTask() {
      await this.$store.dispatch('todos/setSearchText', '');
      this.$store.dispatch('todos/setShowSearchField', false);
      const response = await this.$store.dispatch(
        'todos/addTask',
        this.taskDescription
      );

      if (response?.success) {
        await this.$store.dispatch('todos/setTodoList');
        this.$store.dispatch('todos/setTotalPage');

        this.triggerToast(SUCCESS, ADD);
        this.clearField();
        this.count = 0;
      } else {
        this.triggerToast(ERROR, ADD);
      }
    },
    clearField() {
      this.showAddCard = false;
      this.titleInputError = false;
      this.titleErrorMsg = '';
      this.taskDescription = ' ';
    },
    loadMore() {
      this.showAddCard = false;
      this.$store.dispatch('todos/increaseLimit');
    },
    showLess() {
      this.$store.dispatch('todos/resetLimit');
    },
  },
};
</script>
<style lang="scss">
.flex-grow-1 {
  flex-grow: 1;
}
.primary-background {
  background-color: $base-color;
}
.add-button {
  margin-right: 19px;
  background: white;
  color: $button-background;
  border: 1px solid $border-primary;
  border-radius: 5px;
  padding: 9px 18px;
  cursor: pointer;
}
.center-item {
  display: flex;
  justify-content: center;
}
.list-div {
  display: grid;
}

.content {
  align-self: center;
  margin: auto;
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

@media only screen and (min-width: 1200px) {
  .grid-template-column {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    row-gap: 34px;
    column-gap: 54px;
  }
  .main-div-padding {
    padding: 0px 149px;
  }
  .create-button {
    background: $primary-text;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 9px 13px;
    cursor: pointer;
  }
  .home-button {
    margin-top: 28px;
    margin-bottom: 36px;
  }
}
@media only screen and (min-width: 992px) and (max-width: 1199px) {
  .grid-template-column {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    row-gap: 10px;
    column-gap: 10px;
  }
  .main-div-padding {
    padding: 0px 149px;
  }
  .create-button {
    background: $primary-text;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 9px 20px;
    cursor: pointer;
  }
  .home-button {
    margin-top: 28px;
    margin-bottom: 36px;
  }
}
@media only screen and (min-width: 768px) and (max-width: 991px) {
  .grid-template-column {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: 10px;
    column-gap: 10px;
  }
  .main-div-padding {
    padding: 0px 90px;
  }
  .create-button {
    background: $primary-text;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 9px 13px;
    cursor: pointer;
  }
  .home-button {
    margin-top: 28px;
    margin-bottom: 36px;
  }
}
@media only screen and (max-width: 767px) and (min-width: 577px) {
  .grid-template-column {
    grid-template-columns: repeat(1, minmax(0, 1fr));
    row-gap: 14px;
    column-gap: 24px;
  }
  .main-div-padding {
    padding: 0px 60px;
  }
  .create-button {
    background: $primary-text;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 9px 13px;
    cursor: pointer;
  }
  .home-button {
    margin-top: 28px;
    margin-bottom: 36px;
  }
}

@media only screen and (max-width: 576px) and (min-width: 376px) {
  .grid-template-column {
    grid-template-columns: repeat(1, minmax(0, 1fr));
    row-gap: 18px;
    column-gap: 28px;
  }
  .main-div-padding {
    padding: 0px 18px;
    padding-bottom: 20px;
  }
  .create-button {
    background: $primary-text;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 9px 12px;
    cursor: pointer;
    display: flex;
  }
  .home-button {
    margin-top: 14px;
    margin-bottom: 24px;
  }
}
@media only screen and (max-width: 375px) {
  .grid-template-column {
    grid-template-columns: repeat(1, minmax(0, 1fr));
    row-gap: 18px;
    // column-gap: 28px;
  }
  .main-div-padding {
    padding: 0px 18px;
    padding-bottom: 20px;
  }
  .create-button {
    background: $primary-text;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 9px 12px;
    cursor: pointer;
    display: flex;
  }
  .home-button {
    margin-top: 14px;
    margin-bottom: 24px;
  }
}

@media only screen and (max-width: 280px) {
  .grid-template-column {
    grid-template-columns: repeat(1, minmax(0, 1fr));
    row-gap: 10px;
    // column-gap: 28px;
  }
  .main-div-padding {
    padding: 0px 18px;
    padding-bottom: 20px;
  }
}

button:disabled,
button[disabled] .add-button .save-button {
  border: 1px solid #999999;
  background-color: #90919758;
  color: #666666;
}
.anim-card {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}
@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
