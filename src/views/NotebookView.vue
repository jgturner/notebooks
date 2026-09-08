<script setup>
import { reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { supabase } from '@/lib/supabase';
import BackBreadCrumb from '@/components/BackBreadCrumb.vue';
import Loading from '@/components/Loading.vue';

const route = useRoute();
const router = useRouter();
const toast = useToast();

const notebookId = route.params.id;
const state = reactive({
  title: '',
  course: '',
  notes: '',
  isLoading: true,
});

const handleSubmit = async () => {
  const updatedNotebook = {
    title: state.title.trim(),
    course: state.course.trim(),
    notes: state.notes.trim(),
  };

  const { error } = await supabase.from('notebooks').update(updatedNotebook).eq('id', notebookId);

  if (error) {
    console.error('Error updating notebook', error);
  }
};

const handleDeleteNotebook = async () => {
  const confirmDelete = confirm('Are you sure you want to delete this notebook?');
  if (confirmDelete) {
    const { error } = await supabase.from('notebooks').delete().eq('id', notebookId);

    if (error) {
      console.error('Error deleting data:', error);
      toast.error('There was an error deleting your notebook, please try again');
      return;
    }

    toast.error('Notebook Deleted Successfully');
    router.push('/');
  }
};

onMounted(async () => {
  const { data, error } = await supabase
    .from('notebooks')
    .select('*')
    .eq('id', notebookId)
    .single();

  if (error) {
    console.error('Error fetching notebook', error);
    toast.error('Could not load that notebook.');
    return;
  }

  state.title = data.title;
  state.course = data.course;
  state.notes = data.notes ?? '';
  state.isLoading = false;
});
</script>

<template>
  <Loading v-if="state.isLoading" />

  <section v-else class="bg-white shadow p-4">
    <BackBreadCrumb />
    <h1>{{ state.title }}</h1>
    <small class="mb-4 d-block">Changes are saved automatically</small>
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="note-title" class="form-label">Title:</label>
        <input
          v-model="state.title"
          @change="handleSubmit"
          type="text"
          name="note-title"
          placeholder="Note Title"
          class="form-control"
          aria-describedby="titleHelp"
        />
        <div id="titleHelp" class="form-text">Tile your notebook for easy search</div>
      </div>
      <div class="mb-3">
        <label for="note-course" class="form-label">Course:</label>
        <select
          name="note-course"
          v-model="state.course"
          @change="handleSubmit"
          class="form-control"
          aria-describedby="courseHelp"
        >
          <option>Math 3</option>
          <option>Science 8</option>
          <option>ELA 1</option>
          <option>ELA 2</option>
          <option>ELA 3</option>
          <option>French 2</option>
          <option>German 2</option>
          <option>Algebra 1</option>
        </select>
        <div id="courseHelp" class="form-text">Select a course to keep notes categorized.</div>
      </div>

      <div class="mb-3">
        <label for="note-content" class="form-label">Notes:</label>
        <textarea
          v-model="state.notes"
          @change="handleSubmit"
          name="note-content"
          id="note-content"
          class="form-control"
          aria-describedby="contentHelp"
          style="min-height: 500px"
        ></textarea>
        <div id="contentHelp" class="form-text">Keep your notes here.</div>
      </div>
    </form>

    <button class="btn btn-danger" @click="handleDeleteNotebook">Delete Notebook</button>
  </section>
</template>

<style scoped></style>
