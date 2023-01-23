<template>
  <div class="mainDiv">
    <div class="titletext">Add Tasks</div>
      <div class="spaceBetween marginTop28 marginBottom34">
        <div>
          <button @click="createTask()">Create</button>
        </div>
        <div>
          <button class="marginLeft19">All</button>
          <button class="marginLeft19">Incomplete</button>
          <button class="marginLeft19">Complete</button>
        </div>
    </div>
    <div class="listDiv">
      <div class="card" v-if="showAddCard">
        <textarea v-model="task.description"></textarea>
        <div class="flexBox">
          <button class="addButton"  @click="addTask">Add Task</button>
          <div class="marginTop13" @click="clearField()">
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
        <div class="infoText marginTop32">You didn’t add any task. Please, add one.</div>
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
 html, body {
    margin:0px;
    width:100%;
    height: 100%;
  }
  .mainDiv{
    height: 100vh;
    background-color:red;
    padding: 62px 149px;
    background-color: $base-color;
  }
  .addButton{
    margin-right:19px; 
    margin-top:13px;
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
  .flexBox{
    display:flex;
  }
</style>
