<template>
  <div class="flex-box">
    <div v-for="option in options" :key="option.id">
      <button class="margin-left-19">{{ $t(`${option.title}`) }}</button>
      <!-- <button class="margin-left-19">{{ $t('Incomplete') }}</button>
    <button class="margin-left-19">{{ $t('Complete') }}</button> -->
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
};
</script>

<style></style>
