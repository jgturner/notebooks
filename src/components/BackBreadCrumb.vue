<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const handleBack = () => {
  router.push('/');
};
</script>

<template>
  <section>
    <div><Button class="btn" @click="handleBack"> &larr; Back to Notes </Button></div>
  </section>
</template>

<style scoped></style>
