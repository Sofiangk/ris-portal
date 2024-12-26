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
        <section class="">
          <h2 class="text-2xl font-bold text-navy flex items-center">
            Announcements
            <router-link
              to="/announcements"
              class="ml-4 text-gold hover:underline"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </router-link>
          </h2>
          <div class="mt-4 space-y-4">
            <div
              class="bg-white border-l-4 border-bloody-red p-4 shadow rounded-lg"
            >
              <h3 class="text-lg font-semibold text-navy-lighter">
                School Closure
              </h3>
              <p class="text-gray-600">Date: December 25, 2023</p>
              <p class="text-gray-600">
                School will be closed for the holiday.
              </p>
            </div>
            <div
              class="bg-white border-l-4 border-bloody-red p-4 shadow rounded-lg"
            >
              <h3 class="text-lg font-semibold text-navy-lighter">
                New Semester
              </h3>
              <p class="text-gray-600">Date: January 10, 2024</p>
              <p class="text-gray-600">
                The new semester begins on January 15th.
              </p>
            </div>
          </div>
        </section>

        <!-- Complaints Section -->
        <section class="">
          <h2 class="text-2xl font-bold text-navy flex items-center">
            Complaints
            <router-link
              to="/complaints"
              class="ml-4 text-gold hover:underline"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </router-link>
          </h2>
          <div class="mt-4 space-y-4">
            <div
              class="bg-white border-l-4 border-bloody-red p-4 shadow rounded-lg flex justify-between"
            >
              <div>
                <h3 class="text-lg font-semibold text-navy-lighter">
                  Poor Grading System
                </h3>
                <p class="text-gray-600">Date: November 15, 2024</p>
                <p class="text-gray-600">The grading system is not fair.</p>
              </div>
              <div id="status" class="h-full flex items-center">
                <button class="bg-red-500 text-white px-4 py-2 rounded-lg">
                  Pending
                </button>
              </div>
            </div>
            <div
              class="bg-white border-l-4 border-green-600 p-4 shadow rounded-lg flex justify-between"
            >
              <div>
                <h3 class="text-lg font-semibold text-navy-lighter">
                  Missing Assignment
                </h3>
                <p class="text-gray-600">Date: December 25, 2024</p>
                <p class="text-gray-600">I missed a mandatory assignment.</p>
              </div>
              <div id="status" class="h-full flex items-center">
                <button class="bg-green-600 text-white px-4 py-2 rounded-lg">
                  Resolved
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- My Courses Section -->
      <section class="mb-12">
        <h2 class="text-2xl font-bold text-navy flex items-center">
          My Courses
          <router-link to="/courses" class="ml-4 text-gold hover:underline">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </router-link>
        </h2>
        <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            class="p-4 border-l-4 bg-white border-navy-lighter/65 text-white rounded-lg shadow"
          >
            <h3 class="font-bold text-navy-light">Math 101</h3>
            <p class="text-navy-lighter">Instructor: Mr. John Doe</p>
          </div>
          <div
            class="p-4 border-l-4 bg-white border-navy-lighter/65 text-white rounded-lg shadow"
          >
            <h3 class="font-bold text-navy-light">History 101</h3>
            <p class="text-navy-lighter">Instructor: Ms. Jane Smith</p>
          </div>
          <div
            class="p-4 border-l-4 bg-white border-navy-lighter/65 text-white rounded-lg shadow"
          >
            <h3 class="font-bold text-navy-light">History 101</h3>
            <p class="text-navy-lighter">Instructor: Ms. Jane Smith</p>
          </div>
          <div
            class="p-4 border-l-4 bg-white border-navy-lighter/65 text-white rounded-lg shadow"
          >
            <h3 class="font-bold text-navy-light">History 101</h3>
            <p class="text-navy-lighter">Instructor: Ms. Jane Smith</p>
          </div>
          <div
            class="p-4 border-l-4 bg-white border-navy-lighter/65 text-white rounded-lg shadow"
          >
            <h3 class="font-bold text-navy-light">History 101</h3>
            <p class="text-navy-lighter">Instructor: Ms. Jane Smith</p>
          </div>
          <div
            class="p-4 border-l-4 bg-white border-navy-lighter/65 text-white rounded-lg shadow"
          >
            <h3 class="font-bold text-navy-light">History 101</h3>
            <p class="text-navy-lighter">Instructor: Ms. Jane Smith</p>
          </div>
        </div>
      </section>
    </main>
  </main>
</template>

<script setup></script>

<style scoped>
button {
  transition: transform 0.3s;
}
</style>
