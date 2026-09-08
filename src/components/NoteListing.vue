<script setup>
import { RouterLink } from 'vue-router';
const props = defineProps({
  notebook: Object,
});
</script>

<template>
  <div class="col-md-4 col-sm-6 col-xs-12 pb-3">
    <RouterLink :to="`/notebooks/${notebook.id}`">
      <div class="notebook-card bg-light p-3 rounded h-100 shadow-sm">
        <div class="mb-3">
          <p class="font-weight-bold">
            {{ notebook.title }}
          </p>
        </div>
        <div class="badge text-bg-warning mb-3">{{ notebook.course }}</div>
        <div>
          <p class="custom-truncate">{{ notebook.notes }}</p>
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<style scoped>
a {
  text-decoration: none;
  color: #212529;
}

.custom-truncate {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  overflow: hidden;
}

.notebook-card {
  transition: ease-in-out 0.2s;
}

.notebook-card:hover {
  transform: translateY(-5px);
}
</style>
