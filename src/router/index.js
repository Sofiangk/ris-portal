import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CoursesView from '@/views/CoursesView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import AttendanceView from '@/views/AttendanceView.vue';
import ComplaintsView from '@/views/ComplaintsView.vue';
import AnnouncementsView from '@/views/AnnouncementsView.vue';

import ProfileView from '@/views/Profile/ProfileView.vue';

import LoginView from '@/views/Auth/LoginView.vue';
import SignupView from '@/views/Auth/SignupView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'bg-navy-light/5 text-gold hover:bg-navy-lighter/5',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/courses',
      name: 'courses',
      component: CoursesView,
    },
    {
      path: '/attendance',
      name: 'attendance',
      component: AttendanceView,
    },
    {
      path: '/complaints',
      name: 'complaints',
      component: ComplaintsView,
    },
    {
      path: '/announcements',
      name: 'announcements',
      component: AnnouncementsView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
    },

    // Auth
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView,
    },

    // Redirects
    {
      path: '/announcements/:id',
      redirect: '/announcements',
    },
    {
      path: '/complaints/:id',
      redirect: '/complaints',
    },

    // Catch-all 404
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFoundView,
    },
  ],
});

export default router;
