<script setup>
import Sidebar from "../../components/Sidebar-User.vue";
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
              <div class="row mb-3">
                <div class="col-sm-2">Phase</div>
                <div class="col-sm-10">
                  <input
                    type="text"
                    class="form-control mb-3"
                    id="internalMeer"
                    placeholder="phase"
                    v-model="dataPhase.phase"
                    disabled
                  />
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-sm-2">Date</div>
                <div class="col-sm-10">
                  <input
                    type="date"
                    class="form-control"
                    id="tanggal"
                    v-model="formLaporanPhase.tanggal"
                  />
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-sm-2">Lampiran</div>
                <div class="col-sm-10">
                  <input type="file" class="form-control" id="lampiran" />
                </div>
              </div>
              <div class="row mb-4">
                <div class="col-sm-2">Laporan</div>
                <div class="col-sm-10">
                  <textarea
                    class="form-control"
                    id="laporan"
                    rows="3"
                    v-model="formLaporanPhase.laporan"
                  ></textarea>
                </div>
              </div>
              <div class="row">
                <div class="col-8"></div>
                <div class="col-4">
                  <button class="btn btn-danger">Cancel</button>
                  <button class="btn btn-primary float-end" @click="createLaporanPhase">Save</button>
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
  },
  data() {
    return {
      role: null,
      dataPhase: [],
      formLaporanPhase: {
        tanggal: "",
        laporan: "",
        lampiran: "",
        id_phase: "",
        id_user: "",
      },
    };
  },
  methods: {
    async createLaporanPhase() {
      try {
        const formData = new FormData();
        formData.append("tanggal", this.formLaporanPhase.tanggal);
        formData.append("laporan", this.formLaporanPhase.laporan);
        formData.append("lampiran", this.formLaporanPhase.lampiran);
        formData.append("id_phase", this.id);
        formData.append("id_user", this.formLaporanPhase.id_user);
        const response = await axios.post(
          `http://127.0.0.1:8000/api/laporan-phase/create`,
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
          text: "Laporan phase berhasil disimpan",
          confirmButtonText: "OK",
        }).then(() => {
          this.$router.push("/user-projects");
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
        this.dataPhase = response.data.data;
        this.ready = true;
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
        this.formLaporanPhase.user_id = tokenPayload.id;
        if (level !== "0") {
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
  },
};
</script>


<style>
#content-wrapper {
  min-height: 780px !important;
}
</style>
