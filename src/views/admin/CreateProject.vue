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
          <!-- Content -->
          <div class="card mt-4">
            <div class="card-body">
              <div class="container-fluid">
                <div class="row">
                  <h5 class="fw-bold mt-3">Create Project</h5>
                </div>

                <!-- section 1 -->
                <div class="row" v-if="open == 1">
                  <div class="col-sm-8">
                    <div class="mb-3">
                      <label for="client" class="form-label">Client</label>
                      <input
                        type="text"
                        class="form-control"
                        id="client"
                        placeholder="write here"
                        v-model="dataProject.client"
                      />
                    </div>
                    <div class="mb-3">
                      <label for="projectName" class="form-label"
                        >Project Name</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        id="projectName"
                        placeholder="write here"
                        v-model="dataProject.projectName"
                      />
                    </div>
                    <div class="mb-3">
                      <label for="dueDate" class="form-label">Due Date</label>
                      <input
                        type="date"
                        class="form-control"
                        id="dueDate"
                        v-model="dataProject.dueDate"
                      />
                    </div>
                  </div>
                  <div class="col-sm-4"></div>
                </div>

                <!-- section 2 -->
                <div class="row" v-if="open == 2">
                  <div class="col-sm-8">
                    <div class="row">
                      <div class="col-sm-12">
                        <div class="mb-3">
                          <label for="phase1" class="form-label">Phase 1</label>
                          <textarea
                            class="form-control"
                            id="phase1"
                            rows="3"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <label for="date1" class="form-label">Date</label>
                      <div class="col-sm-6">
                        <div class="mb-3">
                          <input type="date" class="form-control" id="date1" />
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="mb-3">
                          <input type="date" class="form-control" id="date1" />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-12">
                        <div class="mb-3">
                          <label for="phase2" class="form-label">Phase 2</label>
                          <textarea
                            class="form-control"
                            id="phase2"
                            rows="3"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <label for="date2" class="form-label">Date</label>
                      <div class="col-sm-6">
                        <div class="mb-3">
                          <input type="date" class="form-control" id="date2" />
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="mb-3">
                          <input type="date" class="form-control" id="date2" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-4"></div>
                </div>

                <!-- section 3 -->
                <div class="row" v-if="open == 3">
                  <div class="col-sm-8">
                    <div class="row">
                      <div class="col-sm-12">
                        <div class="mb-3">
                          <label for="deliverable1" class="form-label"
                            >Deliverable 1</label
                          >
                          <input
                            type="text"
                            class="form-control"
                            id="deliverable1"
                            placeholder="write here"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-12">
                        <div class="mb-3">
                          <label for="deliverable2" class="form-label"
                            >Deliverable 2</label
                          >
                          <input
                            type="text"
                            class="form-control"
                            id="deliverable2"
                            placeholder="write here"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-12">
                        <div class="mb-3">
                          <label for="file" class="form-label">Files</label>
                          <input
                            type="file"
                            class="form-control"
                            id="file"
                            placeholder="write here"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-12">
                        <div class="mb-3">
                          <label for="notes" class="form-label">Notes</label>
                          <textarea
                            class="form-control"
                            id="notes"
                            rows="3"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-4"></div>
                </div>

                <div class="row mb-3">
                  <div class="col-sm-6">&lt; {{ open }} / 3 &gt;</div>
                  <div class="col-sm-6">
                    <div class="float-end">
                      <button
                        class="btn btn-outline-primary me-2"
                        @click="open > 3 ? (open -= 1) : (open = 1)"
                      >
                        Previos
                      </button>
                      <button class="btn btn-primary" @click="nextStep">
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- End Content -->

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
</template>
<script>
import axios from "axios";
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net";
import Swal from "sweetalert2";

DataTable.use(DataTablesCore);

export default {
  data() {
    return {
      dataProject: {
        client: "",
        projectName: "",
        dueDate: "",
        schedule: "07/06/2024",
      },
      role: null,
      ready: false,
      activeStatus: "",
      open: 1,
    };
  },
  methods: {
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
        Swal.fire({
          icon: "success",
          title: "Request Success!",
          text: "Project berhasil dibuat",
          confirmButtonText: "OK",
        }).then(() => {
          // Arahkan pengguna ke rute '/'
          this.$router.push("/admin-projects");
        });
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Request Failed!",
          text: "Project gagal dibuat",
          confirmButtonText: "OK",
        }).then(() => {
          // Arahkan pengguna ke rute '/'
          this.$router.push("/admin-projects");
        });
      }
    },
    setActive(status) {
      this.activeStatus = status;
    },
    nextStep() {
      if (this.open < 3) {
        this.open += 1;
      } else {
        this.createProject();
        this.open = 1; // Loop back to the first step if it's the last step
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
</style>
