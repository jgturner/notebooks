import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import NotebookView from '@/views/NotebookView.vue';
import NotebookNewView from '@/views/NotebookNewView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/notebooks/:id',
      name: 'notebook',
      component: NotebookView,
    },
    {
      path: '/notebooks/new',
      name: 'notebook-new',
      component: NotebookNewView,
    },
  ],
});

export default router;
