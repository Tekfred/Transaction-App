<script setup>
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <div
    class="min-h-screen bg-[radial-gradient(circle_at_top,rgba(78,54,226,0.14),transparent_32%),linear-gradient(180deg,#f7f9fc_0%,#eef3f9_100%)]"
  >
    <Navbar title="Transaction App" />
    <main class="mx-auto w-[min(1100px,calc(100%-2rem))] pb-8">
      <RouterView />
    </main>
  </div>
</template>
