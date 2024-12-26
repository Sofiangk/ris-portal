<template>
  <div class="ml-64 p-12 bg-slate-100 h-screen">
    <div class="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
      <h1 class="text-2xl font-bold text-navy mb-4">Profile</h1>
      <div class="grid grid-cols-2 gap-6">
        <div>
          <label class="block text-gray-700 font-semibold mb-2"
            >Full Name</label
          >
          <input
            type="text"
            v-model="profile.fullName"
            class="w-full p-2 border border-gray-300 rounded-lg"
            readonly
          />
        </div>
        <div>
          <label class="block text-gray-700 font-semibold mb-2">Email</label>
          <input
            type="email"
            v-model="profile.email"
            class="w-full p-2 border border-gray-300 rounded-lg"
            readonly
          />
        </div>
      </div>
      <div class="mt-6">
        <label class="block text-gray-700 font-semibold mb-2">Bio</label>
        <textarea
          v-model="profile.bio"
          rows="4"
          class="w-full p-2 border border-gray-300 rounded-lg"
        ></textarea>
      </div>
      <div class="mt-6 flex justify-end">
        <button
          @click="updateProfile"
          class="bg-gold text-white px-6 py-2 rounded-lg hover:bg-yellow-600 shadow"
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      profile: {
        fullName: 'John Doe',
        email: 'johndoe@example.com',
        bio: 'This is your bio. Add some details about yourself.',
      },
    };
  },
  methods: {
    updateProfile() {
      alert('Profile updated successfully!');
    },
  },
};
</script>
