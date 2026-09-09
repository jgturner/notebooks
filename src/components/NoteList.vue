<script setup>
import NoteListing from './NoteListing.vue';

defineProps({
  notebooks: Array,
  message: {
    type: String,
  },
});
</script>

<template>
  <section v-if="notebooks.length === 0">
    <h4 class="lacquer-regular">
      {{ message }}
    </h4>
  </section>
  <section v-else>
    <h2 class="mb-3 lacquer-regular">My Notes</h2>
    <div class="row">
      <NoteListing v-for="notebook in notebooks" :key="notebook.id" :notebook="notebook" />
    </div>
  </section>
</template>

<style scoped></style>
