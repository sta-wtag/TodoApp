<template>
    <div class="card" v-if="singleTask">
      {{ singleTask.title }}
    </div>
</template>

<script>
export default {
    data() {
        return {
          singleTask: null
        }
    },
    mounted(){
        console.log('hey')
        console.log(this.$store.state.todo.states.task.title)
        this.singleTask = this.$store.state.todo.states.task
    },
  methods:{
  }
}
</script>
<style lang="scss">
 .card{
      width: 300px;
      height: 200px;
      background-color: $card-color;
      @include borderPrimary 
      
   }
</style>