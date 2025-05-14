<template>
  <div id="wrapper">
    <Sidebar :class="sidebarClass" />

    <div id="content-wrapper" class="d-flex flex-column">
      <div id="content">
        <Navbar @toggle-sidebar="toggleSidebar" />

        <div class="container-fluid mt-4">
          <div class="d-flex justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Divisi</h1>
            <button
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#modalAddDivisi"
            >
              Add Division
            </button>
          </div>

          <div class="table-responsive">
            <div v-if="!ready" class="preloader">Loading...</div>
            <DataTable class="display table table-striped" v-if="ready">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Divisi</th>
                  <th>Atasan</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in divisis" :key="item.id">
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.nama_divisi }}</td>
                  <td>{{ item.nama_atasan }}</td>
                  <td>
                    <div class="btn-group">
                      <button
                        type="button"
                        class="btn btn-warning"
                        data-toggle="modal"
                        data-target="#modalUpdateDivisi"
                        @click="setData(item)"
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        class="btn btn-danger"
                        @click="deleteDivisi(item.id)"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </DataTable>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  </div>

  <!-- Modal Add Divisi -->
  <div class="modal fade" id="modalAddDivisi" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add Division</h5>
          <button type="button" class="close" data-dismiss="modal">
            <span>&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label class="form-label">Division Name</label>
              <input
                type="text"
                class="form-control"
                v-model="newDivision.nama_divisi"
                placeholder="Enter division name"
              />
            </div>

            <div class="mb-3">
              <label class="form-label">PIC Division</label>
              <select class="form-select" v-model="newDivision.id_atasan">
                <option disabled value="">Select PIC</option>
                <option v-for="manager in managers" :key="manager.id" :value="manager.id">
                  {{ manager.name }}
                </option>
              </select>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
              <button type="button" class="btn btn-primary" @click="addDivisi()">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Update Divisi -->
  <div class="modal fade" id="modalUpdateDivisi" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Update Division</h5>
          <button type="button" class="close" data-dismiss="modal">
            <span>&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label class="form-label">Division Name</label>
              <input
                type="text"
                class="form-control"
                v-model="dataUpdateDivisi.nama_divisi"
                placeholder="Enter division name"
              />
            </div>

            <div class="mb-3">
              <label class="form-label">PIC Division</label>
              <select class="form-select" v-model="dataUpdateDivisi.id_atasan">
                <option disabled value="">Select PIC</option>
                <option v-for="manager in managers" :key="manager.id" :value="manager.id">
                  {{ manager.name }}
                </option>
              </select>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
              <button type="button" class="btn btn-primary" @click="updateDivisi()">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "../../components/Sidebar.vue";
import Navbar from "../../components/Navbar-Admin.vue";
import Footer from "../../components/Footer.vue";
import axios from "axios";
import Swal from "sweetalert2";
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net";

DataTable.use(DataTablesCore);

export default {
  components: {
    Sidebar,
    Navbar,
    Footer,
    DataTable
  },
  data() {
    return {
      sidebarToggled: false,
      sidebarClass: "",
      divisis: [],
      managers: [],
      ready: false,
      newDivision: {
        nama_divisi: "",
        id_atasan: "",
      },
      currentDivision: {
        id: "",
        nama_divisi: "",
        nama_atasan: "",
      },
      dataUpdateDivisi: {
        nama_divisi: "",
        id_atasan: "",
      },
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebarToggled = !this.sidebarToggled;
      this.sidebarClass = this.sidebarToggled ? "toggle-sidebar" : "";
    },
    setData(item) {
      this.currentDivision = { ...item };
      this.dataUpdateDivisi = {
        nama_divisi: item.nama_divisi,
        id_atasan: item.id_atasan,
      };
    },
    async listDivisi() {
      try {
        this.ready = false;
        const response = await axios.get("http://127.0.0.1:8000/api/divisi/list", {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        });
        this.divisis = response.data.data;
        this.ready = true;
      } catch (error) {
        console.error(error);
      }
    },
    async listManager() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/auth/list-manager", {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        });
        this.managers = response.data.data;
      } catch (error) {
        console.error(error);
      }
    },
    async addDivisi() {
      try {
        const formData = new FormData();
        formData.append("nama_divisi", this.newDivision.nama_divisi);
        formData.append("id_atasan", this.newDivision.id_atasan);

        await axios.post("http://127.0.0.1:8000/api/divisi/create", formData, {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        });

        Swal.fire("Success", "Division added successfully.", "success");
        this.newDivision = { nama_divisi: "", id_atasan: "" };
        this.listDivisi();

        setTimeout(() => {
          $("#modalAddDivisi").modal("hide");
        }, 500);
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "Failed to add division.", "error");
      }
    },
    async updateDivisi() {
      try {
        const formData = new FormData();
        formData.append("nama_divisi", this.dataUpdateDivisi.nama_divisi);
        formData.append("id_atasan", this.dataUpdateDivisi.id_atasan);

        await axios.post(
          `http://127.0.0.1:8000/api/divisi/update/${this.currentDivision.id}`,
          formData,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        );

        Swal.fire("Success", "Division updated successfully.", "success");
        this.ready = false;
        this.listDivisi();

        setTimeout(() => {
          $("#modalUpdateDivisi").modal("hide");
        }, 500);
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "Failed to update division.", "error");
      }
    },
    async deleteDivisi(id) {
      try {
        const confirm = await Swal.fire({
          title: "Are you sure?",
          text: "Data will be deleted permanently.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
        });

        if (confirm.isConfirmed) {
          await axios.delete(`http://127.0.0.1:8000/api/divisi/delete/${id}`, {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          });

          Swal.fire("Deleted!", "Division has been deleted.", "success");
          this.listDivisi();
        }
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "Failed to delete division.", "error");
      }
    },
  },
  mounted() {
    this.listDivisi();
    this.listManager();
  },
};
</script>

<style scoped>
.preloader {
  text-align: center;
  padding: 20px;
  font-size: 18px;
}
</style>
