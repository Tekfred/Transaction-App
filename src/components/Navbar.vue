<script setup>
import { RouterLink } from 'vue-router'
import icons from '@/assets/logo.svg'
const freddy = '@/assets/profile_img_1.png'


const navigation = [
  {
    name: 'Dashboard',
    path: '/',
  },
  {
    name: 'My Accounts',
    path: '/my-accounts',
  },
  {
    name: 'Payments',
    path: '/payments',
  },
  {
    name: 'Transfers',
    path: '/transfers',
  },
]

defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <header class="mx-auto grid grid-cols-3 w-[min(1100px,calc(100%-2rem))] bg-[#0673c6] py-6">
    <div class="mb-5 flex items-start gap-4 sm:items-center">
      <img
        alt="Transaction App logo"
        class="rounded-[18px] bg-white p-3 shadow-[0_18px_40px_rgba(32,54,86,0.08)]"
        :src="icons"
        width="56"
        height="56"
      />
      <div>
        <p class="mb-0.5 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
          Finance Workspace
        </p>
        <h1 class="m-0 text-[clamp(1.75rem,4vw,2.4rem)] font-bold text-slate-900">
          {{ title }}
        </h1>
      </div>
    </div>

    <nav class="flex flex-wrap gap-2 sm:gap-3" aria-label="Primary">
      <RouterLink
        v-for="navigate in navigation"
        :key="navigate.path"
        :to="navigate.path"
        class="w-full rounded-full border border-slate-900/8 bg-white/80 px-4 py-3 text-center font-semibold text-slate-700 shadow-[0_10px_24px_rgba(32,54,86,0.06)] transition hover:opacity-90 sm:w-auto sm:py-[0.7rem]"
        active-class="bg-slate-900 text-white"
      >
        {{ navigate.name }}
      </RouterLink>


      
      <RouterLink to="/profile" class="flex items-center gap-3 ">

        <h1>Cony</h1>
          <img
            class="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border-2 border-[#4B2AAD]/30 ring-2 ring-[#4B2AAD]/20 hover:ring-[#4B2AAD]/60 transition-all duration-300 shadow-md"
            :src="freddy"
            alt="Profile"
          />
        </RouterLink>


    </nav>
  </header>
</template>
