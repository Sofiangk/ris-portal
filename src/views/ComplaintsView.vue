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
            'bg-green-600': filter === 'Resolved',
            'bg-gray-400': filter !== 'Resolved',
          }"
          @click="setFilter('Resolved')"
        >
          Resolved
        </button>
        <button
          class="px-4 py-2 rounded-lg shadow text-white"
          :class="{
            'bg-red-500': filter === 'Pending',
            'bg-gray-400': filter !== 'Pending',
          }"
          @click="setFilter('Pending')"
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
            'border-green-600': complaint.status === 'Resolved',
            'border-bloody-red': complaint.status === 'Pending',
          }"
        >
          <div>
            <h3 class="text-lg font-semibold text-navy-lighter">
              {{ complaint.title }}
            </h3>
            <p class="text-gray-600">Date: {{ complaint.date }}</p>
            <p class="text-gray-600">{{ complaint.description }}</p>
          </div>
          <div id="status" class="h-full flex items-center">
            <button
              class="px-4 py-2 rounded-lg text-white shadow"
              :class="{
                'bg-green-600': complaint.status === 'Resolved',
                'bg-red-500': complaint.status === 'Pending',
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
            <label class="block text-navy font-semibold mb-2">Title</label>
            <input
              type="text"
              v-model="newComplaint.title"
              class="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div class="mb-4">
            <label class="block text-navy font-semibold mb-2"
              >Description</label
            >
            <textarea
              v-model="newComplaint.description"
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
export default {
  data() {
    return {
      complaints: [
        {
          id: 1,
          title: 'Poor Grading System',
          date: 'November 15, 2024',
          description: 'The grading system is not fair.',
          status: 'Pending',
        },
        {
          id: 2,
          title: 'Missing Assignment',
          date: 'December 25, 2024',
          description: 'I missed a mandatory assignment.',
          status: 'Resolved',
        },
      ],
      filter: 'All',
      showNewComplaintModal: false,
      newComplaint: {
        title: '',
        description: '',
        status: 'Pending',
        date: new Date().toLocaleDateString(),
      },
    };
  },
  computed: {
    filteredComplaints() {
      if (this.filter === 'All') return this.complaints;
      return this.complaints.filter(
        (complaint) => complaint.status === this.filter
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
    addComplaint() {
      this.complaints.push({
        ...this.newComplaint,
        id: this.complaints.length + 1,
      });
      this.newComplaint = {
        title: '',
        description: '',
        status: 'Pending',
        date: new Date().toLocaleDateString(),
      };
      this.showNewComplaintModal = false;
    },
  },
};
</script>

<style scoped>
/* Modal Styling */
.modal-overlay {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
