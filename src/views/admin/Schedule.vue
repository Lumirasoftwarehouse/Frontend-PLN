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
            <h1 class="h3 mb-0 text-gray-800 text-center">Schedule</h1>
          </div>
          <div>
            <vue-cal
              style="height: 700px"
              :events="events"
              :on-event-click="onEventClick"
              default-view="Month"
            >
              <template v-slot:event="props">
                <div class="custom-event">
                  {{ props.event.title }}
                </div>
              </template>
            </vue-cal>
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

<script setup>
import Sidebar from "../../components/Sidebar.vue";
import Navbar from "../../components/Navbar-Admin.vue";
import Footer from "../../components/Footer.vue";
import { ref } from "vue";
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css"; // Atau gunakan vuecal.sass untuk SASS

const sidebarToggled = ref(false);
const sidebarClass = ref("");

const toggleSidebar = () => {
  sidebarToggled.value = !sidebarToggled.value;
  sidebarClass.value = sidebarToggled.value ? "toggle-sidebar" : "";
};

const events = ref([
  {
    start: "2024-06-01 10:00",
    end: "2024-06-01 11:00",
    title: "Acara 1",
    content: "Deskripsi Acara 1",
  },
  {
    start: "2024-06-05 12:00",
    end: "2024-06-05 13:30",
    title: "Acara 2",
    content: "Deskripsi Acara 2",
  },
  {
    start: "2024-06-10 09:00",
    end: "2024-06-10 10:30",
    title: "Acara 3",
    content: "Deskripsi Acara 3",
  },
  // Tambahkan acara dummy lainnya di sini
]);

const onEventClick = (event) => {
  alert(`Acara: ${event.title}\nDeskripsi: ${event.content}`);
};
</script>

<style scoped>
.custom-event {
  background-color: #f0f8ff;
  padding: 2px 5px;
  border-radius: 3px;
}
</style>
