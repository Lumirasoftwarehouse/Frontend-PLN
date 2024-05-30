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
            <h1 class="h3 mb-0 text-gray-800 text-center">Projects</h1>
          </div>

          <div class="row">
            <div class="col-sm-6">
              <div class="row">
                <div class="col-sm-4">
                  <h6>All Projects</h6>
                </div>
                <div class="col-sm-4">
                  <h6>In Progress</h6>
                </div>
                <div class="col-sm-4">
                  <h6>Completed</h6>
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="row">
                <div class="col-sm-4"></div>
                <div class="col-sm-4">
                  <button 
                  class="btn btn-primary"
                  data-toggle="modal"
                        data-target="#createProject"
                        >New Project</button>
                </div>
                <div class="col-sm-4">
                  <button class="btn btn-primary">New Project</button>
                </div>
              </div>
            </div>
          </div>
          <!-- Content Row -->
          <div class="table-responsive">
            <div v-if="!ready" class="preloader"></div>
            <DataTable class="display table table-striped" v-if="ready">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Client</th>
                  <th scope="col">Project</th>
                  <th scope="col">Last Edited</th>
                  <th scope="col">Due Date</th>
                  <th scope="col">Status</th>
                  <th scope="col">Schedule</th>
                  <th scope="col">Export</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in projects" :key="item.id">
                  <th scope="row">{{ index + 1 }}</th>
                  <td>{{ item.client }}</td>
                  <td>{{ item.project }}</td>
                  <td>{{ item.updated_at }}</td>
                  <td>{{ item.dueDate }}</td>
                  <td>{{ item.status }}</td>
                  <td>{{ item.schedule }}</td>
                  <td>
                    <button class="btn btn-primary">Export</button>
                  </td>
                </tr>
              </tbody>
            </DataTable>
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

  <!-- modal create project -->
  <div
    class="modal fade"
    id="createProject"
    tabindex="-1"
    role="dialog"
    aria-labelledby="createProjectLabel"
    aria-hidden="true"
    ref="createProjectRef"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addInvoiceModalLabel">Create Project</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <!-- Form Atur Tanggal -->
          <form>
            <div class="form-group">
              <label for="client">Client</label>
              <input
                type="text"
                class="form-control"
                id="client"
                v-model="dataProject.client"
              />
            </div>
            <div class="form-group">
              <label for="projectName">Project Name</label>
              <input
                type="text"
                class="form-control"
                id="projectName"
                v-model="dataProject.projectName"
              />
            </div>  
            <div class="form-group">
              <label for="dueDate">Due Date</label>
              <input
                type="date"
                class="form-control"
                id="dueDate"
                v-model="dataProject.dueDate"
              />
            </div>
            <div class="form-group">
              <label for="schedule">Schedule</label>
              <input
                type="text"
                class="form-control"
                id="schedule"
                v-model="dataProject.schedule"
              />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary" @click="createProject()">Simpan</button>
            </div>
          </form>
        </div>
      </div>
    </div>
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
</style>
