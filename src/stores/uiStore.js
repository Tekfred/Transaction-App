import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUiStore = defineStore('ui', () => {
  // This is like a light switch - it's either ON (true) or OFF (false)
  const isSidebarOpen = ref(true); // Start with sidebar open

  // This function flips the switch
  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value; // If true, make false. If false, make true.
  };

  // Make these available to all components
  return {
    isSidebarOpen,  // The current state (is it open or closed?)
    toggleSidebar   // The function to change the state
  };
});