<template>
  <div class="ml-64 flex flex-col gap-4 p-12 bg-slate-100 h-screen">
    <!-- Page Header -->
    <header class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-navy">Announcements</h1>
      <!-- Show New Announcement button only for admin -->
      <button
        v-if="isAdmin"
        class="bg-navy-lighter text-white px-6 py-2 rounded-lg hover:bg-navy shadow"
        @click="openNewAnnouncementModal"
      >
        New Announcement
      </button>
    </header>

    <!-- Announcements List -->
    <section>
      <div class="mt-4 space-y-4">
        <div
          v-for="announcement in announcements"
          :key="announcement.id"
          class="bg-white border-l-4 border-navy p-4 shadow rounded-lg"
        >
          <div class="flex justify-between items-start">
            <div>
              <h3 class="text-lg font-semibold text-navy-lighter">
                Announcement #{{ announcement.id }}
              </h3>
              <p class="text-gray-600">
                Date:
                {{ new Date(announcement.created_at).toLocaleDateString() }}
              </p>
              <p class="text-gray-600">{{ announcement.content }}</p>
            </div>
            <div class="ml-4">
              <button
                v-if="announcement.urgent"
                class="bg-bloody-red text-white px-3 py-1 rounded-lg text-sm"
              >
                Urgent
              </button>
            </div>
          </div>
        </div>
        <div v-if="announcements.length === 0" class="text-gray-500">
          No announcements to display.
        </div>
      </div>
    </section>

    <!-- New Announcement Modal -->
    <div
      v-if="showNewAnnouncementModal"
      class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <h2 class="text-xl font-bold text-navy mb-4">New Announcement</h2>
        <form @submit.prevent="addAnnouncement">
          <div class="mb-4">
            <label class="block text-navy font-semibold mb-2">Message</label>
            <textarea
              v-model="newAnnouncement.content"
              rows="4"
              class="w-full p-2 border border-gray-300 rounded-lg"
              required
            ></textarea>
          </div>
          <div class="flex items-center mb-4">
            <label class="text-navy font-semibold mr-2">Mark as Urgent</label>
            <input
              type="checkbox"
              v-model="newAnnouncement.urgent"
              class="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
            />
          </div>
          <div class="flex justify-end space-x-4">
            <button
              type="button"
              class="bg-gray-300 text-navy px-4 py-2 rounded-lg"
              @click="closeNewAnnouncementModal"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-gold text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      announcements: [], // Dynamic announcements array
      showNewAnnouncementModal: false, // Modal visibility
      newAnnouncement: {
        content: "",
        urgent: false,
      },
      isAdmin: false, // Flag to check if the user is an admin
    };
  },
  methods: {
    // Open modal for adding a new announcement
    openNewAnnouncementModal() {
      this.showNewAnnouncementModal = true;
    },
    // Close the modal
    closeNewAnnouncementModal() {
      this.showNewAnnouncementModal = false;
    },
    // Fetch announcements from the backend
    async fetchAnnouncements() {
      const apiUrl = import.meta.env.VITE_APP_API_URL; // Backend API URL from environment variables
      const token = localStorage.getItem("token"); // Get token from local storage

      try {
        const response = await axios.get(`${apiUrl}announcements`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers for authentication
          },
        });

        // Map the response to match frontend requirements
        this.announcements = response.data.map((announcement) => ({
          id: announcement.id,
          content: announcement.content,
          created_at: announcement.created_at,
        }));
      } catch (error) {
        console.error("Error fetching announcements:", error.message);
      }
    },
    // Add a new announcement (admin only)
    async addAnnouncement() {
      const apiUrl = import.meta.env.VITE_APP_API_URL; // Backend API URL
      const token = localStorage.getItem("token"); // Get token from local storage

      try {
        const response = await axios.post(
          `${apiUrl}admin/announcements`,
          {
            content: this.newAnnouncement.content,
            urgent: this.newAnnouncement.urgent,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in headers
            },
          }
        );

        // Add the new announcement to the list
        this.announcements.unshift({
          id: response.data.announcement.id,
          content: response.data.announcement.content,
          urgent: this.newAnnouncement.urgent,
          created_at: response.data.announcement.created_at,
        });

        // Clear the modal form and close it
        this.newAnnouncement = {
          content: "",
          urgent: false,
        };
        this.showNewAnnouncementModal = false;

        alert("Announcement created successfully!");
      } catch (error) {
        console.error("Error creating announcement:", error.message);
        alert("Failed to create announcement. Please try again.");
      }
    },
    // Check if the logged-in user is an admin
    checkAdminRole() {
      const role = localStorage.getItem("role");
      this.isAdmin = role === "admin";
    },
  },
  mounted() {
    // Check user role on component mount
    this.checkAdminRole();

    // Fetch announcements
    this.fetchAnnouncements();
  },
};
</script>

<style scoped>
/* Modal Styling */
.modal-overlay {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
