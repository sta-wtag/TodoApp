<template>
  <div class="relative-position">
    <div v-if="loading" class="load-overlay">
      <div class="spin-icon">
        <LoadingIcon />
      </div>
    </div>
    <form @submit.prevent="submitForm">
      <div class="card padding-4 align-content-space-between">
        <div class="margin-bottom-6">
          <div v-if="showEditIcon && task !== null" class="description-height">
            <div
              class="text-description text-truncate text-width-max"
              :class="{ 'text-done': task.done }"
            >
              <div ref="taskDescription">{{ task.description }}</div>
            </div>
            <span
              v-show="seeMore"
              id="seeMore"
              class="see-more text-small margin-top-2"
              @click="openModal(task.description)"
            >
              see more
            </span>
          </div>

          <div v-else>
            <textarea
              id="title"
              v-model="taskDescription"
              class="width-full"
              maxlength="100"
            ></textarea>
            <label v-if="titleInputError" for="title">
              {{ $t('validation.todo.title.required') }}
            </label>
          </div>

          <div class="text-caption margin-top-2">
            {{ formatDate }}
          </div>
        </div>
        <div class="space-between flex-box width-full">
          <div class="flex-gap-8 text-button">
            <div v-if="task && !task.done" class="flex-gap-8">
              <button
                value="update"
                class="card-button"
                @click.prevent="markDone"
              >
                <TickIcon />
              </button>
              <button
                v-if="showEditIcon"
                class="card-button"
                value="edit"
                @click.prevent="showEditIcon = false"
              >
                <EditIcon />
              </button>
              <button
                v-else
                type="submit"
                class="add-button"
                data-testid="save-button"
              >
                {{ $t('Save') }}
              </button>
            </div>
            <button class="card-button" @click.prevent="deleteTask">
              <DeleteIcon />
            </button>
          </div>
          <div v-if="task && task.done" class="chip text-small">
            {{ duration }}
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { SUCCESS, ERROR } from '../constants';
import DeleteIcon from '@/assets/svg/Delete.svg';
import LoadingIcon from '@/components/buttons/LoadingIcon.vue';
import EditIcon from '@/assets/svg/Edit.svg';
import TickIcon from '@/assets/svg/Tick.svg';
import global from '@/mixins/global';

export default {
  name: 'TaskCard',
  components: { LoadingIcon, EditIcon, TickIcon, DeleteIcon },
  mixins: [global],
  props: {
    cardData: {
      type: Object,
      default: null,
    },
  },
  data: () => ({
    task: null,
    showEditIcon: true,
    titleInputError: false,
    taskDescription: '',
    titleErrorMsg: '',
    loading: false,
    descriptionDiv: null,
  }),
  computed: {
    ...mapGetters({ requestInProcess: 'todos/getCompleteRequest' }),

    formatDate() {
      if (!this.task?.createdAt) return;

      return (
        this.$t('CreatedAt') +
        ':  ' +
        this.$helper.formatDate(this.task.createdAt)
      );
    },
    duration() {
      if (!this.task?.completedAt) return;

      return (
        this.$t('Completed') +
        '   ' +
        this.$helper.getDuration(this.task.createdAt, this.task.completedAt)
      );
    },
    seeMore() {
      if (
        (this.descriptionDiv &&
          this.descriptionDiv.scrollWidth > this.descriptionDiv.offsetWidth) ||
        (this.descriptionDiv &&
          this.descriptionDiv.offsetHeight < this.descriptionDiv.scrollHeight)
      ) {
        return true;
      }

      return false;
    },
  },

  created() {
    this.task = this.cardData;
    this.taskDescription = this.task ? this.task.description : '';
  },
  mounted() {
    this.descriptionDiv = this.$refs.taskDescription;
  },
  methods: {
    async markDone() {
      if (this.taskDescription.length <= 0) {
        this.titleInputError = true;

        return;
      }

      if (!this.showEditIcon) {
        await this.editTask();
        this.showEditIcon = true;
      }

      this.loading = true; // loading state set to true
      await this.$store.dispatch('todos/changeTaskState', this.task);

      if (this.requestInProcess) return;

      this.loading = false;
      this.triggerToast(SUCCESS);
    },
    async deleteTask() {
      if (!this.showEditIcon) {
        this.showEditIcon = true;

        return;
      }

      this.loading = true;
      await this.$store.dispatch('todos/deleteTask', this.task);

      if (this.requestInProcess) return;

      this.loading = false;
      this.triggerToast(SUCCESS);
    },
    submitForm(e) {
      e.preventDefault();
      this.taskDescription = this.sanitizeInput(this.taskDescription);

      if (!this.$helper.checkForm(this.taskDescription)) {
        this.titleInputError = true;
        this.titleErrorMsg = 'Field is empty';
        this.triggerToast(ERROR);

        return;
      }

      this.editTask();
    },
    async editTask() {
      this.loading = true;
      const val = {
        description: this.taskDescription,
        id: this.task.id,
      };

      await this.$store.dispatch('todos/editTask', val);
      this.titleInputError = false;
      this.titleErrorMsg = '';

      if (this.requestInProcess) return;

      this.showEditIcon = true;
      this.loading = false;
      this.triggerToast(SUCCESS);
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
  background-color: rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  z-index: 1;
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
  gap: 26px;
}
.card-button {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  cursor: pointer;
}

.width-full {
  width: 100%;
}
.see-more {
  color: $primary-text;
}
.description-height {
  min-height: 81px;
}
</style>
