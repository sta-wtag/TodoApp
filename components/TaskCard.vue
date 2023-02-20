<template>
  <div class="relative-position">
    <div v-if="loading" class="load-overlay">
      <div class="spin-icon">
        <LoadingIcon />
      </div>
    </div>
    <form @submit.prevent="checkForm">
      <div class="card align-content-space-between">
        <div class="margin-bottom-24">
          <div
            v-if="showEditIcon && task !== null"
            class="text-description text-concat"
            :class="{ 'text-done': task.done }"
          >
            {{ task.description }}
          </div>
          <div v-else>
            <textarea
              id="title"
              v-model="taskDescription"
              class="text-area"
            ></textarea>
            <label v-if="titleInputError" for="title">
              {{ $t('validation.todo.title.required') }}
            </label>
          </div>
          <div class="text-caption margin-top-9">
            {{ formatDate }}
          </div>
        </div>
        <div class="space-between flex-box width-full">
          <div class="flex-gap-8 card-button text-button">
            <div v-if="task && !task.done" class="flex-gap-8">
              <button value="update" @click.prevent="markDone">
                <TickIcon />
              </button>
              <button
                v-if="showEditIcon"
                value="edit"
                @click.prevent="showEditIcon = false"
              >
                <EditIcon />
              </button>
              <button v-else type="submit" data-testid="save-button">
                {{ $t('Save') }}
              </button>
            </div>
            <button @click.prevent="deleteTask">
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
import DeleteIcon from '../assets/svg/Delete.svg';
import EditIcon from '../assets/svg/Edit.svg';
import TickIcon from '../assets/svg/Tick.svg';
import LoadingIcon from './buttons/LoadingIcon.vue';
export default {
  name: 'TaskCard',
  components: { LoadingIcon, EditIcon, TickIcon, DeleteIcon },
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
  }),
  computed: {
    ...mapGetters({ requestInProcess: 'todos/getCompleteRequest' }),

    formatDate() {
      console.log(this.task?.createdAt);

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
  },

  created() {
    this.task = this.cardData;
    this.taskDescription = this.task ? this.task.description : '';
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

      this.loading = true;
      await this.$store.dispatch('todos/changeTaskState', this.task);

      if (this.requestInProcess) return;

      this.loading = false;
      this.alert();
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
      this.alert();
    },
    checkForm(e) {
      e.preventDefault();
      // Sanitize the user input by removing any HTML tags
      const sanitizedInput = this.taskDescription.replace(/<[^>]+>/g, '');

      // Set the sanitized input as the value of the input element
      this.taskDescription = sanitizedInput;

      if (this.taskDescription.trim().length <= 0) {
        this.titleInputError = true;
        this.titleErrorMsg = 'Field is empty';
        swal('Field is empty', {
          buttons: false,
          className: 'error',
          iconHtml: '<img src="https://picsum.photos/100/100">',
          timer: 3000,
        });

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
      this.alert();
    },
    alert() {
      swal('Changes are saved successfully', {
        buttons: false,
        className: 'success',
        timer: 3000,
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
.card-button button {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  cursor: pointer;
}
</style>
