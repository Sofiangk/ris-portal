<template>
  <div class="ml-64 p-12 bg-slate-100 h-screen">
    <div class="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
      <h1 class="text-2xl font-bold text-navy mb-4">Profile</h1>
      <div class="grid grid-cols-2 gap-6">
        <!-- Full Name -->
        <div>
          <label class="block text-gray-700 font-semibold mb-2"
            >Full Name</label
          >
          <input
            type="text"
            v-model="profile.name"
            class="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <!-- Email -->
        <div>
          <label class="block text-gray-700 font-semibold mb-2">Email</label>
          <input
            type="email"
            v-model="profile.email"
            class="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      <!-- Save Button -->
      <div class="mt-6 flex justify-end">
        <button
          @click="updateProfile"
          class="bg-gold text-white px-6 py-2 rounded-lg hover:bg-yellow-600 shadow"
          :disabled="isUpdating"
        >
          <span v-if="!isUpdating">Save Changes</span>
          <span v-else>Updating...</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useAuthStore } from "@/stores/auth";

export default {
  data() {
    return {
      profile: {
        name: "", // User's name
        email: "", // User's email
      },
      isUpdating: false, // Button loading state
    };
  },
  methods: {
    async fetchProfile() {
      // Fetch the user's profile (example of loading the profile if needed)
      const authStore = useAuthStore();
      this.profile.name = authStore.name; // Load name from the auth store
      this.profile.email = authStore.email; // Load email from the auth store
    },
    async updateProfile() {
      this.isUpdating = true;
      const apiUrl = import.meta.env.VITE_APP_API_URL; // Backend API URL
      const token = localStorage.getItem("token"); // Get the user's token

      try {
        const response = await axios.post(
          `${apiUrl}profile`,
          {
            name: this.profile.name,
            email: this.profile.email,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token for authentication
            },
          }
        );

        // On success, update local storage and display a success message
        const updatedUser = response.data.user;
        const authStore = useAuthStore();
        authStore.name = updatedUser.name; // Update the name in the auth store
        authStore.email = updatedUser.email; // Update the email in the auth store
        localStorage.setItem("name", updatedUser.name);
        localStorage.setItem("email", updatedUser.email);

        alert("Profile updated successfully!");
      } catch (error) {
        console.error(
          "Error updating profile:",
          error.response || error.message
        );
        alert("Failed to update profile. Please try again.");
      } finally {
        this.isUpdating = false;
      }
    },
  },
  mounted() {
    this.fetchProfile(); // Load the user's profile when the component is mounted
  },
};
</script>

<style scoped>
button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
