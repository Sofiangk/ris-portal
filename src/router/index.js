import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CoursesView from "@/views/CoursesView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import AttendanceView from "@/views/AttendanceView.vue";
import ComplaintsView from "@/views/ComplaintsView.vue";
import AnnouncementsView from "@/views/AnnouncementsView.vue";

import ProfileView from "@/views/Profile/ProfileView.vue";

import LoginView from "@/views/Auth/LoginView.vue";
import SignupView from "@/views/Auth/SignupView.vue";

// Import Pinia store
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: "bg-navy-light/5 text-gold hover:bg-navy-lighter/5",
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { requiresAuth: true }, // Add requiresAuth meta field
    },
    {
      path: "/courses",
      name: "courses",
      component: CoursesView,
      meta: { requiresAuth: true }, // Add requiresAuth meta field
    },
    {
      path: "/attendance",
      name: "attendance",
      component: AttendanceView,
      meta: { requiresAuth: true }, // Add requiresAuth meta field
    },
    {
      path: "/complaints",
      name: "complaints",
      component: ComplaintsView,
      meta: { requiresAuth: true }, // Add requiresAuth meta field
    },
    {
      path: "/announcements",
      name: "announcements",
      component: AnnouncementsView,
      meta: { requiresAuth: true }, // Add requiresAuth meta field
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfileView,
      meta: { requiresAuth: true }, // Add requiresAuth meta field
    },

    // Auth
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: { requiresAuth: false }, // No authentication required for login
    },
    {
      path: "/signup",
      name: "signup",
      component: SignupView,
      meta: { requiresAuth: false }, // No authentication required for signup
    },

    // Redirects
    {
      path: "/announcements/:id",
      redirect: "/announcements",
      meta: { requiresAuth: true }, // Add requiresAuth meta field
    },
    {
      path: "/complaints/:id",
      redirect: "/complaints",
      meta: { requiresAuth: true }, // Add requiresAuth meta field
    },

    // Catch-all 404
    {
      path: "/:catchAll(.*)",
      name: "NotFound",
      component: NotFoundView,
    },
  ],
});

// Global navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore(); // Access the Pinia auth store
  const isAuthenticated = authStore.isAuthenticated; // Check if user is authenticated

  // Check if the route requires authentication
  if (to.meta.requiresAuth && !isAuthenticated) {
    // Redirect to login if not authenticated
    return next({ name: "login" });
  }

  // Allow access to the route
  next();
});

export default router;
