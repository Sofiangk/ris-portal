<template>
  <div class="ml-64 flex flex-col gap-4 p-12 bg-slate-100 h-screen">
    <!-- Page Header -->
    <header class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-navy">Complaints</h1>
      <button
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
            <button
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

    <!-- New Complaint Modal -->
    <div
      v-if="showNewComplaintModal"
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

export default {
  data() {
    return {
      complaints: [], // Dynamic complaints array
      filter: "All", // Default filter
      showNewComplaintModal: false, // Modal visibility
      newComplaint: {
        content: "", // Complaint content
      },
    };
  },
  computed: {
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
    async fetchComplaints() {
      const apiUrl = import.meta.env.VITE_APP_API_URL; // Your backend API base URL
      const token = localStorage.getItem("token"); // Get token from local storage

      try {
        const response = await axios.get(`${apiUrl}students/user-complaints`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Access the 'complaints' key in the response
        const complaintsData = response.data.complaints;

        // Map backend complaints to match frontend requirements
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
    async addComplaint() {
      const apiUrl = import.meta.env.VITE_APP_API_URL; // Your backend API base URL
      const token = localStorage.getItem("token"); // Get token from local storage

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
          status: "pending", // Default status is pending
          created_at: new Date(
            response.data.complaint.created_at
          ).toLocaleDateString(),
        });

        // Clear the form and close the modal
        this.newComplaint.content = "";
        this.showNewComplaintModal = false;

        alert("Complaint submitted successfully!");
      } catch (error) {
        console.error("Error submitting complaint:", error.message);
        alert("Failed to submit complaint. Please try again.");
      }
    },
  },
  mounted() {
    this.fetchComplaints();
  },
};
</script>

<style scoped>
/* Modal Styling */
.modal-overlay {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
