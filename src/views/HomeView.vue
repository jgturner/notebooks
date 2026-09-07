<script setup>
import { reactive, onMounted, computed } from 'vue';
import { RouterLink } from 'vue-router';
import SearchBar from '@/components/SearchBar.vue';
import SearchFilters from '@/components/SearchFilters.vue';
import NoteList from '@/components/NoteList.vue';

const state = reactive({
  isFilters: false,
  activeCourse: '',
  searchText: '',
  notebooks: [],
  isLoading: true,
});

const filteredNotebooks = computed(() => {
  let results = state.notebooks;

  if (state.activeCourse !== '') {
    results = state.notebooks.filter((notebook) => notebook.course === state.activeCourse);
  }

  if (state.searchText !== '') {
    const query = state.searchText.toLowerCase();
    results = state.notebooks.filter((notebook) => {
      return notebook.title.toLowerCase().includes(query);
    });
  }

  return results;
});

const toggleFilters = () => {
  state.isFilters = !state.isFilters;
};

const setFilter = (course) => {
  //set the filter
  state.activeCourse = course;
};

const setSearch = (search) => {
  state.searchText = search;
};

onMounted(async () => {
  try {
    const response = await fetch('/api/notebooks');
    const data = await response.json();
    state.notebooks = data;
    console.log(state.notebooks);
  } catch (error) {
    console.error('Error fetching books', error);
  }
});
</script>

<template>
  <h1>Note Book</h1>
  <hr />
  <SearchBar :isFilters="state.isFilters" @toggle-filters="toggleFilters" @set-search="setSearch" />
  <SearchFilters
    :isFilters="state.isFilters"
    :activeCourse="state.activeCourse"
    @toggle-filters="toggleFilters"
    @set-filter="setFilter"
  />

  <RouterLink to="/notebooks/new" class="btn btn-primary mb-3">+ Notebook</RouterLink>
  <NoteList :notebooks="filteredNotebooks" />
</template>

<style scoped></style>
