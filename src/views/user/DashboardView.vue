<script setup>
import Sidebar from "../../components/Sidebar-User.vue";
import Navbar from "../../components/Navbar-Admin.vue";
import Footer from "../../components/Footer.vue";
import LineChart from "../../components/LineChart.vue";
import PolarChart from "../../components/PolarChart.vue";
import { ref } from "vue";

const sidebarToggled = ref(false);
const sidebarClass = ref("");

const toggleSidebar = () => {
  sidebarToggled.value = !sidebarToggled.value;
  sidebarClass.value = sidebarToggled.value ? "toggle-sidebar" : "";
};
</script>

<template>
  <div id="wrapper">
    <Sidebar :class="sidebarClass" />

    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column">
      <!-- Main Content -->
      <div id="content">
        <Navbar @toggle-sidebar="toggleSidebar" />

        <!-- Begin Page Content -->
        <div class="container-fluid mt-4">
          <!-- Page Heading -->
          <div
            class="d-sm-flex align-items-center justify-content-between mb-4"
          >
            <h1 class="h3 mb-0 text-gray-800 text-center">Dashboard User</h1>
          </div>

          <!-- Full-width Blue Card -->
          <div
            class="card mb-4"
            style="background-color: #007bff; color: white"
          >
            <div class="card-body">
              <div class="row">
                <div class="col-4"></div>
                <div class="col-8">
                  <h5 class="card-title">Hello, John Doe</h5>
                  <p class="card-text">
                    Let's started your project and invite your team, manage all your works.
                  </p>
                  <p class="card-text">
                    and make it perfect. You're amazing!
                  </p>

                </div>
              </div>
            </div>
          </div>

          <!-- Two Smaller Cards -->
          <div class="row">
            <div class="col-lg-9">
              <div class="row">
                <div class="col-sm-6">
                  <div class="card mb-4">
                    <div class="card-body">
                      <h5 class="card-title">Project Overview</h5>
                      <PolarChart />
                    </div>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="card mb-4">
                    <div class="card-body">
                      <h5 class="card-title">Summary</h5>
                      <LineChart />
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="card mb-4">
                  <div class="card-body">
                    <h5 class="card-title">Recent Project</h5>
                    <table class="table" v-if="ready">
                      <thead>
                        <tr>
                          <th scope="col">Client</th>
                          <th scope="col">Project</th>
                          <th scope="col">Due Date</th>
                          <th scope="col">Expert</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in projects" :key="item.id">
                          <td>
                            {{ item.client }}
                          </td>
                          <td>
                            {{ item.project }}
                          </td>
                          <td>
                            {{ item.dueDate }}
                          </td>
                          <td>
                            {{ item.users[0].name }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-3">
              <div class="card mb-4">
                <div class="card-body">
                  <h5 class="card-title">Activity</h5>
                </div>
              </div>
            </div>
          </div>
          <!-- Content Row -->
        </div>
        <!-- /.container-fluid -->
      </div>
      <!-- End of Main Content -->

      <!-- Footer -->
      <Footer />
      <!-- End of Footer -->
    </div>
    <!-- End of Content Wrapper -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      role: null,
      projects: [],
      ready: false,
    };
  },
  methods: {
    
  },
  created() {
    const currentTimeUTC = new Date().toUTCString();
    console.log("Waktu Sekarang (UTC):", currentTimeUTC);
    const token = sessionStorage.getItem("token"); // Ambil token dari local storage

    if (token) {
      try {
        const [headerBase64, signatureBase64] = token.split(".");
        const header = JSON.parse(atob(headerBase64));
        const signature = atob(signatureBase64);

        const tokenPayload = JSON.parse(atob(token.split(".")[1])); // Mendekode bagian payload dari token JWT
        const expTimestamp = tokenPayload.exp;

        const expDate = new Date(expTimestamp * 1000); // Konversi Unix Timestamp ke JavaScript Date

        console.log("Waktu Kedaluwarsa (UTC):", expDate.toUTCString()); // Tampilkan waktu kedaluwarsa dalam format UTC

        if (new Date() > expDate) {
          console.log("Keluar");
          sessionStorage.removeItem("token");
          this.$router.push("/");
        } else {
          console.log("Aman");
        }
        const level = tokenPayload.level; // Ambil level pengguna dari payload
        this.user_id = tokenPayload.id;
        if (level !== "0") {
          this.$router.push("/unauthorized");
        } else if (!header || !signature) {
          this.$router.push("/");
          sessionStorage.removeItem("token");
        }
        // success
        // akhir
      } catch (error) {
        console.error("Error decoding token:", error);
        this.$router.push("/"); // Tindakan jika terjadi kesalahan dekode
      }
    } else {
      this.$router.push("/"); // Tindakan jika token tidak ada (pengguna belum terautentikasi)
    }
  },
};
</script>

<style>
#content-wrapper {
  min-height: 780px !important;
}
</style>
