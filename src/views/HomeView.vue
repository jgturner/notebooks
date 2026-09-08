<script setup>
import { reactive, onMounted, computed } from 'vue';
import { RouterLink } from 'vue-router';
import { supabase } from '@/lib/supabase';
import SearchBar from '@/components/SearchBar.vue';
import SearchFilters from '@/components/SearchFilters.vue';
import NoteList from '@/components/NoteList.vue';
import Loading from '@/components/Loading.vue';

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
  const { data, error } = await supabase
    .from('notebooks')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return console.error('Error fetching notebooks', error);
  state.notebooks = data;
  state.isLoading = false;
});
</script>

<template>
  <Loading v-if="state.isLoading" />

  <section v-else class="bg-white shadow p-4">
    <h1>Note Book</h1>
    <hr />
    <SearchBar
      :isFilters="state.isFilters"
      @toggle-filters="toggleFilters"
      @set-search="setSearch"
    />
    <SearchFilters
      :isFilters="state.isFilters"
      :activeCourse="state.activeCourse"
      @toggle-filters="toggleFilters"
      @set-filter="setFilter"
    />

    <RouterLink to="/notebooks/new" class="btn btn-primary mb-3">+ Notebook</RouterLink>
    <NoteList :notebooks="filteredNotebooks" />
  </section>
</template>

<style scoped></style>
