<template>
  <div class="card">
    <div class="text-description">{{ task.description }}</div>
    <div class="text-caption margin-top-9 margin-bottom-28">
      {{ task.createdAt }}
    </div>
    <div class="flex-gap-8">
      <div>
        <TickIcon />
      </div>
      <div>
        <EditIcon />
      </div>
      <div @click="deleteTask">
        <DeleteIcon />
      </div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash';
import EditIcon from '@/components/buttons/EditIcon.vue';
import TickIcon from '@/components/buttons/TickIcon.vue';
import DeleteIcon from '@/components/buttons/DeleteIcon.vue';
export default {
  name: 'TaskCard',
  components: { EditIcon, TickIcon, DeleteIcon },
  props: {
    cardData: {
      type: Object,
      default: null,
    },
  },
  data: () => ({
    task: null,
    loading: false,
  }),
  created() {
    this.task = _.clone(this.cardData);
  },
  methods: {
    deleteTask() {
      this.$store.dispatch('todos/deleteTask', this.task);
    },
  },
};
</script>
<style scoped>
.flex-gap-8 {
  display: flex;
  gap: 8px;
}
</style>
