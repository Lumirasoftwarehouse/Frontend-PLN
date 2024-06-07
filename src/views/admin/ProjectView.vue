<script setup>
import Sidebar from "../../components/Sidebar.vue";
import Navbar from "../../components/Navbar-Admin.vue";
import Footer from "../../components/Footer.vue";
import CardProject from "../../components/admin/CardProject.vue";
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
          <div class="row">
            <div class="col-sm-4">
              <div class="row">
                <div class="col-sm-4">
                  <h6
                    :class="{
                      clickable: true,
                      active: activeStatus === 'All Projects',
                    }"
                    @click="setActive('All Projects'), setFilter('all')"
                  >
                    All Projects
                  </h6>
                </div>
                <div class="col-sm-4">
                  <h6
                    :class="{
                      clickable: true,
                      active: activeStatus === 'In Progress',
                    }"
                    @click="setActive('In Progress'), setFilter('0')"
                  >
                    In Progress
                  </h6>
                </div>
                <div class="col-sm-4">
                  <h6
                    :class="{
                      clickable: true,
                      active: activeStatus === 'Completed',
                    }"
                    @click="setActive('Completed'), setFilter('1')"
                  >
                    Completed
                  </h6>
                </div>
              </div>
            </div>
            <div class="col-sm-4"></div>
            <div class="col-sm-4">
              <div class="row">
                <div class="col-sm-4">
                  <button class="btn bg-black me-2" @click="setView('list')">
                    <i class="bi bi-list text-white"></i>
                  </button>
                  <button
                    class="btn"
                    style="border: 1px solid black"
                    @click="setView('block')"
                  >
                    <i class="bi bi-grid-fill text-black"></i>
                  </button>
                </div>
                <div class="col-sm-6">
                  <router-link
                    class="btn btn-primary"
                    to="/admin-create-project"
                  >
                    <i class="bi bi-plus"></i> New Project
                  </router-link>
                </div>
                <div class="col-sm-2">
                  <i class="bi bi-three-dots-vertical text-black fs-3"></i>
                </div>
              </div>
            </div>
          </div>
          <!-- Content Row -->
          <CardProject :projects="projects" v-if="view == 'block'" />
          <div class="card mt-4" v-if="view == 'list'">
            <div class="card-body">
              <div v-if="!ready" class="preloader"></div>
              <table class="table" v-if="ready">
                <thead>
                  <tr>
                    <th scope="col">Client</th>
                    <th scope="col">Project</th>
                    <th scope="col">Last Edited</th>
                    <th scope="col">Due Date</th>
                    <th scope="col">Status</th>
                    <th scope="col">Schedule</th>
                    <th scope="col">Expert</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in projects" :key="item.id">
                    <td
                      v-if="
                        statusProject == 'all' || item.status == statusProject
                      "
                    >
                      {{ item.client }}
                    </td>
                    <td
                      v-if="
                        statusProject == 'all' || item.status == statusProject
                      "
                    >
                      {{ item.project }}
                    </td>
                    <td
                      v-if="
                        statusProject == 'all' || item.status == statusProject
                      "
                    >
                      {{ item.updated_at }}
                    </td>
                    <td
                      v-if="
                        statusProject == 'all' || item.status == statusProject
                      "
                    >
                      {{ item.dueDate }}
                    </td>
                    <td
                      v-if="
                        statusProject == 'all' || item.status == statusProject
                      "
                    >
                      <button
                        class="btn btn-warning text-black"
                        v-if="item.status == '0'"
                      >
                        In Progress
                      </button>
                      <button
                        class="btn btn-success text-black"
                        v-if="item.status == '1'"
                      >
                        Completed
                      </button>
                    </td>
                    <td
                      v-if="
                        statusProject == 'all' || item.status == statusProject
                      "
                    >
                      <router-link class="btn btn-primary" to="/admin-schedule">
                        View
                      </router-link>
                    </td>
                    <td
                      v-if="
                        statusProject == 'all' || item.status == statusProject
                      "
                    >
                      <button class="btn btn-primary">test</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <ChatMe />
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
  <!-- end modal create project -->
</template>
<script>
import axios from "axios";
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net";

DataTable.use(DataTablesCore);

export default {
  data() {
    return {
      projects: [],
      dataProject: {
        client: "",
        projectName: "",
        dueDate: "",
        schedule: "",
      },
      role: null,
      ready: false,
      activeStatus: "All Projects",
      statusProject: "all",
      view: "list",
    };
  },
  methods: {
    setView(view) {
      this.view = view;
    },
    setFilter(status) {
      this.statusProject = status;
    },
    async getAllDataProject() {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/project/list-project`,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        );
        this.projects = response.data.data;
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
        this.getAllDataProject();
        console.log("ini invoice", this.invoices);
      } catch (error) {
        console.error(error);
      }
    },
    setActive(status) {
      this.activeStatus = status;
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
        if (level !== "0") {
          this.$router.push("/unauthorized");
        } else if (!header || !signature) {
          this.$router.push("/");
          sessionStorage.removeItem("token");
        }
        // success
        this.getAllDataProject();
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

.clickable {
  cursor: pointer;
  font-weight: bold;
  transition: color 0.3s, text-decoration 0.3s;
}

.clickable.active {
  color: blue;
  text-decoration: underline;
  text-decoration-color: blue;
}

.card {
  background-color: #fff;
  border-radius: 20px;
  margin-top: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-body {
  padding: 0;
}

table {
  border: none;
}

.table {
  margin: 0;
  border: none;
}

.table thead th {
  border: none;
  background-color: #f8f9fa;
}

.table tbody tr {
  border: none;
}
</style>
