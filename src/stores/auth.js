import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    email: "",
    password: "",
    isAuthenticated: false,
    token: "",
    role: "", // User role (admin or student)
    name: "",
    announcements: [], // Store announcements
    complaints: [], // Store complaints
    materials: [], // Store materials
  }),
  actions: {
    // Login action
    async login() {
      const apiUrl = import.meta.env.VITE_APP_API_URL;
      try {
        const response = await axios.post(`${apiUrl}login`, {
          email: this.email,
          password: this.password,
        });

        if (response.status === 200) {
          // Save user details
          this.token = response.data.token;
          this.isAuthenticated = true;
          this.role = response.data.role; // Role is set here
          this.name = response.data.user.name;
          this.email = response.data.user.email;

          // Save to localStorage for persistence
          localStorage.setItem("token", this.token);
          localStorage.setItem("name", this.name);
          localStorage.setItem("email", this.email);
          localStorage.setItem("role", this.role);
          localStorage.setItem("isAuthenticated", true);

          // Redirect after successful login
          router.push("/");
        } else {
          window.alert("Login failed");
        }
      } catch (error) {
        console.error("Login failed:", error.response || error.message);
        if (error.response && error.response.status === 401) {
          window.alert("Invalid email or password");
        }
      }
    },

    // Logout action
    async logout() {
      const apiUrl = import.meta.env.VITE_APP_API_URL;
      try {
        await axios.post(
          `${apiUrl}logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );

        // Clear session data
        this.clearSession();
      } catch (error) {
        console.error("Logout failed:", error.response || error.message);
        this.clearSession();
      }
    },

    // Clear session data
    clearSession() {
      this.email = "";
      this.isAuthenticated = false;
      this.token = "";
      this.role = "";
      this.name = "";
      this.announcements = [];
      this.complaints = [];
      this.materials = [];

      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("role");
      localStorage.removeItem("name");
      localStorage.removeItem("isAuthenticated");

      router.push("/login");
    },

    // Fetch announcements
    async fetchAnnouncements() {
      const apiUrl = import.meta.env.VITE_APP_API_URL;
      try {
        const response = await axios.get(`${apiUrl}announcements`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        this.announcements = response.data;
      } catch (error) {
        console.error("Failed to fetch announcements:", error.message);
      }
    },

    // Fetch complaints dynamically based on user role
    async fetchComplaints() {
      const apiUrl = import.meta.env.VITE_APP_API_URL;
      try {
        // Determine the correct endpoint based on the user's role
        const endpoint =
          this.role === "admin"
            ? "admin/complaints" // Admin endpoint
            : "students/user-complaints"; // Student endpoint

        const response = await axios.get(`${apiUrl}${endpoint}`, {
          headers: {
            Authorization: `Bearer ${this.token}`, // Include token in headers
          },
        });

        // Map complaints data to match frontend requirements
        const complaintsData = response.data.complaints || response.data; // Handle different response structures
        this.complaints = complaintsData.map((complaint) => ({
          id: complaint.id,
          content: complaint.content,
          status: complaint.status.toLowerCase(), // Normalize status to lowercase
          created_at: new Date(complaint.created_at).toLocaleDateString(), // Format date
        }));
      } catch (error) {
        console.error("Failed to fetch complaints:", error.message);
      }
    },

    // Fetch materials
    // Updated fetchMaterials method
    async fetchMaterials() {
      const apiUrl = import.meta.env.VITE_APP_API_URL; // Base API URL
      const token = localStorage.getItem("token"); // Get the token from localStorage
      const role = localStorage.getItem("role"); // Get the role from localStorage

      // Determine the correct route based on role
      const route =
        role === "admin" ? "admin/getAllCourses" : "students/materials";

      try {
        const response = await axios.get(`${apiUrl}${route}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in headers
          },
        });

        // Map the materials for both student and admin
        this.materials = response.data.map((material) => ({
          id: material.id,
          name: material.name,
          code: material.code,
          description: material.description || "No description available.",
          instructor: material.instructor || "Unknown",
          credits: material.credits,
          books_download_link: material.books_download_link,
        }));

        console.log("Materials fetched successfully:", this.materials); // Debugging
      } catch (error) {
        console.error("Error fetching materials:", error.message);
        alert(
          "Failed to fetch materials. Please check your role and try again."
        );
      }
    },
  },
});
