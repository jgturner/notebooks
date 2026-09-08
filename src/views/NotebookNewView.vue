<script setup>
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import BackButton from '@/components/BackButton.vue';
import { supabase } from '@/lib/supabase';

const route = useRoute();
const router = useRouter();
const toast = useToast();

const state = reactive({
  title: '',
  course: 'Select a Course...',
  formButton: true,
});

const handleSubmit = async () => {
  if (state.title.trim() !== '') {
    const newNotebook = {
      title: state.title.trim(),
      course: state.course.trim(),
    };

    const { data, error } = await supabase
      .from('notebooks')
      .insert(newNotebook)
      .select()
      .single();

    if (error) {
      console.error('Error creating notebook', error);
      toast.error('There was an error creating your notebook.');
      return;
    }

    toast.success('Notebook Created Successfully');

    router.push(`/notebooks/${data.id}`);
  }
};
</script>

<template>
  <BackButton />
  <h1>Create New Notebook</h1>
  <section>
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="note-title" class="form-label">Title:</label>
        <input
          v-model="state.title"
          type="text"
          name="note-title"
          placeholder="Note required Title"
          class="form-control"
          aria-describedby="titleHelp"
        />
        <div id="titleHelp" class="form-text">Tile your notebook for easy search.</div>
      </div>
      <div class="mb-3">
        <label for="note-course" class="form-label" aria-describedby="titleHelp">Course:</label>
        <select v-model="state.course" class="form-control">
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

<style scoped>
textarea {
  width: 100%;
  min-height: 600px;
}
</style>
