<template>
  <div class="ml-64 flex flex-col gap-4 p-12 bg-slate-100 h-screen">
    <!-- Page Header -->
    <header class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-navy">Complaints</h1>
      <!-- Show "New Complaint" button only for students -->
      <button
        v-if="isStudent"
        class="bg-bloody-red text-white px-6 py-2 rounded-lg hover:bg-red-600 shadow"
        @click="openNewComplaintModal"
      >
        New Complaint
      </button>
    </header>

    <!-- Filters -->
    <section class="mb-6 h-fit">
      <h2 class="text-lg font-bold text-navy-light">Filter Complaints</h2>
      <div class="flex space-x-4 mt-4">
        <button
          class="px-4 py-2 rounded-lg shadow text-white"
          :class="{
            'bg-green-600': filter === 'answered',
            'bg-gray-400': filter !== 'answered',
          }"
          @click="setFilter('answered')"
        >
          Resolved
        </button>
        <button
          class="px-4 py-2 rounded-lg shadow text-white"
          :class="{
            'bg-red-500': filter === 'pending',
            'bg-gray-400': filter !== 'pending',
          }"
          @click="setFilter('pending')"
        >
          Pending
        </button>
        <button
          class="px-4 py-2 rounded-lg shadow text-white bg-blue-500 hover:bg-blue-600"
          @click="setFilter('All')"
        >
          All
        </button>
      </div>
    </section>

    <!-- Complaints List -->
    <section>
      <div
        class="mt-4 space-y-4 w-full flex flex-col h-full overflow-y-scroll items-start justify-start"
      >
        <div
          v-for="complaint in filteredComplaints"
          :key="complaint.id"
          class="bg-white border-l-4 w-full p-4 shadow rounded-lg flex justify-between"
          :class="{
            'border-green-600': complaint.status === 'answered',
            'border-bloody-red': complaint.status === 'pending',
          }"
        >
          <div>
            <h3 class="text-lg font-semibold text-navy-lighter">
              Complaint #{{ complaint.id }}
            </h3>
            <p class="text-gray-600">Date: {{ complaint.created_at }}</p>
            <p class="text-gray-600">{{ complaint.content }}</p>
          </div>
          <div id="status" class="h-full flex items-center">
            <!-- Admin can change the status -->
            <select
              v-if="isAdmin"
              v-model="complaint.status"
              @change="updateComplaintStatus(complaint)"
              class="px-4 py-2 rounded-lg shadow text-navy-light"
            >
              <option value="pending">Pending</option>
              <option value="answered">Resolved</option>
            </select>

            <!-- Students can only view the status -->
            <button
              v-else
              class="px-4 py-2 rounded-lg text-white shadow"
              :class="{
                'bg-green-600': complaint.status === 'answered',
                'bg-red-500': complaint.status === 'pending',
              }"
            >
              {{ complaint.status }}
            </button>
          </div>
        </div>
        <div v-if="filteredComplaints.length === 0" class="text-gray-500">
          No complaints found for the selected filter.
        </div>
      </div>
    </section>

    <!-- New Complaint Modal (only for students) -->
    <div
      v-if="isStudent && showNewComplaintModal"
      class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <h2 class="text-xl font-bold text-navy mb-4">New Complaint</h2>
        <form @submit.prevent="addComplaint">
          <div class="mb-4">
            <label class="block text-navy font-semibold mb-2">Complaint</label>
            <textarea
              v-model="newComplaint.content"
              rows="4"
              class="w-full p-2 border border-gray-300 rounded-lg"
              required
            ></textarea>
          </div>
          <div class="flex justify-end space-x-4">
            <button
              type="button"
              class="bg-gray-300 text-navy px-4 py-2 rounded-lg"
              @click="closeNewComplaintModal"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
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
import { useAuthStore } from "@/stores/auth";

export default {
  data() {
    return {
      complaints: [], // Complaints list
      filter: "All", // Default filter
      showNewComplaintModal: false, // Modal visibility
      newComplaint: {
        content: "", // Complaint content
      },
    };
  },
  computed: {
    // Role-based access control
    isAdmin() {
      const authStore = useAuthStore();
      return authStore.role === "admin";
    },
    isStudent() {
      const authStore = useAuthStore();
      return authStore.role === "student";
    },

    // Filter complaints based on status
    filteredComplaints() {
      if (this.filter === "All") return this.complaints;
      return this.complaints.filter(
        (complaint) =>
          complaint.status.toLowerCase() === this.filter.toLowerCase()
      );
    },
  },
  methods: {
    setFilter(status) {
      this.filter = status;
    },
    openNewComplaintModal() {
      this.showNewComplaintModal = true;
    },
    closeNewComplaintModal() {
      this.showNewComplaintModal = false;
    },

    // Fetch complaints for admin or student
    async fetchComplaints() {
      const apiUrl = import.meta.env.VITE_APP_API_URL;
      const token = localStorage.getItem("token");
      const route = this.isAdmin
        ? "admin/complaints"
        : "students/user-complaints"; // Admin or student route

      try {
        const response = await axios.get(`${apiUrl}${route}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const complaintsData = response.data.complaints;
        this.complaints = complaintsData.map((complaint) => ({
          id: complaint.id,
          content: complaint.content,
          status: complaint.status.toLowerCase(),
          created_at: new Date(complaint.created_at).toLocaleDateString(),
        }));
      } catch (error) {
        console.error("Error fetching complaints:", error.message);
      }
    },

    // Submit new complaint (students only)
    async addComplaint() {
      const apiUrl = import.meta.env.VITE_APP_API_URL;
      const token = localStorage.getItem("token");

      try {
        const response = await axios.post(
          `${apiUrl}students/complaints`,
          { content: this.newComplaint.content },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Add the new complaint to the complaints list
        this.complaints.unshift({
          id: response.data.complaint.id,
          content: response.data.complaint.content,
          status: "pending",
          created_at: new Date(
            response.data.complaint.created_at
          ).toLocaleDateString(),
        });

        // Reset modal and inputs
        this.newComplaint.content = "";
        this.showNewComplaintModal = false;
        alert("Complaint submitted successfully!");
      } catch (error) {
        console.error("Error submitting complaint:", error.message);
        alert("Failed to submit complaint. Please try again.");
      }
    },

    // Update complaint status (admin only)
    async updateComplaintStatus(complaint) {
      const apiUrl = import.meta.env.VITE_APP_API_URL;
      const token = localStorage.getItem("token");

      try {
        const response = await axios.post(
          `${apiUrl}admin/complaints/${complaint.id}/respond`,
          { status: complaint.status },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert(response.data.message || "Complaint status updated!");
      } catch (error) {
        console.error("Error updating complaint status:", error.message);
        alert("Failed to update complaint status.");
      }
    },
  },
  mounted() {
    this.fetchComplaints(); // Fetch complaints on component mount
  },
};
</script>

<style scoped>
/* Styling for the dropdown select */
select {
  border: 1px solid #d1d5db;
  cursor: pointer;
  outline: none;
}
select:hover {
  border-color: #1d4ed8;
  transition: 0.2s ease-in-out;
}
</style>
