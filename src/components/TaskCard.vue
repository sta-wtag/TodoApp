<template>
    <div class="card">
      {{ msg }}
    </div>
</template>

<script>
export default {
    // data() {
    //     return {
    //       singleTask: null
    //     }
    // },
     props: {
     msg: String
    },
    // mounted(){
    //     console.log('hey')
    //     console.log(this.$store.state.todo.states.task.title)
    //     this.singleTask = this.$store.state.todo.states.task
    // },
}
</script>

