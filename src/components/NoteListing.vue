<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  notebook: Object,
});
</script>

<template>
  <ul class="list-unstyled">
    <li>
      <RouterLink :to="`/notebooks/${notebook.id}`"
        >{{ notebook.title }} | {{ notebook.course }}</RouterLink
      >
    </li>
  </ul>
</template>

<style scoped></style>
