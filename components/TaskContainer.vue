<template>
  <div class="main-div">
    <div class="title-text">{{ $t('PageTitle') }}</div>
    <div class="space-between flex-box margin-top-28 margin-bottom-34">
      <div>
        <button @click="showAddTodoCard()">{{ $t('create') }}</button>
      </div>
      <FilterComponent />
    </div>
    <div class="list-div">
      <form v-if="showAddCard" @submit.prevent="checkForm">
        <div class="card">
          <textarea id="taskTitle" v-model="taskDescription"></textarea>
          <label v-if="titleInputError" for="taskTitle">{{
            titleErrorMsg
          }}</label>
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
      <div v-for="(task, index) in todoList" :key="index">
        <TaskCard :card-data="task" />
      </div>
    </div>
    <div v-if="hasTask" class="wrapper">
      <div class="content">
        <div class="center-item">
          <img :src="noTaskLogo" />
        </div>
        <div class="info-text margin-top-32">
          {{ $t('NoTask') }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import FilterComponent from '@/components/buttons/FilterComponent.vue';
import DeleteIcon from '@/components/buttons/DeleteIcon.vue';
import noTaskLogo from '@/assets/svg/noTask.svg';
export default {
  name: 'IndexPage',
  components: { DeleteIcon, FilterComponent },
  data: () => ({
    titleInputError: false,
    titleErrorMsg: '',
    showAddCard: false,
    noTaskLogo,
    taskDescription: '',
  }),
  computed: {
    ...mapGetters('todos', {
      todoList: 'getTodoList',
    }),
    hasTask() {
      return this.todoList && this.todoList.length <= 0;
    },
  },
  methods: {
    showAddTodoCard() {
      this.showAddCard = true;
    },
    checkForm(e) {
      if (this.taskDescription.length <= 0) {
        this.titleInputError = true;
        this.titleErrorMsg = 'Field is empty';

        return;
      }

      this.addTask();

      e.preventDefault();
    },
    addTask() {
      this.$store.dispatch('todos/addTask', this.taskDescription);
      this.clearField();
    },
    clearField() {
      this.showAddCard = false;
      this.titleInputError = false;
      this.titleErrorMsg = '';
      this.taskDescription = '';
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
</style>
