<template>
  <div class="flex items-center justify-center h-screen bg-slate-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold text-navy mb-6">Sign Up</h1>
      <form @submit.prevent="signup">
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold mb-2"
            >Full Name</label
          >
          <input
            type="text"
            v-model="fullName"
            class="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold mb-2">Email</label>
          <input
            type="email"
            v-model="email"
            class="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 font-semibold mb-2">Password</label>
          <input
            type="password"
            v-model="password"
            class="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          class="bg-gold text-white px-6 py-2 w-full rounded-lg hover:bg-yellow-600 shadow"
        >
          Sign Up
        </button>
      </form>
      <p class="text-center text-gray-600 mt-4">
        Already have an account?
        <router-link to="/login" class="text-bloody-red hover:underline">
          Login
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fullName: '',
      email: '',
      password: '',
    };
  },
  methods: {
    signup() {
      alert(`Signed up as ${this.fullName}`);
    },
  },
};
</script>
