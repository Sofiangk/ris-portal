<template>
  <div class="ml-64 grid grid-cols-1 gap-4 p-12 bg-slate-100 h-screen">
    <!-- Course Selection -->
    <section class="space-y-4 overflow-y-scroll h-80">
      <h2 class="text-xl font-bold text-navy-light">Select Course</h2>
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

    <!-- Attendance Section -->
    <section
      v-if="selectedCourse"
      class="min-h-80 overflow-y-scroll bottom-0 bg-white rounded-lg shadow p-6 text-navy"
    >
      <h2 class="text-lg font-bold text-navy-light mb-4">
        Attendance for {{ selectedCourse.name }}
      </h2>
      <div
        v-if="selectedCourse.students.length > 0"
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        <!-- Student Buttons -->
        <button
          v-for="student in selectedCourse.students"
          :key="student.id"
          class="p-4 rounded-lg text-white font-bold shadow cursor-pointer text-center transition-transform transform hover:scale-105"
          :class="{
            'bg-green-500 hover:bg-green-600': student.attendance === 'Present',
            'bg-red-500 hover:bg-red-600': student.attendance === 'Absent',
          }"
          @click="toggleAttendance(student)"
        >
          {{ student.name }} <br />
          <span class="text-sm font-normal">{{ student.attendance }}</span>
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
</template>

<script>
export default {
  data() {
    return {
      courses: [
        {
          id: 1,
          name: 'Math 101',
          instructor: 'Mr. John Doe',
          students: [
            { id: 1, name: 'Alice Johnson', attendance: 'Present' },
            { id: 2, name: 'Bob Smith', attendance: 'Absent' },
            { id: 3, name: 'Charlie Brown', attendance: 'Present' },
          ],
        },
        {
          id: 2,
          name: 'English 101',
          instructor: 'Ms. Jane Smith',
          students: [
            { id: 1, name: 'Eve Davis', attendance: 'Present' },
            { id: 2, name: 'Frank Miller', attendance: 'Absent' },
            { id: 3, name: 'Grace Lee', attendance: 'Absent' },
          ],
        },
        {
          id: 3,
          name: 'Science 101',
          instructor: 'Mr. John Doe',
          students: [],
        },
      ],
      selectedCourse: null,
    };
  },
  methods: {
    selectCourse(course) {
      this.selectedCourse = course;
    },
    toggleAttendance(student) {
      student.attendance =
        student.attendance === 'Present' ? 'Absent' : 'Present';
    },
  },
};
</script>

<style scoped>
/* Add hover and motion effects for student buttons */
button:hover {
  transition: transform 0.2s ease, background-color 0.2s ease;
}
</style>
