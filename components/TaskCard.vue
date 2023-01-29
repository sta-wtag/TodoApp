<template>
  <div class="relative-position">
    <div v-if="loading" class="load-overlay">
      <div class="spin-icon">
        <LoadingIcon />
      </div>
    </div>
    <div class="card">
      <div class="text-description" :class="{ 'text-done': task.done }">
        {{ task.description }}
      </div>
      <div class="text-caption margin-top-9 margin-bottom-24">
        {{ $t('CreatedAt') + ':  ' + formatDate }}
      </div>
      <div class="space-between flex-box">
        <div class="flex-gap-8 card-button">
          <div v-if="!task.done" class="flex-gap-8">
            <button @click="markDone">
              <img src="@/assets/svg/Tick.svg" />
            </button>
            <button>
              <img src="@/assets/svg/Edit.svg" />
            </button>
          </div>
          <button @click="deleteTask">
            <img src="@/assets/svg/Delete.svg" />
          </button>
        </div>
        <div v-if="task.done" class="chip text-small">
          <p>
            {{ $t('Completed') + '   ' + duration }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import LoadingIcon from '@/components/buttons/LoadingIcon.vue';
export default {
  name: 'TaskCard',
  components: { LoadingIcon },
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
  computed: {
    ...mapGetters({ requestInProcess: 'todos/getCompleteRequest' }),

    formatDate() {
      return this.$helper.formatDate(this.task.createdAt);
    },
    duration() {
      return this.$helper.getDuration(
        this.task.createdAt,
        this.task.completedAt
      );
    },
  },

  created() {
    this.task = this.cardData;
  },
  methods: {
    async markDone() {
      this.loading = true;
      await this.$store
        .dispatch('todos/changeTaskState', this.task)
        .then(() => {
          if (!this.requestInProcess) {
            this.loading = false;
          }
        });
    },
    async deleteTask() {
      this.loading = true;
      await this.$store.dispatch('todos/deleteTask', this.task).then(() => {
        if (!this.requestInProcess) {
          this.loading = false;
        }
      });
    },
  },
};
</script>
<style lang="scss">
.load-overlay {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.spin-icon {
  margin: auto;
  animation-name: spin;
  animation-duration: 700ms;
  animation-iteration-count: infinite;
}
.flex-gap-8 {
  display: flex;
  gap: 8px;
}
.card-button button {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
}
</style>
