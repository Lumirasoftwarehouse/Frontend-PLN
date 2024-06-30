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
            <h1 class="h3 mb-0 text-gray-800 text-center">Profile</h1>
          </div>
          <!-- Content Row -->
          <div class="row">
            <div class="col-lg-12">
              <div class="card shadow">
                <div class="card-body text-center">
                  <img
                    :src="`http://localhost:8000/storage/profiles/${user.image}`"
                    class="img-fluid rounded-circle mb-3"
                    alt="Profile Picture"
                    width="150"
                    height="150"
                  />
                  <h4>{{ user.name }}</h4>
                  <p>{{ user.email }}</p>
                  <p>{{ user.position }}</p>
                  <button
                    class="btn btn-primary"
                    data-toggle="modal"
                    data-target="#updateProfile"
                  >
                    Update Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- /.container-fluid -->
      </div>
      <!-- End of Main Content -->

      <!-- Footer -->
      <Footer />
      <!-- End of Footer -->
    </div>
    <!-- End of Content Wrapper -->

    <!-- Update Profile Modal -->
    <div
      class="modal fade"
      id="updateProfile"
      tabindex="-1"
      role="dialog"
      aria-labelledby="updateProfileLabel"
      aria-hidden="true"
      ref="updateProfileRef"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addInvoiceModalLabel">
              Update Profile
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
            <form @submit.prevent="updateUserProfile">
              <div class="form-group">
                <label for="profileImage">Profile Image</label>
                <input
                  type="file"
                  id="profileImage"
                  class="form-control"
                  @change="onImageChange"
                />
                <i>{{user.image}}</i>
              </div>
              <div class="form-group">
                <label for="name">Name</label>
                <input
                  type="text"
                  id="name"
                  class="form-control"
                  v-model="user.name"
                />
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input
                  type="email"
                  id="email"
                  class="form-control"
                  v-model="user.email"
                />
              </div>
              <div class="form-group">
                <label for="position">Position</label>
                <input
                  type="text"
                  id="position"
                  class="form-control"
                  v-model="user.position"
                />
              </div>
              <button type="submit" class="btn btn-primary">Save changes</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "../../components/Sidebar-User.vue";
import Navbar from "../../components/Navbar-Admin.vue";
import Footer from "../../components/Footer.vue";
import axios from "axios";
import Swal from "sweetalert2";

export default {
  components: {
    Sidebar,
    Navbar,
    Footer,
  },
  data() {
    return {
      sidebarToggled: false,
      sidebarClass: "",
      user: {
        id:"",
        image: "",
        name: "",
        email: "",
        position: "",
      },
      showModal: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebarToggled = !this.sidebarToggled;
      this.sidebarClass = this.sidebarToggled ? "toggle-sidebar" : "";
    },
    async fetchUserData() {
      try {
        const response = await axios.get("http://localhost:8000/api/auth/me", {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        });
        this.user = response.data;
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    },
    async updateUserProfile() {
      try {
        const formData = new FormData();
        formData.append("image", this.user.image);
        formData.append("name", this.user.name);
        formData.append("email", this.user.email);
        formData.append("position", this.user.position);

        await axios.post(
          `http://localhost:8000/api/auth/update/${this.user.id}`,
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
          text: "Profile berhasil diupdate",
          confirmButtonText: "OK",
        }).then(() => {
          $("#updateProfile").modal("hide");
          this.$router.push("/profile");
        });
        this.fetchUserData();
      } catch (error) {
        console.error("Error updating user profile", error);
      }
    },
    onImageChange(event) {
      this.user.image = event.target.files[0];
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
        this.fetchUserData();
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
