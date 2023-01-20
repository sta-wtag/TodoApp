<template>
    <div class="card">
       {{ $t('welcome') }}
    </div>
</template>

 <script>
export default {
    name:'TaskCard',
    computed: {
      singleTask(){
        return this.$store.state.todo.states.task
      }
    },
    data() {
        return {
          
        }
    },
     props: {
     msg: String
    },
    
    mounted(){
        console.log('hey')
        console.log(this.$store.state.todo.states.task.title)
        // this.singleTask = 
    },
}
</script>
<style lang="scss">
   .card{
    height:150px;
    width:250px;
    background-color: white;
   }
</style>

