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

    <!-- Nav Item - Dashboard -->
    <li class="nav-item mt-5">
      <router-link
        class="nav-link"
        to="/user-dashboard"
        active-class="active-link"
      >
        <i class="bi bi-grid"></i>
        <span>Dashboard</span>
      </router-link>
    </li>
    <li class="nav-item">
      <router-link
        class="nav-link"
        to="/user-projects"
        active-class="active-link"
      >
        <i class="bi bi-file-earmark-fill"></i>
        <span>Projects</span>
      </router-link>
    </li>
    <li class="nav-item">
      <router-link
        class="nav-link"
        to="/user-monitoring"
        active-class="active-link"
      >
        <i class="bi bi-graph-up-arrow"></i>
        <span>Monitoring</span>
      </router-link>
    </li>
    <li class="nav-item">
      <router-link
        class="nav-link"
        to="/user-history"
        active-class="active-link"
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

.nav-link {
  color: white !important;
  position: relative;
  text-align: center;
}

.nav-link.active-link {
  background-color: white !important;
  color: #000 !important;
  border-radius: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.nav-link.active-link > i {
  color: #000 !important;
}
</style>
