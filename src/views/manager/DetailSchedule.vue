<script setup>
import Sidebar from "../../components/manager/Sidebar.vue";
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
          <!-- Content Row -->
          <div class="row">
            <div class="col-sm-8">
              <input
                type="text"
                class="form-control mb-3"
                id="internalMeer"
                placeholder="phase"
                v-model="formUpdatePhase.phase"
              />
              <div class="row mb-3">
                <div class="col-sm-2">Date</div>
                <div class="col-sm-5">
                  <input type="date" class="form-control" id="startDate" v-model="formUpdatePhase.start_date"/>
                </div>
                <div class="col-sm-5">
                  <input type="date" class="form-control" id="endDate" v-model="formUpdatePhase.end_date"/>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-sm-2">Time</div>
                <div class="col-sm-5">
                  <input type="number" class="form-control" id="startTime" v-model="formUpdatePhase.start_time"/>
                </div>
                <div class="col-sm-5">
                  <input type="number" class="form-control" id="endTime" v-model="formUpdatePhase.end_time"/>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-sm-2">Repeat</div>
                <div class="col-sm-5">
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    v-model="formUpdatePhase.repeat"
                  >
                    <option selected>Pilih</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div class="col-sm-5"></div>
              </div>
              <div class="row mb-4">
                <div class="col-sm-2">Notes</div>
                <div class="col-sm-10">
                  <textarea class="form-control" id="notes" rows="3" v-model="formUpdatePhase.notes"></textarea>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <router-link to="/manager-projects">
                  <button class="btn btn-outline-primary">Cancel</button>

                  </router-link>
                </div>
                <div class="col-6">
                  <button class="btn btn-primary float-end" type="submit" @click="updatePhase()">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
            <div class="col-sm-4">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  id="kodeProgram"
                  placeholder="Cari user"
                />
                <div class="input-group-prepend">
                  <span
                    class="input-group-text"
                    @click="copyKodeProgram"
                  >
                    <i class="bi bi-person-add"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>

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
import Swal from "sweetalert2";

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    idProyek: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      role: null,
      dataPhase: [],
      formUpdatePhase:{
        phase : "", 
        start_date : "", 
        end_date : "", 
        start_time : "",
        end_time : "",
        repeat : "",
        notes : ""
      }
    };
  },
  methods:{
    async updatePhase() {
      try {
        const formData = new FormData();
        formData.append("phase", this.formUpdatePhase.phase);
        formData.append("start_date", this.formUpdatePhase.start_date);
        formData.append("end_date", this.formUpdatePhase.end_date);
        formData.append("start_time", this.formUpdatePhase.start_time);
        formData.append("end_time", this.formUpdatePhase.end_time);
        formData.append("repeat", this.formUpdatePhase.repeat);
        formData.append("notes", this.formUpdatePhase.notes);
        const response = await axios.post(
          `http://127.0.0.1:8000/api/phase/update-phase/${this.id}`,
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
          text: "Phase berhasil diupdate",
          confirmButtonText: "OK",
        }).then(() => {
          this.$router.push("/admin-projects");
        });
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Request Failed!",
          text: "Phases gagal update",
          confirmButtonText: "OK",
        }).then(() => {
          this.$router.push("/admin-projects");
        });
      }
    },
    async getDetailPhase() {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/phase/phase-detail/${this.id}`,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        );
        this.formUpdatePhase = response.data.data;
        this.ready = true;
      } catch (error) {
        console.error(error);
      }
    },
  },
  created(){
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
        this.getDetailPhase();
        // akhir
      } catch (error) {
        console.error("Error decoding token:", error);
        this.$router.push("/"); // Tindakan jika terjadi kesalahan dekode
      }
    } else {
      this.$router.push("/"); // Tindakan jika token tidak ada (pengguna belum terautentikasi)
    }
  }
};
</script>


<style>
#content-wrapper {
  min-height: 780px !important;
}
</style>
