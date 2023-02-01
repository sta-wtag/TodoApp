<template>
  <div class="flex-box">
    <div v-for="option in options" :key="option.id">
      <button
        class="margin-left-19 text-button"
        :class="option.status ? 'selected-option' : 'unselected-option'"
        @click.prevent="filterList(option)"
      >
        {{ $t(`${option.title}`) }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    filterList(option) {
      this.$store.dispatch('todos/resetLimit');
      this.$store.dispatch('todos/filterTaskList', option);
      this.$store.dispatch('todos/setTotalPage');
    },
  },
};
</script>

<style lang="scss">
.unselected-option {
  background: white;
  color: #32394b;
  border: 1px solid $border-primary;
  border-radius: 5px;
  padding: 9px 13px;
  cursor: pointer;
}
.selected-option {
  background: $primary-text;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 9px 13px;
  cursor: pointer;
}
</style>
