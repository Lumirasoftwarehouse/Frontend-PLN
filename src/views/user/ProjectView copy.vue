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
          <div class="row">
            <div class="col-sm-6">
              <div class="row">
                <div class="col-sm-4">
                    <h6 :class="{'clickable': true, 'active': activeStatus === 'All Projects'}" @click="setActive('All Projects')">All Projects</h6>
                </div>
                <div class="col-sm-4">
                    <h6 :class="{'clickable': true, 'active': activeStatus === 'In Progress'}" @click="setActive('In Progress')">In Progress</h6>
                </div>
                <div class="col-sm-4">
                    <h6 :class="{'clickable': true, 'active': activeStatus === 'Completed'}" @click="setActive('Completed')">Completed</h6>
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="row">
                <div class="col-sm-3"></div>
                <div class="col-sm-4">
                  <button class="btn btn-dark me-2">
                    <i class="bi bi-list"></i>
                  </button>
                  <button class="btn" style="border:1px solid black">
                    <i class="bi bi-grid-fill text-black"></i>
                  </button>
                </div>
                <div class="col-sm-4">
                  <button
                    class="btn btn-primary"
                    data-toggle="modal"
                    data-target="#createProject"
                  >
                    New Project
                  </button>
                </div>
                <div class="col-sm-1"></div>
              </div>
            </div>
          </div>
          <!-- Content Row -->
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
              <button
                type="button"
                class="btn btn-primary"
                @click="createProject()"
              >
                Simpan
              </button>
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
      dataProject: {
        client: "",
        projectName: "",
        dueDate: "",
        schedule: "",
      },
      role: null,
      ready: false,
      activeStatus: 'All Projects',
      statusProject:''
    };
  },
  methods: {
    setFilter(status){
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
        }
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
</style>
