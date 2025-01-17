<template>
  <main class="flex bg-slate-100 text-white">
    <!-- Main Content -->
    <main class="flex-grow p-12 mb-32 ml-64 h-screen bg-transparent">
      <!-- Welcome Section -->
      <section
        class="bg-white shadow rounded-lg p-6 mb-6 border-l-4 border-gold"
      >
        <h1 class="text-3xl font-bold text-navy">
          Welcome to the School Portal
        </h1>
        <p class="text-gray-600 mt-2">
          Explore courses, announcements, and more.
        </p>
      </section>

      <div class="mb-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <!-- Announcements Section -->
        <section>
          <h2 class="text-2xl font-bold text-navy flex items-center">
            Announcements
          </h2>
          <div class="mt-4 space-y-4">
            <div
              v-for="announcement in limitedAnnouncements"
              :key="announcement.id"
              class="bg-white border-l-4 border-gold p-4 shadow rounded-lg"
            >
              <p class="text-gray-600">{{ announcement.content }}</p>
              <p class="text-gray-400 text-sm">
                Posted: {{ new Date(announcement.created_at).toLocaleString() }}
              </p>
            </div>
          </div>
        </section>

        <!-- Complaints Section -->
        <section>
          <h2 class="text-2xl font-bold text-navy flex items-center">
            Complaints
          </h2>
          <div class="mt-4 space-y-4">
            <div
              v-for="complaint in limitedComplaints"
              :key="complaint.id"
              class="bg-white border-l-4 p-4 shadow rounded-lg flex justify-between"
              :class="{
                'border-green-600': complaint.status === 'answered',
                'border-yellow-500': complaint.status === 'pending',
                'border-gray-300': complaint.status === 'noted',
              }"
            >
              <div>
                <p class="text-gray-600">{{ complaint.content }}</p>
                <p class="text-gray-400 text-sm">
                  Submitted: {{ complaint.created_at }}
                </p>
              </div>
              <div id="status" class="h-full flex items-center">
                <button
                  :class="{
                    'bg-green-600': complaint.status === 'answered',
                    'bg-yellow-500': complaint.status === 'pending',
                    'bg-gray-300': complaint.status === 'noted',
                  }"
                  class="text-white px-4 py-2 rounded-lg capitalize"
                >
                  {{ complaint.status }}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Courses Section -->
      <section class="mb-12">
        <h2 class="text-2xl font-bold text-navy flex items-center">
          My Courses
        </h2>
        <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="material in authStore.materials"
            :key="material.id"
            class="p-4 border-l-4 bg-white border-navy-lighter/65 text-white rounded-lg shadow"
          >
            <router-link
              :to="`/courses/${material.id}`"
              class="block hover:underline"
            >
              <h3 class="font-bold text-navy-light">{{ material.name }}</h3>
            </router-link>
            <p class="text-navy-lighter">
              Instructor: {{ material.instructor }}
            </p>
          </div>
        </div>
      </section>
    </main>
  </main>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useAuthStore } from "@/stores/auth"; // Import Pinia store

const authStore = useAuthStore();

// Fetch data when the component is mounted
onMounted(async () => {
  await authStore.fetchAnnouncements(); // Fetch announcements
  await authStore.fetchComplaints(); // Fetch user complaints
  await authStore.fetchMaterials(); // Fetch courses/materials
});

// Limit announcements and complaints to 2 items each
const limitedAnnouncements = computed(() =>
  authStore.announcements.slice(0, 2)
);
const limitedComplaints = computed(() => authStore.complaints.slice(0, 2));
</script>

<style scoped>
button {
  transition: transform 0.3s;
}
</style>
