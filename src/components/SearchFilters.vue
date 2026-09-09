<script setup>
defineProps({
  isFilters: {
    type: Boolean,
  },
  activeCourse: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['toggle-filters', 'set-filter']);
const toggleFilters = () => {
  emit('toggle-filters');
};

const courses = [
  'Math 3',
  'Science 8',
  'ELA 1',
  'ELA 2',
  'ELA 3',
  'French 2',
  'German 2',
  'Algebra 1',
];

const setFilters = (course) => {
  emit('set-filter', course);
};

const clearFilters = () => {
  emit('set-filter', '');
  emit('toggle-filters');
};
</script>

<template>
  <Transition name="filters-menu">
    <section class="filters-container bg-light shadow" v-if="isFilters">
      <div class="d-flex justify-content-between align-items-center">
        <h2 class="mb-4 lacquer-regular">Search Filters</h2>

        <span @click="toggleFilters"><i class="fa-solid fa-xmark"></i></span>
      </div>
      <ul class="list-unstyled mb-5">
        <li
          v-for="course in courses"
          :key="course"
          @click="setFilters(course)"
          :class="course === activeCourse ? 'text-bg-primary' : 'text-bg-warning'"
          class="mx-2 badge"
          style="cursor: pointer"
        >
          {{ course }}
        </li>
      </ul>
      <div>
        <button class="btn btn-primary text-white w-100" @click="clearFilters">Clear Filter</button>
      </div>
    </section>
  </Transition>
</template>

<style scoped>
.filters-container {
  width: 400px;
  height: 100%;
  padding: 12px;
  position: absolute;
  top: 0;
  right: 0;
  background-color: #fff;
  z-index: 999;
}

.filters-menu-enter-active,
.filters-menu-leave-active {
  transition: transform 0.3s ease;
}

.filters-menu-enter-from,
.filters-menu-leave-to {
  transform: translateX(100%);
}
</style>
