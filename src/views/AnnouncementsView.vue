<template>
  <div class="ml-64 flex flex-col gap-4 p-12 bg-slate-100 h-screen">
    <!-- Page Header -->
    <header class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-navy">Announcements</h1>
      <button
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
                {{ announcement.title }}
              </h3>
              <p class="text-gray-600">Date: {{ announcement.date }}</p>
              <p class="text-gray-600">{{ announcement.message }}</p>
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
            <label class="block text-navy font-semibold mb-2">Title</label>
            <input
              type="text"
              v-model="newAnnouncement.title"
              class="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div class="mb-4">
            <label class="block text-navy font-semibold mb-2">Message</label>
            <textarea
              v-model="newAnnouncement.message"
              rows="4"
              class="w-full p-2 border border-gray-300 rounded-lg"
              required
            ></textarea>
          </div>
          <div class="mb-4 flex items-center">
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
export default {
  data() {
    return {
      announcements: [
        {
          id: 1,
          title: 'Welcome to the New Semester',
          date: 'December 20, 2024',
          message: 'The new semester starts on January 5th. Get ready!',
          urgent: false,
        },
        {
          id: 2,
          title: 'System Maintenance',
          date: 'December 25, 2024',
          message:
            'There will be scheduled maintenance on December 28th from 2:00 AM to 6:00 AM. The system will be inaccessible during this time.',
          urgent: true,
        },
      ],
      showNewAnnouncementModal: false,
      newAnnouncement: {
        title: '',
        message: '',
        urgent: false,
        date: new Date().toLocaleDateString(),
      },
    };
  },
  methods: {
    openNewAnnouncementModal() {
      this.showNewAnnouncementModal = true;
    },
    closeNewAnnouncementModal() {
      this.showNewAnnouncementModal = false;
    },
    addAnnouncement() {
      this.announcements.push({
        ...this.newAnnouncement,
        id: this.announcements.length + 1,
      });
      this.newAnnouncement = {
        title: '',
        message: '',
        urgent: false,
        date: new Date().toLocaleDateString(),
      };
      this.showNewAnnouncementModal = false;
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
