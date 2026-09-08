<script setup>
import NoteListing from './NoteListing.vue';

defineProps({
  notebooks: Array,
});
</script>

<template>
  <section>
    <h2 class="mb-3">My Notes</h2>
    <div class="row">
      <NoteListing v-for="notebook in notebooks" :key="notebook.id" :notebook="notebook" />
    </div>
  </section>
</template>

<style scoped></style>
