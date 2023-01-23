<template>
  <div class="mainDiv">
    <div class="titletext">Add Tasks</div>
      <div style="display:flex; justify-content:space-between; margin-top:28px; margin-bottom:34px;">
        <div>
          <button @click="createTask()">Create</button>
        </div>
        <div>
          <button style="margin-left:19px;">All</button>
          <button style="margin-left:19px;">Incomplete</button>
          <button style="margin-left:19px;">Complete</button>
        </div>
    </div>
    <div class="listDiv">
      <div class="card" v-if="showAddCard">
        <textarea v-model="task.description" style="width:100%;border:3px solid #D1D8FF; border-radius:5px;"></textarea>
        <div style="display:flex;">
          <button style="margin-right:19px; margin-top:13px;"  @click="addTask">Add Task</button>
          <div style=" margin-top:13px;cursor: pointer;" @click="clearField()">
            <DeleteButton />
          </div>
        </div>
    </div>
      <div v-for="task,index in taskData" :key="index">
        <TaskCard :card-data="task" />
      </div>
    </div>
    <div class="wrapper">
      <div class="content">
        <div class="centerItem">
          <img :src="noTaskLogo" />
        </div>
      <div class="infoText">You didn’t add any task. Please, add one.</div>
      </div>
    </div>
  </div>
</template>

<script>
import DeleteButton from '../components/buttons/DeleteButton.vue'
import noTaskLogo from '../assets/svg/noTask.svg'
export default {
    name: "IndexPage",
    layout: "default",
    data: () => ({
        task: {
            description: "",
            createdAt: null
        },
        taskData: [],
        showAddCard: false,
        noTaskLogo
    }),
    created() {
        this.$nuxt.$on("searchOn", () => {
            console.log(this.$store.state.todo.states.filteredList);
            this.taskData = this.$store.state.todo.states.filteredList;
        });
    },
    mounted() {
        console.log(this.$store.state.todo);
        this.taskData = this.$store.state.todo.states.taskList;
    },
    methods: {
        createTask() {
            this.showAddCard = true;
        },
        addTask() {
            console.log(this.$store);
            if (this.task.description.length > 0) {
                this.task.createdAt = new Date();
                this.$store.commit("todo/setTask", JSON.parse(JSON.stringify(this.task)));
                this.taskData = this.$store.state.todo.states.taskList;
                this.task = {};
            }
        },
        clearField() {
            this.showAddCard = false;
            this.task = {};
        }
    },
    components: { DeleteButton }
}
</script>
<style lang="scss">
  @font-face {
  font-family: 'Roboto';
  src: url('../assets/fonts/Roboto-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
 } 
 html, body {
    margin:0px;
    width:100%;
    height: 100%;
  }
  .mainDiv{
    // width:100vh;
    height: 100vh;
    background-color:red;
    padding: 62px 149px;
    background-color: $base-color;
  }
  .infoText{
    font-size: 24px;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: 0em;
    text-align: center;
    margin-top:32px;
  }
  .centerItem {
    display: flex;
    justify-content: center;
  }
  .listDiv{
    display: grid;
    row-gap: 34px;
    column-gap: 54px;
    grid-template-columns: auto auto auto;
    padding: 10px;
  }
.wrapper {
    align-items:center;
    display:flex;
    height:calc(100% - (70px + 70px));
}

.content {
    margin:auto;
    width:500px;
}
</style>
