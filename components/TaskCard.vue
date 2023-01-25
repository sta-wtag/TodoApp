<template>
  <div class="card">
    <div class="text-description">{{ task.description }}</div>
    <div class="text-caption margin-top-9 margin-bottom-28">
      {{ task.createdAt }}
    </div>
    <div class="flexGap8">
      <div>
        <TickButton />
      </div>
      <div>
        <EditButton />
      </div>
      <div @click="deleteTask()">
        <DeleteButton />
      </div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash';
import EditButton from '@/components/buttons/EditButton.vue';
import TickButton from '@/components/buttons/TickButton.vue';
import DeleteButton from '@/components/buttons/DeleteButton.vue';
export default {
  name: 'TaskCard',
  components: { EditButton, TickButton, DeleteButton },
  props: {
    cardData: {
      type: Object,
      default: null,
    },
  },
  data: () => ({
    task: '',
    loading: false,
  }),
  mounted() {
    this.task = _.clone(this.cardData);
  },
  methods: {
    deleteTask() {
      this.$store.commit('deleteTask', this.task);
    },
  },
};
</script>
<style scoped>
.flexGap8 {
  display: flex;
  gap: 8px;
}
</style>
