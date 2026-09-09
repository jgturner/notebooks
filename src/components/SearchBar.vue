<script setup>
import { ref } from 'vue';
defineProps({
  isFilters: {
    type: Boolean,
  },
});

const search = ref('');

const emit = defineEmits(['toggle-filters', 'set-search']);

const toggleFilters = () => {
  emit('toggle-filters');
};

const handleSearch = () => {
  emit('set-search', search.value);
};
</script>

<template>
  <section class="d-flex justify-content-between align-items-end mb-5">
    <div class="w-100">
      <label for="search" class="form-label h4 lacquer-regular">Search:</label>
      <input
        v-model="search"
        @input="handleSearch"
        type="text"
        name="search"
        placeholder="Search your notes by title..."
        class="form-control w-75 coming-soon-regular"
      />
    </div>

    <div>
      <button class="btn btn-primary" @click="toggleFilters">Filters</button>
    </div>
  </section>
</template>

<style scoped></style>
