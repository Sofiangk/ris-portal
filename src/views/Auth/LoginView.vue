<template>
  <div class="flex flex-col items-center justify-center h-screen bg-slate-100">
    <div
      class="p-6 text-left flex items-center justify-center space-x-5 font-black"
    >
      <img class="w-16 mx-auto" src="@/assets/RIS School.png" alt="" />
      <h1 class="text-lg leading-tight font-bold text-navy">
        Riada International School
      </h1>
    </div>
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold text-navy mb-6">Login</h1>
      <form @submit.prevent="login">
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
          Login
        </button>
      </form>
      <p class="text-center text-gray-600 mt-4">
        Don't have an account?
        <router-link to="/signup" class="text-bloody-red hover:underline">
          Sign up
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      alert(`Logging in as ${this.email}`);
    },
  },
};
</script>
