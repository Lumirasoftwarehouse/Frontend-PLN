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
                    <th scope="col">Action</th>
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
                      <div class="row">
                        <div
                          class="btn-group"
                          role="group"
                          aria-label="Basic mixed styles example"
                        >
                          <button
                            type="button"
                            class="btn btn-primary"
                            data-toggle="modal"
                            data-target="#modalDetailProject"
                            @click="setDataDetail(item.id)"
                          >
                            <i class="bi bi-info-lg"></i>
                          </button>
                          <button
                            type="button"
                            class="btn btn-warning"
                            data-toggle="modal"
                            data-target="#updateProject"
                            @click="setDataUpdate(item)"
                          >
                            <i class="bi bi-pencil-square"></i>
                          </button>
                          <button
                            type="button"
                            class="btn btn-danger"
                            @click="konfirmasi(item.id, item.project)"
                          >
                            <i class="bi bi-trash3"></i>
                          </button>
                        </div>
                      </div>
                    </td>
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
                      <router-link
                        class="btn btn-primary"
                        :to="{
                          name: 'admin-schedule',
                          params: { id: item.id },
                        }"
                      >
                        View
                      </router-link>
                    </td>
                    <td
                      v-if="
                        statusProject == 'all' || item.status == statusProject
                      "
                    >
                      <div class="user-info">
                        <img
                          :src="`http://localhost:8000/storage/profiles/${item.users[0].image}`"
                          alt="Profile Picture"
                          class="profile-image"
                        />
                        {{ item.users[0].name }}
                      </div>
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

  <!-- modal detail project -->
  <div
    class="modal fade"
    id="modalDetailProject"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modalDetailProjectLabel"
    aria-hidden="true"
    ref="modalDetailProjectRef"
  >
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalDetailProjectLabel">
            Project Details
          </h5>
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
          <div class="row">
            <div class="col-8">
              <div class="row mb-3">
                <div class="col-6">
                  <span>Client</span><br />
                  <h5 class="fw-bold">{{ detailProject.client }}</h5>
                  <span>Project</span><br />
                  <h5 class="fw-bold">{{ detailProject.project }}</h5>
                </div>
                <div class="col-6 text-end">
                  <button class="btn btn-success">Completed</button>
                </div>
              </div>

              <!-- Phases -->
              <h6 class="mt-3">Phases</h6>
              <div class="row mb-2">
                <div
                  class="col-6"
                  v-for="(item, index) in detailPhase"
                  :key="item.id"
                >
                  <span>Phase {{ index + 1 }}</span
                  ><br />
                  <span class="subPhase">{{ item.phase }}</span
                  ><br />
                  <span class="phaseTgl">{{ item.start_date }}</span>
                </div>
                <div class="col-6 text-end">
                  <button class="btn btn-success">Completed</button>
                </div>
              </div>

              <!-- Deliverables -->
              <h6 class="mt-3">Deliverables</h6>
              <div
                class="row mb-2"
                v-for="(item, index) in detailDeliverable"
                :key="item.id"
              >
                <div class="col-6">
                  <span>Deliverable {{ index + 1 }}</span
                  ><br />
                  <h6>{{ item.deliverable }}</h6>
                  <h6><i class="bi bi-link-45deg"></i> {{ item.file }}</h6>
                  <h6>{{ item.notes }}</h6>
                </div>
                <div class="col-6 text-end">
                  <button class="btn btn-success">Completed</button>
                </div>
              </div>
            </div>

            <!-- Right column -->
            <div class="col-4">
              <span>Due Date</span><br />
              <h5 class="fw-bold">{{ detailProject.dueDate }}</h5>
              <br />
              <span>People</span><br />
              <div
                class="d-flex align-items-center mb-3"
                v-for="item in detailUserProject"
                :key="item.id"
              >
                <img
                  src="path/to/photo.jpg"
                  class="rounded-circle me-2"
                  alt="User Photo"
                  width="50"
                  height="50"
                />
                <div>
                  <h6 class="mb-0">{{ item.name }}</h6>
                  <small>{{ item.position }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- end modal detail project -->

  <!-- modal update project -->
  <div
    class="modal fade"
    id="updateProject"
    tabindex="-1"
    role="dialog"
    aria-labelledby="updateProjectLabel"
    aria-hidden="true"
    ref="updateProjectRef"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addInvoiceModalLabel">Update Project</h5>
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
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                  v-model="dataProject.status"
                  value="1"
                />
                <label class="form-check-label" for="flexRadioDefault1">
                  Completed
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  checked
                  v-model="dataProject.status"
                  value="0"
                />
                <label class="form-check-label" for="flexRadioDefault2">
                  In Progress
                </label>
              </div>
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
                @click="updateProject()"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- end modal update project -->
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
      projects: [],
      dataProject: {
        client: "",
        projectName: "",
        dueDate: "",
        id: "",
        status: "0",
      },
      role: null,
      ready: false,
      activeStatus: "All Projects",
      statusProject: "all",
      view: "list",
      detailProject: [],
      detailPhase: [],
      detailDeliverable: [],
      detailUserProject: [],
    };
  },
  methods: {
    setDataUpdate(project) {
      this.dataProject.id = project.id;
      this.dataProject.client = project.client;
      this.dataProject.projectName = project.project;
      this.dataProject.dueDate = project.dueDate;
    },
    setDataDetail(id) {
      this.getDetailDataProject(id);
    },
    async updateProject() {
      try {
        const formData = new FormData();
        formData.append("client", this.dataProject.client);
        formData.append("project", this.dataProject.projectName);
        formData.append("dueDate", this.dataProject.dueDate);
        formData.append("status", this.dataProject.status);
        const response = await axios.post(
          `http://127.0.0.1:8000/api/project/update-project/${this.dataProject.id}`,
          formData,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        );
        this.getAllDataProject();
        Swal.fire({
          icon: "success",
          title: "Request Success!",
          text: "Project berhasil diupdate",
          confirmButtonText: "OK",
        }).then(() => {
          $("#updateProject").modal("hide");
          this.$router.push("/admin-projects");
        });
      } catch (error) {
        console.error(error);
      }
    },
    konfirmasi(idProject, project) {
      Swal.fire({
        title: `Apakah Anda yakin ingin menghapus project ${project}?`,
        text: "Project akan dihapus jika anda menekan tombol Hapus.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#061387",
        confirmButtonText: "Hapus",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteProject(idProject);
        }
      });
    },
    async deleteProject(id) {
      try {
        const response = await axios.delete(
          `http://127.0.0.1:8000/api/project/delete-project/${id}`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data); // Handle response from server
        this.getAllDataProject(); // Reload the misi data after adding a new one
        this.showAlert("Success", "Benefit berhasil didelete", "success");
      } catch (error) {
        console.error(error); // Handle error if any
        this.showAlert(
          "Oops...",
          "Terjadi kesalahan saat mendelete benefit",
          "error"
        );
      }
    },
    showAlert(title, text, icon) {
      this.$swal({
        title: title,
        text: text,
        icon: icon, // Atau gunakan icon lain sesuai kebutuhan
      }).then(() => {});
    },
    async getDetailDataProject(id) {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/project/detail-project/${id}`,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        );
        this.detailProject = response.data.data.dataProject;
        this.detailPhase = response.data.data.dataPhase;
        this.detailDeliverable = response.data.data.dataDeliverable;
        this.detailUserProject = response.data.data.dataUserProject;
      } catch (error) {
        console.error(error);
      }
    },
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
        if (level !== "1") {
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

.profile-image {
  width: 40px; /* Sesuaikan ukuran gambar sesuai kebutuhan */
  height: 40px; /* Sesuaikan ukuran gambar sesuai kebutuhan */
  border-radius: 50%; /* Membuat gambar menjadi bulat */
  object-fit: cover; /* Menjaga rasio gambar dan memastikan gambar memenuhi kotak */
  margin-right: 10px; /* Memberikan sedikit jarak antara gambar dan teks */
}

.user-info {
  display: flex;
  align-items: center; /* Menjaga gambar dan teks berada di tengah secara vertikal */
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
