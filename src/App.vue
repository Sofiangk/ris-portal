<script setup>
import { RouterLink, RouterView } from "vue-router";
import { ref, computed } from "vue";
import { useAuthStore } from "@/stores/auth"; // Import Pinia store

const authStore = useAuthStore(); // Access the auth store
const isDropdownOpen = ref(false);

// Computed property for the user's name
const username = computed(() => authStore.name);

// Toggle dropdown menu
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

// Logout function
const handleLogout = () => {
  authStore.logout(); // Call the logout action in the store
};
</script>

<template>
  <!-- Sidebar -->
  <aside
    v-if="$route.path !== '/login' && $route.path !== '/signup'"
    class="w-64 divide-y divide-white/25 bg-white shadow-lg h-screen fixed top-0 left-0 z-10 flex flex-col justify-between"
  >
    <div
      class="p-6 text-left flex items-center justify-center space-x-5 font-black"
    >
      <img class="w-16 mx-auto" src="@/assets/RIS School.png" alt="" />
      <h1 class="text-lg leading-tight font-bold text-navy">
        Riada International School
      </h1>
    </div>
    <ul class="flex-grow pt-8 p-5 divide-y divide-navy-lighter/25">
      <li>
        <router-link
          to="/"
          class="block p-4 rounded bg-transparent hover:bg-navy-lighter/5 text-navy-light"
        >
          Home
        </router-link>
      </li>
      <li>
        <router-link
          to="/courses"
          class="block p-4 rounded bg-transparent hover:bg-navy-lighter/5 text-navy-light"
        >
          Courses
        </router-link>
      </li>
      <li>
        <router-link
          to="/attendance"
          class="block p-4 rounded bg-transparent hover:bg-navy-lighter/5 text-navy-light"
        >
          Attendance
        </router-link>
      </li>
      <li>
        <router-link
          to="/complaints"
          class="block p-4 rounded bg-transparent hover:bg-navy-lighter/5 text-navy-light"
        >
          Complaints
        </router-link>
      </li>
      <li>
        <router-link
          to="/announcements"
          class="block p-4 rounded bg-transparent hover:bg-navy-lighter/5 text-navy-light"
        >
          Announcements
        </router-link>
      </li>
    </ul>
    <div class="relative flex items-center mt-auto p-4">
      <button
        @click="toggleDropdown"
        class="text-navy-lighter focus:outline-none px-2 flex items-center space-x-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-8 h-8"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
        <p>{{ username }}</p>
        <!-- Display dynamic username -->
      </button>
      <!-- Dropdown Menu -->
      <div
        v-if="isDropdownOpen"
        class="absolute bottom-16 mt-2 bg-white border border-gray-300 rounded-md shadow w-48 text-black z-10"
      >
        <ul>
          <li>
            <router-link
              to="/profile"
              class="block px-4 py-3 text-sm hover:bg-gray-200"
            >
              Profile
            </router-link>
          </li>

          <li>
            <button
              @click="handleLogout"
              class="block px-4 py-3 text-sm hover:bg-gray-200 w-full text-left"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  </aside>

  <RouterView />
</template>

<style scoped>
.router-link-active {
  @apply bg-navy-lighter/5 font-bold;
}
</style>
