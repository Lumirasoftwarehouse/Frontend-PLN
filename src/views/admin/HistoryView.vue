<script setup>
import Sidebar from "../../components/Sidebar.vue";
import Navbar from "../../components/Navbar-Admin.vue";
import Footer from "../../components/Footer.vue";
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
            <h1 class="h3 mb-0 text-gray-800 text-center">History</h1>
          </div>
          <!-- Content Row -->
          <div class="table-responsive">
            <div v-if="!ready" class="preloader"></div>
            <DataTable class="display table table-striped" v-if="ready">
              <thead>
                <tr>
                  <th scope="col">User</th>
                  <th scope="col">Last Login</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in penggunas" :key="item.id">
                  <td>
                    <img :src="`http://localhost:8000/storage/profiles/${item.image}`" class="rounded-circle" width="40" alt="profile">
                    {{ item.name }}
                    </td>
                  <td>{{ item.created_at }}</td>
                </tr>
              </tbody>
            </DataTable>
          </div>
          <!-- Content Row -->

          <!-- <ChatMe /> -->
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
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net";

DataTable.use(DataTablesCore);

export default {
  data() {
    return {
      penggunas: [],
      dataProject:{
        client:'',
        projectName:'',
        dueDate:'',
        schedule:''
      },
      role: null,
      ready: false,
    };
  },
  methods: {
    async getAllDataPengguna() {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/auth/list-pengguna`,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        );
        this.penggunas = response.data.data;
        this.ready = true;
      } catch (error) {
        console.error(error);
      }
    },
    async createProject() {
      try {
        const formData = new FormData();
        formData.append("client", this.dataProject.client);
        formData.append("project", this.dataProject.projectName);
        formData.append("dueDate", this.dataProject.dueDate);
        formData.append("schedule", this.dataProject.schedule);
        const response = await axios.post(
          `http://127.0.0.1:8000/api/project/create-project`,
          formData,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        );
        this.ready = false;
        // this.showAlert();
        this.getAllDataPengguna();
        console.log("ini invoice", this.invoices);
      } catch (error) {
        console.error(error);
      }
    },
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
        if (level !== "1") {
          this.$router.push("/unauthorized");
        } else if (!header || !signature) {
          this.$router.push("/");
          sessionStorage.removeItem("token");
        }
        // success
        this.getAllDataPengguna();
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
