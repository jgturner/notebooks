<script setup>
import { RouterLink } from 'vue-router';
import NoteListing from './NoteListing.vue';

defineProps({
  notebooks: Array,
});
</script>

<template>
  <section>
    <h2 class="mb-3">My Notes</h2>
    <NoteListing v-for="notebook in notebooks" :key="notebook.id" :notebook="notebook" />
  </section>
</template>

<style scoped></style>
