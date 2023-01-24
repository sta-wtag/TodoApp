<template>
  <div class="mainDiv">
    <div class="title-text">Add Tasks</div>
    <div class="space-between flex-box margin-top-28 margin-bottom-34">
      <div>
        <button @click="showAddTodoCard()">{{ $t('create') }}</button>
      </div>
      <div>
        <button class="margin-left-19">All</button>
        <button class="margin-left-19">Incomplete</button>
        <button class="margin-left-19">Complete</button>
      </div>
    </div>
    <div class="listDiv">
      <div v-if="showAddCard" class="card">
        <textarea v-model="task.description"></textarea>
        <div class="flexBox">
          <button class="addButton" @click="addTask">Add Task</button>
          <div class="margin-top-13" @click="clearField()">
            <DeleteButton />
          </div>
        </div>
      </div>
      <div v-for="(task, index) in taskData" :key="index">
        <TaskCard :card-data="task"/>
      </div>
    </div>
    <div class="wrapper">
      <div class="content">
        <div class="centerItem">
          <img :src="noTaskLogo" />
        </div>
        <div class="info-text margin-top-32">
          You didn’t add any task. Please, add one.
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import DeleteButton from '../components/buttons/DeleteButton.vue';
import noTaskLogo from '../assets/svg/noTask.svg';
export default {
  name: 'IndexPage',
  components: { DeleteButton },
  layout: 'default',
  data: () => ({
    task: {
      id: 0,
      done: false,
      description: '',
      completedAt: null,
      createdAt: null,
    },
    taskData: [],
    showAddCard: false,
    noTaskLogo,
  }),
  computed: {
    ...mapGetters(['getTodoList', 'getFilteredList']),
  },
  created() {
    this.$nuxt.$on('searchOn', () => {
      this.taskData = this.getFilteredList;
    });
  },
  mounted() {
    this.taskData = this.getTodoList;
  },
  methods: {
    showAddTodoCard() {
      this.showAddCard = true;
    },
    addTask() {
      if (this.task.description.length > 0) {
        this.task.createdAt = new Date().toDateString();
        // this.$store.commit('addTask', JSON.parse(JSON.stringify(this.task)));
        this.$store.commit('addTask', this.task);
        this.taskData = this.getTodoList;
        this.task = {};
      }
    },
    clearField() {
      this.showAddCard = false;
      this.task = {};
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
.mainDiv {
  height: 100vh;
  background-color: red;
  padding: 62px 149px;
  background-color: $base-color;
}
.addButton {
  margin-right: 19px;
  margin-top: 13px;
}
.centerItem {
  display: flex;
  justify-content: center;
}
.listDiv {
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
