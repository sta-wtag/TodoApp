<template>
  <div class="flex-box flex-direction-column height-full">
    <div v-if="requestInProcess" class="load-overlay">
      <div class="spin-icon">
        <LoadingIcon />
      </div>
    </div>
    <div v-else class="flex-box flex-direction-column height-full">
      <div class="main-div-padding relative-position">
        <div class="title-text">{{ $t('PageTitle') }}</div>
        <div class="space-between flex-box margin-top-7 margin-bottom-9">
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
          <form v-if="showAddCard" @submit.prevent="checkForm">
            <div class="card">
              <textarea id="taskTitle" v-model="taskDescription"></textarea>
              <label v-if="titleInputError" for="taskTitle">
                {{ $t('validation.todo.title.required') }}
              </label>
              <div class="flex-box margin-top-3">
                <button class="add-button" type="submit">
                  {{ $t('AddTask') }}
                </button>
                <div class="align-self-center" @click="clearField()">
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
      </div>
      <div v-if="hasNoTask" class="flex-grow-1">
        <div class="wrapper">
          <div class="center-item">
            <NoTaskLogo />
          </div>
          <div class="info-text margin-top-8">
            {{ $t('NoTask') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex';
import swal from 'sweetalert';
import PlusIcon from '../assets/svg/plusIcon.svg';
import NoTaskLogo from '../assets/svg/noTask.svg';
import FilterComponent from './buttons/FilterComponent.vue';
import DeleteIcon from './buttons/DeleteIcon.vue';
import LoadingIcon from './buttons/LoadingIcon.vue';

export default {
  name: 'IndexPage',
  components: {
    DeleteIcon,
    FilterComponent,
    NoTaskLogo,
    PlusIcon,
    LoadingIcon,
  },
  data: () => ({
    titleInputError: false,
    titleErrorMsg: '',
    showAddCard: false,
    taskDescription: '',
    loading: true,
    noCompletedTask: false,
    noIncompleteTask: false,
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
      return !this.hasNoTask && this.page >= this.totalPage && this.page !== 1;
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
  mounted() {
    this.$store.dispatch('todos/setTotalPage');

    if (this.filterOptions && this.filterOptions.length > 0) {
      this.$store.dispatch(
        'todos/setActiveFilterOption',
        this.filterOptions[0]
      );
    }

    this.$store.dispatch('todos/filterTaskList');
  },
  methods: {
    closeAddCard() {
      this.showAddCard = false;
    },

    async showAddTodoCard() {
      await this.$store.dispatch('todos/setSearchText', '');
      this.$store.dispatch('todos/setShowSearchField', false);
      this.showAddCard = true;
    },
    checkForm(e) {
      e.preventDefault();
      // Sanitize the user input by removing any HTML tags
      const sanitizedInput = this.taskDescription.replace(/<[^>]+>/g, '');

      // Set the sanitized input as the value of the input element
      this.taskDescription = sanitizedInput;

      if (this.taskDescription.trim().length <= 0) {
        this.titleInputError = true;
        this.titleErrorMsg = 'Field is empty';
        swal('Field is empty', {
          buttons: false,
          className: 'error',
          iconHtml: '<img src="https://picsum.photos/100/100">',
          timer: 3000,
        });

        return;
      }

      this.addTask();
    },
    async addTask() {
      this.$store.dispatch('todos/addTask', this.taskDescription);
      this.$store.dispatch('todos/setTotalPage');
      await this.$store.dispatch('todos/setTodoList');
      swal('Changes are saved successfully', {
        buttons: false,
        className: 'success',
        iconHtml: '<img src="https://picsum.photos/100/100">',
        timer: 3000,
      });
      this.clearField();
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
