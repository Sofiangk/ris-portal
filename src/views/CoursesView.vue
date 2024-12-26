<template>
  <div class="ml-64 grid grid-cols-1 gap-4 p-12 bg-slate-100 h-screen">
    <!-- Course List -->
    <section class="space-y-4 overflow-y-scroll h-80">
      <h2 class="text-2xl font-bold text-navy-light">My Courses</h2>
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
            <div v-if="selectedCourse.books.length === 0">
              No books available.
            </div>
            <ul v-else class="space-y-2">
              <li
                v-for="book in selectedCourse.books"
                :key="book.id"
                class="text-navy-lighter"
              >
                -
                <a
                  :href="book.url"
                  target="_blank"
                  class="text-navy-light underline hover:text-blue-600 hover:underline-offset-1 transition transform ease-in-out duration-200"
                >
                  {{ book.name }}
                </a>
              </li>
            </ul>
          </div>

          <!-- Announcements -->
          <div class="p-4 shadow border rounded-md border-navy-lighter/10">
            <h4 class="font-bold text-navy-light mb-2">Latest Announcements</h4>
            <div
              v-if="selectedCourse.announcements.length === 0"
              class="text-gray-500"
            >
              No announcements yet.
            </div>
            <ul v-else class="space-y-2">
              <li
                v-for="announcement in selectedCourse.announcements"
                :key="announcement.id"
                class="text-navy-light"
              >
                - {{ announcement.text }}
              </li>
            </ul>
          </div>

          <!-- Assignments -->
          <div class="p-4 shadow border rounded-md border-navy-lighter/10">
            <h4 class="font-bold text-navy-light mb-2">Assignments</h4>
            <div
              v-if="selectedCourse.assignments.length === 0"
              class="text-gray-500"
            >
              No assignments yet.
            </div>
            <ul v-else class="space-y-2">
              <li
                v-for="assignment in selectedCourse.assignments"
                :key="assignment.id"
                class="text-navy-light"
              >
                -
                <a
                  href="#"
                  class="text-navy-light underline hover:text-blue-600 hover:underline-offset-1 transition transform ease-in-out duration-200"
                >
                  {{ assignment.name }}
                </a>
                (Due: {{ assignment.dueDate }})
              </li>
            </ul>
          </div>

          <!-- Tests -->
          <div class="p-4 shadow border rounded-md border-navy-lighter/10">
            <h4 class="font-bold text-navy-light mb-2">Tests</h4>
            <div v-if="selectedCourse.tests.length === 0" class="text-gray-500">
              No tests yet.
            </div>
            <ul v-else class="space-y-2">
              <li
                v-for="test in selectedCourse.tests"
                :key="test.id"
                class="text-navy-lighter"
              >
                -
                <a
                  href="#"
                  class="text-navy-light underline hover:text-blue-600 hover:underline-offset-1 transition transform ease-in-out duration-200"
                >
                  {{ test.name }}
                </a>
                (Due: {{ test.dueDate }})
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
export default {
  data() {
    return {
      courses: [
        {
          id: 1,
          name: 'Math 101',
          instructor: 'Mr. John Doe',
          code: 'MATH101',
          credits: 3,
          announcements: [
            { id: 1, text: 'Welcome to Math 101!' },
            { id: 2, text: 'Homework #1 is due next week.' },
          ],
          assignments: [{ id: 1, name: 'Homework #1', dueDate: '2024-01-15' }],
          tests: [
            { id: 1, name: 'Test 1', dueDate: '2024-02-15' },
            { id: 2, name: 'Test 2', dueDate: '2024-03-15' },
          ],
          books: [
            {
              id: 1,
              name: 'Math Textbook',
              url: 'https://example.com/math-book.pdf',
            },
            {
              id: 2,
              name: 'Algebra Textbook',
              url: 'https://example.com/algebra-book.pdf',
            },
          ],
        },
        {
          id: 2,
          name: 'English 101',
          instructor: 'Ms. Jane Smith',
          code: 'ENG101',
          credits: 3,
          announcements: [
            { id: 1, text: 'Welcome to English 101!' },
            { id: 2, text: 'Homework #1 is due next week.' },
          ],
          assignments: [{ id: 1, name: 'Homework #1', dueDate: '2024-01-15' }],
          tests: [
            { id: 1, name: 'Test 1', dueDate: '2024-02-15' },
            { id: 2, name: 'Test 2', dueDate: '2024-03-15' },
          ],
          books: [
            {
              id: 1,
              name: 'English Textbook',
              url: 'https://example.com/english-book.pdf',
            },
            {
              id: 2,
              name: 'Grammar Textbook',
              url: 'https://example.com/grammar-book.pdf',
            },
          ],
        },
        {
          id: 3,
          name: 'Science 101',
          instructor: 'Mr. John Doe',
          code: 'SCI101',
          credits: 3,
          announcements: [
            { id: 1, text: 'Welcome to Science 101!' },
            { id: 2, text: 'Homework #1 is due next week.' },
          ],
          assignments: [{ id: 1, name: 'Homework #1', dueDate: '2024-01-15' }],
          tests: [
            { id: 1, name: 'Test 1', dueDate: '2024-02-15' },
            { id: 2, name: 'Test 2', dueDate: '2024-03-15' },
          ],
          books: [
            {
              id: 1,
              name: 'Science Textbook',
              url: 'https://example.com/science-book.pdf',
            },
          ],
        },
        {
          id: 4,
          name: 'History 101',
          instructor: 'Ms. Jane Smith',
          code: 'HIS101',
          credits: 3,
          announcements: [
            { id: 1, text: 'Welcome to History 101!' },
            { id: 2, text: 'Homework #1 is due next week.' },
          ],
          assignments: [{ id: 1, name: 'Homework #1', dueDate: '2024-01-15' }],
          tests: [
            { id: 1, name: 'Test 1', dueDate: '2024-02-15' },
            { id: 2, name: 'Test 2', dueDate: '2024-03-15' },
          ],
          books: [
            {
              id: 1,
              name: 'History Textbook',
              url: 'https://example.com/history-book.pdf',
            },
          ],
        },
        {
          id: 5,
          name: 'Chemistry 101',
          instructor: 'Mr. John Doe',
          code: 'CHEM101',
          credits: 3,
          announcements: [
            { id: 1, text: 'Welcome to Chemistry 101!' },
            { id: 2, text: 'Homework #1 is due next week.' },
          ],
          assignments: [{ id: 1, name: 'Homework #1', dueDate: '2024-01-15' }],
          tests: [
            { id: 1, name: 'Test 1', dueDate: '2024-02-15' },
            { id: 2, name: 'Test 2', dueDate: '2024-03-15' },
          ],
          books: [
            {
              id: 1,
              name: 'Chemistry Textbook',
              url: 'https://example.com/chemistry-book.pdf',
            },
          ],
        },
        {
          id: 6,
          name: 'Biology 101',
          instructor: 'Ms. Jane Smith',
          code: 'BIO101',
          credits: 3,
          announcements: [
            { id: 1, text: 'Welcome to Biology 101!' },
            { id: 2, text: 'Homework #1 is due next week.' },
          ],
          assignments: [{ id: 1, name: 'Homework #1', dueDate: '2024-01-15' }],
          tests: [
            { id: 1, name: 'Test 1', dueDate: '2024-02-15' },
            { id: 2, name: 'Test 2', dueDate: '2024-03-15' },
          ],
          books: [
            {
              id: 1,
              name: 'Biology Textbook',
              url: 'https://example.com/biology-book.pdf',
            },
          ],
        },
      ],
      selectedCourse: null,
    };
  },
  methods: {
    selectCourse(course) {
      this.selectedCourse = course;
    },
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
