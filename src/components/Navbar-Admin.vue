<template>
  <!-- Topbar -->
  <nav class="navbar navbar-expand navbar-light topbar mb-4 static-top shadow">
    <!-- Search bar -->
    <form class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
      <div class="input-group">
        <input
          type="text"
          class="form-control bg-light border-0 small"
          placeholder="Search for..."
          aria-label="Search"
          aria-describedby="basic-addon2"
        />
        <div class="input-group-append">
          <button class="btn btn-primary" type="button">
            <i class="fas fa-search fa-sm"></i>
          </button>
        </div>
      </div>
    </form>

    <!-- Topbar Navbar -->
    <ul class="navbar-nav ml-auto">
      <!-- Nav Item - Alerts -->
      <li class="nav-item dropdown no-arrow mx-1">
        <a class="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i class="fas fa-bell fa-fw text-primary"></i>
          <!-- Counter - Alerts -->
          <span class="badge badge-danger badge-counter">3+</span>
        </a>
        <!-- Dropdown - Alerts -->
        <div class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
          <h6 class="dropdown-header">Alerts Center</h6>
          <a class="dropdown-item d-flex align-items-center" href="#">
            <div class="mr-3">
              <div class="icon-circle bg-primary">
                <i class="fas fa-file-alt text-white"></i>
              </div>
            </div>
            <div>
              <div class="small text-gray-500">December 12, 2019</div>
              <span class="font-weight-bold">A new monthly report is ready to download!</span>
            </div>
          </a>
          <a class="dropdown-item d-flex align-items-center" href="#">
            <div class="mr-3">
              <div class="icon-circle bg-success">
                <i class="fas fa-donate text-white"></i>
              </div>
            </div>
            <div>
              <div class="small text-gray-500">December 7, 2019</div>
              $290.29 has been deposited into your account!
            </div>
          </a>
          <a class="dropdown-item d-flex align-items-center" href="#">
            <div class="mr-3">
              <div class="icon-circle bg-warning">
                <i class="fas fa-exclamation-triangle text-white"></i>
              </div>
            </div>
            <div>
              <div class="small text-gray-500">December 2, 2019</div>
              Spending Alert: We've noticed unusually high spending for your account.
            </div>
          </a>
          <a class="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
        </div>
      </li>

      <div class="topbar-divider d-none d-sm-block"></div>

      <!-- Nav Item - User Information -->
      <li class="nav-item dropdown no-arrow">
        <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span class="mr-2 d-none d-lg-inline text-black small">{{ this.name }}</span>
          <img src="/img/nobi.jpg" alt=" gambarprofile" class="img-profile rounded-circle" />
        </a>
        <!-- Dropdown - User Information -->
        <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
          <a class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal" @click="konfirmasi()">
            <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
            Logout
          </a>
        </div>
      </li>
    </ul>
  </nav>
  <!-- End of Topbar -->
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  props: {
    sidebarToggled: Boolean,
  },

  data() {
    return {
      name: "",
      gambar: "",
      user_id: "",
    };
  },
  methods: {
    sidebarToggled() {
      this.$emit("toggle-sidebar", !this.sidebarToggled);
    },
    konfirmasi() {
      Swal.fire({
        title: "Apakah Anda yakin ingin logout?",
        text: "Anda akan keluar dari akun ini.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Logout",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          this.logout();
        }
      });
    },
    logout() {
      const token = sessionStorage.getItem("token");
      if (!token) {
        Swal.fire({
          title: "Logout gagal",
          text: "Token tidak ditemukan.",
          icon: "error",
          confirmButtonColor: "#d33",
        });
        return;
      }

      axios
        .post(`https://backend-webmember.lumirainternational.com/api/auth/logout`, null, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          Swal.fire({
            title: `Logout berhasil!`,
            icon: "success",
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
          });

          sessionStorage.removeItem("token");
          this.$router.push("/");
        })
        .catch((error) => {
          console.error(error);

          Swal.fire({
            title: "Logout gagal",
            text: "Terjadi kesalahan saat melakukan logout.",
            icon: "error",
            confirmButtonColor: "#d33",
          });
        });
    },
  },
  created() {
    const token = sessionStorage.getItem("token");

    if (token) {
      try {
        const tokenPayload = JSON.parse(atob(token.split(".")[1]));
        this.name = tokenPayload.name;
        this.user_id = tokenPayload.id;
        this.gambar = tokenPayload.gambar;
      } catch (error) {
        console.error("Error decoding token:", error);
        this.$router.push("/");
      }
    } else {
      this.$router.push("/");
    }
  },
};
</script>

<style scoped>
.customNav {
  border-bottom: 5px solid #fac800;
}
.bgCustom {
  background-color: #061387;
}
.img-profile {
  height: 40px;
  width: 40px;
}
</style>
