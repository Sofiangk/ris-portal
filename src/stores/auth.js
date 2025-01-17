import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    email: "",
    password: "",
    isAuthenticated: false,
    token: "",
    role: "",
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
          this.role = response.data.role;
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

    // Fetch complaints
    // Fetch complaints
    // Fetch complaints
    async fetchComplaints() {
      const apiUrl = import.meta.env.VITE_APP_API_URL;
      try {
        const response = await axios.get(`${apiUrl}students/user-complaints`, {
          headers: {
            Authorization: `Bearer ${this.token}`, // Include token in headers
          },
        });

        // Access the nested `complaints` key in the response
        const complaintsData = response.data.complaints;

        // Map the complaints data to match frontend requirements
        this.complaints = complaintsData.map((complaint) => ({
          id: complaint.id,
          content: complaint.content,
          status: complaint.status.toLowerCase(), // Normalize status to lowercase
          created_at: new Date(complaint.created_at).toLocaleDateString(), // Format date
        }));
      } catch (error) {
        console.error("Failed to fetch user complaints:", error.message);
      }
    },

    // Fetch materials
    async fetchMaterials() {
      const apiUrl = import.meta.env.VITE_APP_API_URL;
      try {
        const response = await axios.get(`${apiUrl}students/materials`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        this.materials = response.data;
      } catch (error) {
        console.error("Failed to fetch materials:", error.message);
      }
    },
  },
});
