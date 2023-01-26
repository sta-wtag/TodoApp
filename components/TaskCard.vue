<template>
  <div style="position: relative">
    <form @submit.prevent="checkForm">
      <div class="card">
        <div v-if="showEditIcon">
          <div v-if="!task.done" class="text-description">
            {{ task.description }}
          </div>
          <div v-else class="text-description text-done">
            {{ task.description }}
          </div>
        </div>
        <div v-else>
          <textarea id="title" v-model="task.description"></textarea>
          <label v-if="titleInputError" for="title">{{ titleErrorMsg }}</label>
        </div>
        <div class="text-caption margin-top-9 margin-bottom-24">
          Created At: {{ $helper.formatDate(task.createdAt) }}
        </div>
        <div class="space-between flex-box">
          <div class="flex-gap-8">
            <div v-if="!task.done" @click="markDone()">
              <TickIcon />
            </div>
            <div v-if="!task.done">
              <div v-if="showEditIcon" @click="showEditIcon = false">
                <EditIcon />
              </div>
              <button v-else type="submit">{{ $t('Save') }}</button>
            </div>
            <div @click="deleteTask">
              <DeleteIcon />
            </div>
          </div>
          <div v-if="task.done" class="chip textSmall">
            <p>
              Completed
              {{ $helper.getDuration(task.createdAt, task.completedAt) }}
            </p>
          </div>
        </div>
      </div>
    </form>
    <div v-if="requestInProcess" class="load-overlay">
      <div class="spin-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="51"
          height="51"
          viewBox="0 0 51 51"
          fill="none"
        >
          <path
            d="M3.50011 12.6506C6.83897 6.86754 12.2301 2.73085 18.6802 1.00239C25.1305 -0.725797 31.8677 0.161127 37.6507 3.49999C41.7457 5.8642 45.0695 9.31578 47.2628 13.4815C49.3953 17.5317 50.3796 22.0842 50.1093 26.6469L45.43 26.3697C45.6498 22.6605 44.8493 18.9589 43.1151 15.6653C41.3346 12.2836 38.6346 9.48068 35.307 7.55949C25.6073 1.95934 13.1597 5.29464 7.5596 14.9944C1.95945 24.6941 5.29475 37.1416 14.9945 42.7418C18.3221 44.663 22.0995 45.5997 25.9184 45.4509C29.6378 45.3059 33.2436 44.1483 36.3461 42.1035L38.9258 46.0174C35.1095 48.5328 30.6747 49.9566 26.1009 50.1349C21.3967 50.3182 16.7457 49.1655 12.6507 46.8013C6.86766 43.4624 2.73097 38.0713 1.00251 31.6211C-0.725684 25.1709 0.161239 18.4337 3.50011 12.6506Z"
            fill="#7A8DFD"
          />
        </svg>
      </div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash';
import { mapGetters } from 'vuex';
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
    showEditIcon: true,
    titleInputError: false,
    titleErrorMsg: '',
  }),
  computed: {
    ...mapGetters({ requestInProcess: 'todos/getCompleteRequest' }),
  },

  created() {
    this.task = _.clone(this.cardData); // this.task will be edited . to avoid issues thrown by vuex instead to directly assigning the ref to this.task, cloning it.
  },
  methods: {
    markDone() {
      if (this.showEditIcon) {
        this.$store.dispatch('todos/changeTaskState', this.task).then(() => {
          this.task = _.clone(this.cardData);
        }); // to update the task state
      } else {
        this.$store.dispatch('todos/changeTaskState', this.task).then(() => {
          this.$store.dispatch('todos/editTask', this.task).then(() => {
            this.task = _.clone(this.cardData);
            this.showEditIcon = true;
          });
        });
      }
    },
    deleteTask() {
      if (this.showEditIcon) {
        this.$store.dispatch('todos/deleteTask', this.task);
      } else {
        this.task = _.clone(this.cardData);
        this.showEditIcon = true;
      }
    },
    checkForm(e) {
      if (this.task.description.length > 0) {
        this.editTask();
      } else {
        this.titleInputError = true;
        this.titleErrorMsg = 'Field is empty';
      }

      e.preventDefault();
    },
    editTask() {
      console.log(this.showEditIcon);

      if (this.task.description.length > 0) {
        this.$store.dispatch('todos/editTask', this.task).then(() => {
          console.log(this.showEditIcon);
          this.showEditIcon = true;
        });
      }
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
</style>
