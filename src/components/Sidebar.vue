<template>
  <!-- Sidebar -->
  <ul
    class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    id="accordionSidebar"
    :class="{ toggled: sidebarToggled }"
  >
    <!-- Sidebar - Brand -->
    <a
      class="sidebar-brand d-flex align-items-center justify-content-center"
      href="#"
    >
      <div class="sidebar-brand-icon mt-2">
        <img src="/img/logoLogin.png" alt="logo" height="40" />
      </div>
      <div class="sidebar-brand-text ms-3">
        <span class="text-light">PLN</span>
      </div>
    </a>

    <!-- Divider -->
    <!-- <hr class="sidebar-divider my-0 mt-5"> -->

    <!-- Heading -->
    <div class="sidebar-heading mt-5 text-light">Menu</div>
    <!-- Nav Item - Dashboard -->
    <li class="nav-item">
      <router-link
        class="nav-link text-light"
        to="/admin-dashboard"
        active-class="font-weight-bold"
      >
        <i class="bi bi-speedometer2 text-light"></i>
        <span>Dashboard</span>
      </router-link>
    </li>
    <li class="nav-item">
      <router-link
        class="nav-link text-light"
        to="/admin-projects"
        active-class="font-weight-bold"
      >
        <i class="bi bi-file-earmark-fill text-light"></i>
        <span>Projects</span>
      </router-link>
    </li>
    <li class="nav-item">
      <router-link
        class="nav-link text-light"
        to="/admin-monitoring"
        active-class="font-weight-bold"
      >
        <i class="bi bi-graph-up-arrow text-light"></i>
        <span>Monitoring</span>
      </router-link>
    </li>
    <li class="nav-item">
      <router-link
        class="nav-link text-light"
        to="/admin-history"
        active-class="font-weight-bold"
      >
        <i class="bi bi-clock-history"></i>
        <span>History</span>
      </router-link>
    </li>
  </ul>
  <!-- End of Sidebar -->
</template>
<script>
export default {
  data() {
    return {
      sidebarToggled: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebarToggled = !this.sidebarToggled;
    },
  },
};
</script>

<style>
@media (max-width: 576px) {
  /* Gaya CSS untuk menyembunyikan sidebar saat sidebarToggled bernilai false */
  .sidebar {
    display: none;
  }
}
/* Gaya CSS untuk menampilkan sidebar saat sidebarToggled bernilai true */
.toggle-sidebar {
  display: block !important;
  /* Tambahkan gaya CSS lain yang Anda inginkan untuk tampilan sidebar yang ditampilkan */
}
.nav-link.active-link,
.nav-link > i {
  font-weight: bold;
  color: white !important;
}

.nav-link.active-link::before {
  content: "";
  display: block;
  width: 50%;
  height: 3px;
  background-color: white;
  position: absolute;
  bottom: 0;
}
</style>