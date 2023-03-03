<template>
  <div class="flex-box flex-direction-column height-full relative-position">
    <div v-if="loading" class="load-overlay">
      <div class="spin-icon">
        <LoadingIcon />
      </div>
    </div>
    <div
      v-else
      class="relative-position height-full flex-box flex-direction-column"
    >
      <div v-if="isSearching" class="load-overlay">
        <div class="spin-icon">
          <LoadingIcon />
        </div>
      </div>

      <div class="main-div-padding">
        <div class="title-text">{{ $t('PageTitle') }}</div>
        <div class="space-between flex-box home-button">
          <button
            class="create-button text-button"
            data-testid="create-button"
            :disabled="isSearching"
            @click="showAddTodoCard"
          >
            <PlusIcon class="align-self-center margin-right-1" />
            {{ $t('create') }}
          </button>
          <FilterComponent
            :options="filterOptions"
            @closeAddCard="closeAddCard"
          />
        </div>
        <div class="list-div grid-template-column">
          <form v-if="showAddCard" @submit.prevent="submitForm">
            <div class="card padding-4">
              <textarea
                id="taskTitle"
                v-model="taskDescription"
                data-testid="taskTitle"
              ></textarea>
              <label
                v-if="titleInputError"
                data-testid="task-error-message"
                for="taskTitle"
              >
                {{ $t('validation.todo.title.required') }}
              </label>
              <div class="flex-box margin-top-3">
                <button
                  class="add-button"
                  data-testid="add-button"
                  type="submit"
                >
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
        class="flex-grow-1 flex-box flex-direction-column center-item"
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
        v-if="hasNoFilteredTask"
        class="flex-grow-1 flex-box flex-direction-column center-item"
      >
        <div class="">
          <div class="center-item">
            <NoTaskLogo />
          </div>
          <div
            v-if="noCompletedTask"
            class="info-text margin-top-8 text-center"
          >
            {{ $t('NoCompleteTask') }}
          </div>
          <div
            v-if="noIncompleteTask"
            class="info-text margin-top-8 text-center"
          >
            {{ $t('NoIncompleteTask') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex';
import NoTaskLogo from '@/assets/svg/noTask.svg';
import LoadingIcon from '@/components/buttons/LoadingIcon.vue';
import global from '@/mixins/global';
import DeleteIcon from '@/components/buttons/DeleteIcon.vue';
import FilterComponent from '@/components/buttons/FilterComponent.vue';
import PlusIcon from '@/assets/svg/plusIcon.svg';
import { SUCCESS, ERROR } from '@/constants.js';

export default {
  name: 'TaskContainer',
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
    noCompletedTask: false,
    noIncompleteTask: false,
    loading: false,
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
  },
  async mounted() {
    this.loading = true;

    if (this.filterOptions && this.filterOptions.length > 0) {
      this.$store.dispatch(
        'todos/setActiveFilterOption',
        this.filterOptions[0]
      );
    }

    await this.$store.dispatch('todos/setTodoList');

    this.$store.dispatch('todos/setTotalPage');

    this.$store.dispatch('todos/filterTaskList');
    this.loading = false;
  },
  methods: {
    closeAddCard() {
      this.showAddCard = false;
    },
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
    async addTask() {
      this.loading = true;
      const response = await this.$store.dispatch(
        'todos/addTask',
        this.taskDescription
      );

      if (response.success) {
        await this.$store.dispatch('todos/setTodoList');
        this.$store.dispatch('todos/setTotalPage');
        this.triggerToast(SUCCESS);
        this.clearField();
        this.loading = false;
      } else {
        this.triggerToast(ERROR);
      }
    },
    clearField() {
      this.showAddCard = false;
      this.titleInputError = false;
      this.titleErrorMsg = '';
      this.taskDescription = '';
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
    padding: 9px 20px;
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
    padding: 9px 20px;
    cursor: pointer;
  }
  .home-button {
    margin-top: 28px;
    margin-bottom: 36px;
  }
}
@media only screen and (max-width: 767px) and (min-width: 577px) {
  .grid-template-column {
    grid-template-columns: repeat(2, minmax(0, 1fr));
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
    padding: 9px 20px;
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
</style>
