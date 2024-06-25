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
          <!-- Content Row -->
          <div class="row">
            <div class="col-sm-8">
              <input
                type="text"
                class="form-control mb-3"
                id="internalMeer"
                placeholder="Internal meeting"
              />
              <div class="row mb-3">
                <div class="col-sm-2">Date</div>
                <div class="col-sm-5">
                  <input type="date" class="form-control" id="startDate" />
                </div>
                <div class="col-sm-5">
                  <input type="date" class="form-control" id="endDate" />
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-sm-2">Time</div>
                <div class="col-sm-5">
                  <input type="number" class="form-control" id="startTime" />
                </div>
                <div class="col-sm-5">
                  <input type="number" class="form-control" id="endTime" />
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-sm-2">Repeat</div>
                <div class="col-sm-5">
                  <select
                    class="form-select"
                    aria-label="Default select example"
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
                  <textarea class="form-control" id="notes" rows="3"></textarea>
                </div>
              </div>
              <div class="row">
                <div class="col-6"></div>
                <div class="col-6">
                  <button class="btn btn-outline-primary">Cancel</button>
                  <button class="btn btn-primary float-end">
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

export default {
  data() {
    return {
      role: null,
    };
  },
};
</script>


<style>
#content-wrapper {
  min-height: 780px !important;
}
</style>
