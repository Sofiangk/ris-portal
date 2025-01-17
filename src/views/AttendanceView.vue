<template>
  <div
    v-if="isAdmin"
    class="ml-64 grid grid-cols-1 gap-4 p-12 bg-slate-100 h-screen"
  >
    <!-- Course Selection -->
    <section class="space-y-4 overflow-y-scroll h-80">
      <h2 class="text-xl font-bold text-navy-light">Select Course</h2>
      <div
        v-if="courses.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
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
      <p v-else class="text-gray-500">No courses available.</p>
    </section>

    <!-- Attendance Section -->
    <section
      v-if="selectedCourse"
      class="min-h-80 overflow-y-scroll bottom-0 bg-white rounded-lg shadow p-6 text-navy"
    >
      <h2 class="text-lg font-bold text-navy-light mb-4">
        Attendance for {{ selectedCourse.name }}
      </h2>
      <div
        v-if="selectedCourse.students && selectedCourse.students.length > 0"
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        <!-- Student Buttons -->
        <button
          v-for="student in selectedCourse.students"
          :key="student.id"
          class="p-4 rounded-lg text-white font-bold shadow cursor-pointer text-center transition-transform transform hover:scale-105"
          :class="{
            'bg-green-500 hover:bg-green-600':
              attendanceData[student.id] === 'Present',
            'bg-red-500 hover:bg-red-600':
              attendanceData[student.id] === 'Absent',
          }"
          @click="toggleAttendance(student)"
        >
          {{ student.name }} <br />
          <span class="text-sm font-normal">{{
            attendanceData[student.id]
          }}</span>
        </button>
      </div>
      <div v-else class="text-gray-500">
        No students are enrolled in this course.
      </div>
    </section>

    <!-- Placeholder when no course is selected -->
    <section v-else class="text-gray-500">
      Please select a course to view attendance.
    </section>
  </div>

  <!-- Unauthorized Page -->
  <div v-else class="flex items-center justify-center h-screen text-gray-500">
    <h1 class="text-2xl font-bold">Unauthorized Access</h1>
  </div>
</template>

<script>
import axios from "axios";
import { useAuthStore } from "@/stores/auth"; // Pinia store to check user role

export default {
  data() {
    return {
      courses: [], // Dynamically fetched courses
      selectedCourse: null, // Currently selected course
      attendanceData: {}, // Local storage for attendance states
      isAdmin: false, // Check if the user is an admin
    };
  },
  methods: {
    // Fetch courses from the backend
    async fetchCourses() {
      const apiUrl = import.meta.env.VITE_APP_API_URL; // Backend API URL
      const token = localStorage.getItem("token"); // Get the token from local storage

      try {
        const response = await axios.get(`${apiUrl}admin/materials`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
          },
        });

        // Map backend response and add fake student data
        this.courses = response.data.map((course) => ({
          id: course.id,
          name: course.name,
          instructor: course.instructor || "Unknown",
          students: this.generateFakeStudents(), // Add fake students
        }));

        // Initialize attendanceData for each student
        this.courses.forEach((course) => {
          course.students.forEach((student) => {
            if (!this.attendanceData[student.id]) {
              this.attendanceData[student.id] = student.attendance;
            }
          });
        });

        console.log("Courses fetched successfully:", this.courses);
      } catch (error) {
        console.error("Error fetching courses:", error.message, error.response);
        alert("Failed to fetch courses. Please try again.");
      }
    },
    // Generate fake students with random attendance
    generateFakeStudents() {
      const studentNames = [
        "Alice Johnson",
        "Bob Smith",
        "Charlie Brown",
        "David Lee",
        "Emily Davis",
        "Frank Miller",
        "Grace Lee",
        "Henry Ford",
        "Isabel Wright",
        "John Doe",
      ];

      // Randomly select 5-10 students and assign attendance
      const studentCount = Math.floor(Math.random() * 6) + 5; // 5 to 10 students
      return Array.from({ length: studentCount }, (_, index) => ({
        id: index + 1,
        name: studentNames[index % studentNames.length],
        attendance: Math.random() > 0.5 ? "Present" : "Absent", // Random attendance
      }));
    },
    // Select a course to view attendance
    selectCourse(course) {
      this.selectedCourse = course;
    },
    // Toggle attendance for a student
    toggleAttendance(student) {
      this.attendanceData[student.id] =
        this.attendanceData[student.id] === "Present" ? "Absent" : "Present";

      console.log(
        `Attendance for ${student.name} updated to: ${
          this.attendanceData[student.id]
        }`
      );
    },
  },
  async mounted() {
    // Check if the user is an admin
    const authStore = useAuthStore();
    this.isAdmin = authStore.role === "admin";

    // If admin, fetch courses
    if (this.isAdmin) {
      await this.fetchCourses();
    }
  },
};
</script>

<style scoped>
/* Add hover and motion effects for student buttons */
button:hover {
  transition: transform 0.2s ease, background-color 0.2s ease;
}
</style>
