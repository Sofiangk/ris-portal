<template>
  <div class="ml-64 grid grid-cols-1 gap-4 p-12 bg-slate-100 h-screen">
    <!-- Course List -->
    <section class="space-y-4 overflow-y-scroll h-80">
      <h2 class="text-2xl font-bold text-navy-light">
        {{ isAdmin ? "All Courses" : "My Courses" }}
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="course in courses"
          :key="course.id"
          class="p-4 border-l-4 bg-white border-navy-lighter/65 text-white rounded-lg shadow cursor-pointer transition transform hover:-translate-y-0.5 hover:shadow-md"
          :class="{
            'border-navy-light bg-navy-light/10':
              selectedCourse?.id === course.id,
          }"
          @click="selectCourse(course)"
        >
          <h3 class="font-bold text-navy-light">{{ course.name }}</h3>
          <p class="text-navy-lighter">Instructor: {{ course.instructor }}</p>
        </div>
      </div>
    </section>

    <!-- Course Details -->
    <section
      class="min-h-80 overflow-y-scroll bottom-0 bg-white rounded-lg shadow p-6 text-navy"
    >
      <div v-if="selectedCourse">
        <!-- Instructor Details -->
        <div
          class="mb-6 p-4 grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-navy-lighter/30"
        >
          <p class="text-navy-lighter">
            <strong>Course Name:</strong> {{ selectedCourse.name }}
          </p>
          <p class="text-navy-lighter">
            <strong>Instructor:</strong> {{ selectedCourse.instructor }}
          </p>
          <p class="text-navy-lighter">
            <strong>Code:</strong> {{ selectedCourse.code }}
          </p>
          <p class="text-navy-lighter">
            <strong>Credits:</strong> {{ selectedCourse.credits }}
          </p>
        </div>
        <div class="mb-4 gap-4 grid grid-cols-1 md:grid-cols-2">
          <!-- Download Books -->
          <div class="p-4 shadow border rounded-md border-navy-lighter/10">
            <h4 class="font-bold text-navy-light mb-2">Download Books</h4>
            <!-- Check if books_download_link exists -->
            <div v-if="!selectedCourse.books_download_link">
              No books available.
            </div>
            <ul v-else class="space-y-2">
              <li class="text-navy-lighter">
                -
                <a
                  :href="selectedCourse.books_download_link"
                  target="_blank"
                  class="text-navy-light underline hover:text-blue-600 hover:underline-offset-1 transition transform ease-in-out duration-200"
                >
                  Download Book
                </a>
              </li>
            </ul>
          </div>

          <!-- Assignments -->
          <div class="p-4 shadow border rounded-md border-navy-lighter/10">
            <h4 class="font-bold text-navy-light mb-2">Assignments</h4>
            <div
              v-if="
                !selectedCourse.assignments ||
                !selectedCourse.assignments.length
              "
              class="text-gray-500"
            >
              No assignments yet.
            </div>
            <ul v-else class="space-y-2">
              <li
                v-for="(assignment, index) in selectedCourse.assignments"
                :key="index"
                class="text-navy-lighter"
              >
                {{ assignment.title }} (Due: {{ assignment.due_date }})
              </li>
            </ul>
          </div>

          <!-- Tests -->
          <div class="p-4 shadow border rounded-md border-navy-lighter/10">
            <h4 class="font-bold text-navy-light mb-2">Tests</h4>
            <div
              v-if="!selectedCourse.tests || !selectedCourse.tests.length"
              class="text-gray-500"
            >
              No tests yet.
            </div>
            <ul v-else class="space-y-2">
              <li
                v-for="(test, index) in selectedCourse.tests"
                :key="index"
                class="text-navy-lighter"
              >
                {{ test.title }} (Date: {{ test.date }})
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Placeholder for when no course is selected -->
      <div v-else class="text-gray-500">
        Please select a course from the list to view details.
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import { useAuthStore } from "@/stores/auth"; // Import Pinia store

export default {
  data() {
    return {
      courses: [], // To store fetched courses
      selectedCourse: null, // To track the selected course
    };
  },
  computed: {
    // Check if the user is an admin or a student
    isAdmin() {
      const authStore = useAuthStore();
      return authStore.role === "admin";
    },
  },
  methods: {
    // Fetch courses dynamically based on user role
    async fetchCourses() {
      const apiUrl = import.meta.env.VITE_APP_API_URL; // Base URL from environment variables
      const token = localStorage.getItem("token"); // Retrieve token from local storage
      const role = localStorage.getItem("role"); // Retrieve role from local storage

      // Determine the route to call based on the role
      const route =
        role === "admin" ? "admin/getAllCourses" : "students/materials";

      try {
        const response = await axios.get(`${apiUrl}${route}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the header
          },
        });

        // Map and process the response
        this.courses = response.data.map((course) => ({
          id: course.id,
          name: course.name,
          code: course.code,
          instructor: course.instructor || "Unknown",
          credits: course.credits || "N/A",
          books_download_link: course.books_download_link || null,
          assignments: course.assignments || [],
          tests: course.tests || [],
        }));

        console.log("Courses fetched successfully:", this.courses);
      } catch (error) {
        console.error(
          "Failed to fetch courses:",
          error.response || error.message
        );
        alert("Failed to fetch courses. Please try again.");
      }
    },

    // Handle course selection
    selectCourse(course) {
      this.selectedCourse = course;
    },
  },
  mounted() {
    // Fetch the courses when the component is mounted
    this.fetchCourses();
  },
};
</script>

<style scoped>
/* General hover and transition effects */
div.cursor-pointer:hover {
  background-color: rgba(26, 47, 74, 0.1); /* Navy-light hover background */
  transition: background-color 0.8s ease, transform 0.2s ease;
}
</style>
