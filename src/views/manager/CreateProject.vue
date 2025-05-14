<script setup>
import Sidebar from "../../components/manager/Sidebar.vue";
import Navbar from "../../components/Navbar-Admin.vue";
import Footer from "../../components/Footer.vue";
import PhaseComponent from "../../components/manager/PhaseComponent.vue";
import DeliverableComponent from "../../components/manager/DeliverableComponent.vue";
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

    <div id="content-wrapper" class="d-flex flex-column">
      <div id="content">
        <Navbar @toggle-sidebar="toggleSidebar" />

        <div class="container-fluid mt-4">
          <div class="card mt-4">
            <div class="card-body">
              <div class="container-fluid">
                <div class="row">
                  <h5 class="fw-bold mt-3">Create Project</h5>
                </div>

                <div class="row">
                  <div class="col-sm-8">
                    <div v-if="open == 1">
                      <div class="mb-3">
                        <label for="client" class="form-label">Client</label>
                        <input
                          type="text"
                          class="form-control"
                          id="client"
                          placeholder="enter client"
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
                          placeholder="enter project name"
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
                    <PhaseComponent
                      ref="phaseComponent"
                      v-if="open === 2"
                      @update-phases="updatePhases"
                    />
                    <DeliverableComponent
                      ref="deliverableComponent"
                      v-if="open === 3"
                      @update-deliverables="updateDeliverables"
                    />
                  </div>
                  <div class="col-sm-4">
                    <div class="col-sm-4">
                    <p>PIC</p>
                    <select
                      class="form-control"
                      v-model="selectedUser"
                      @change="addUser"
                    >
                      <option selected value="">--- Select PIC ---</option>
                      <option v-for="user in dataUsers" :key="user.id" :value="user">
                        {{ user.name }}
                      </option>
                    </select>
                  </div>
                  <div class="col-sm-8">
                    <p>Selected Pic:</p>
                    <ul class="list-group">
                      <li
                        v-for="user in selectedUsers"
                        :key="user.id"
                        class="list-group-item"
                      >
                        {{ user.name }}
                      </li>
                    </ul>
                  </div>
                  </div>
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
        </div>

        <ChatMe />
      </div>

      <Footer />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  components: {
    PhaseComponent,
    DeliverableComponent,
  },
  data() {
    return {
      dataProject: {
        client: "",
        projectName: "",
        dueDate: "",
      },
      open: 1,
      phasesData: [],
      deliverablesData: [],
      dataUsers: [],
      selectedUser: null,
      selectedUsers: [],
    };
  },
  methods: {
    addUser() {
      if (this.selectedUser && !this.selectedUsers.includes(this.selectedUser)) {
        this.selectedUsers.push(this.selectedUser);
      }
    },
    updatePhases(phases) {
      this.phasesData = phases;
    },
    updateDeliverables(deliverables) {
      this.deliverablesData = deliverables;
    },
    saveProject() {
      if (this.$refs.phaseComponent) {
        this.$refs.phaseComponent.getPhases();
      }
      if (this.$refs.deliverableComponent) {
        this.$refs.deliverableComponent.getDeliverables();
      }
      console.log("Phases data:", this.phasesData);
      console.log("Deliverables data:", this.deliverablesData);
    },
    async createProject() {
      try {
        const formData = new FormData();
        formData.append("client", this.dataProject.client);
        formData.append("project", this.dataProject.projectName);
        formData.append("dueDate", this.dataProject.dueDate);

        this.phasesData.forEach((phase, index) => {
          formData.append(`phases[${index}][phase]`, phase.phase);
          formData.append(`phases[${index}][start_date]`, phase.start_date);
          formData.append(`phases[${index}][end_date]`, phase.end_date);
        });

        this.deliverablesData.forEach((deliverable, index) => {
          formData.append(
            `deliverables[${index}][deliverable]`,
            deliverable.deliverable
          );
          formData.append(`deliverables[${index}][file]`, deliverable.file);
          formData.append(`deliverables[${index}][notes]`, deliverable.notes);
        });

        this.selectedUsers.forEach((dataUser, index) => {
          formData.append(
            `users[${index}][id]`,
            dataUser.id
          );
        });

        const response = await axios.post(
          `http://127.0.0.1:8000/api/project/create-project`,
          formData,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
              "Content-Type": "multipart/form-data",
            },
          }
        );
        Swal.fire({
          icon: "success",
          title: "Request Success!",
          text: "Project berhasil dibuat",
          confirmButtonText: "OK",
        }).then(() => {
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
          this.$router.push("/admin-projects");
        });
      }
    },
    nextStep() {
      if (this.open == 2 || this.open == 3) {
        this.saveProject();
      }
      if (this.open < 3) {
        this.open += 1;
      } else {
        this.createProject();
        this.open = 1;
      }
    },
    async fetchDataUser() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/auth/list-pengguna",
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        );
        this.dataUsers = response.data.data;
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Request Failed!",
          text: "Users gagal dimuat",
          confirmButtonText: "OK",
        }).then(() => {
          this.$router.push("/admin-projects");
        });
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
        this.fetchDataUser();
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
