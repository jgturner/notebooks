<script setup>
import { reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { supabase } from '@/lib/supabase';
import BackBreadCrumb from '@/components/BackBreadCrumb.vue';
import Loading from '@/components/Loading.vue';

const router = useRouter();
const toast = useToast();

const state = reactive({
  title: '',
  course: 'Select a Course...',
  formButton: true,
  isLoading: true,
});

const handleSubmit = async () => {
  if (state.title.trim() !== '') {
    const newNotebook = {
      title: state.title.trim(),
      course: state.course.trim(),
    };

    const { data, error } = await supabase.from('notebooks').insert(newNotebook).select().single();

    if (error) {
      console.error('Error creating notebook', error);
      toast.error('There was an error creating your notebook.');
      return;
    }

    toast.success('Notebook Created Successfully');

    router.push(`/notebooks/${data.id}`);
  }
};

onMounted(() => {
  state.isLoading = false;
});
</script>

<template>
  <Loading v-if="state.isLoading" />
  <section v-else class="full-height bg-white shadow p-4">
    <BackBreadCrumb />
    <h1 class="coming-soon-regular">Create New Notebook</h1>
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="note-title" class="form-label">Title:</label>
        <input
          v-model="state.title"
          type="text"
          name="note-title"
          placeholder="Note required Title"
          class="form-control coming-soon-regular"
          aria-describedby="titleHelp"
        />
        <div id="titleHelp" class="form-text">Tile your notebook for easy search.</div>
      </div>
      <div class="mb-3">
        <label for="note-course" class="form-label" aria-describedby="titleHelp">Course:</label>
        <select v-model="state.course" class="form-control coming-soon-regular">
          <option>Select a Course...</option>
          <option>Math 3</option>
          <option>Science 8</option>
          <option>ELA 1</option>
          <option>ELA 2</option>
          <option>ELA 3</option>
          <option>French 2</option>
          <option>German 2</option>
          <option>Algebra 1</option>
        </select>

        <div id="titleHelp" class="form-text">Select a course to categorize your notes.</div>
      </div>
      <button type="submit" :disabled="!state.title.trim()" class="btn btn-primary">
        Create Notebook
      </button>
    </form>
  </section>
</template>

<style scoped></style>
