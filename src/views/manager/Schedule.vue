<script setup>
import Sidebar from "../../components/manager/Sidebar.vue";
import Navbar from "../../components/Navbar-Admin.vue";
import Footer from "../../components/Footer.vue";
import CardProject from "../../components/admin/CardProject.vue";
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
        <div class="calendar-wrapper">
          <div class="calendar-header">
            <button @click="prevMonth">Previous</button>
            <h2>{{ monthName }} {{ year }}</h2>
            <button @click="nextMonth">Next</button>
          </div>

          <div class="calendar-grid">
            <div class="calendar-day" v-for="day in daysOfWeek" :key="day">
              {{ day }}
            </div>

            <div
              v-for="day in calendarDays"
              :key="day.date ? day.date.toISOString() : day.index"
              class="calendar-date"
            >
              <span v-if="day.date">{{ formatShortDate(day.date) }}</span>

              <div
                v-for="event in day.events"
                :key="event.title + formatDate(day.date)"
                class="event-box"
                :class="event.status === 1 ? 'event-blue' : 'event-red'"
                :style="{
                  cursor: event.status === 0 ? 'pointer' : 'not-allowed',
                }"
                @click="
                  event.status === 0 &&
                    fetchDetailPhase(event.id, formatDate(day.date))
                "
                v-bind="
                  event.status === 0
                    ? { 'data-toggle': 'modal', 'data-target': '#laporanPhase' }
                    : {}
                "
              >
                {{ event.title }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End of Main Content -->

      <!-- Footer -->
      <Footer />
      <!-- End of Footer -->
    </div>
    <!-- End of Content Wrapper -->
  </div>

  <!-- laporan phase -->
  <div
    class="modal fade"
    id="laporanPhase"
    tabindex="-1"
    role="dialog"
    aria-labelledby="laporanPhase"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="laporanPhase">Laporan phase</h5>
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
          <div class="row">
            <div class="col-sm-3">Phase</div>
            <div class="col-sm-9">: {{ detailPhaseById.phase }}</div>
          </div>
          <div class="row">
            <div class="col-sm-3">Notes</div>
            <div class="col-sm-9">: {{ detailPhaseById.notes }}</div>
          </div>
          <form>
            <div class="form-group mt-2">
              <label for="date">Tanggal: </label>
              <input
                class="form-control"
                type="text"
                id="date"
                v-model="laporanPhase.tanggal"
                readonly
              />
            </div>
            <div class="form-group">
              <label for="report">Laporan: </label>
              <textarea
                class="form-control"
                id="report"
                v-model="laporanPhase.laporan"
                required
              ></textarea>
            </div>
            <div class="form-group">
              <label for="file">Lampiran: </label>
              <input
                type="file"
                class="form-control"
                id="lampiran"
                @change="handleFileUpload"
                ref="lampiran"
              />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Batal
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="createLaporanPhase"
          >
            Kirim
          </button>
        </div>
      </div>
    </div>
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
      currentDate: new Date(),
      detailPhaseStatus: [],
      daysOfWeek: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      // daysOfWeek: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],

      monthNames: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      detailPhaseById: [],
      laporanPhase: {
        tanggal: "",
        laporan: "",
        lampiran: null,
        id_phase: "",
      },
    };
  },
  computed: {
    adjustedStartDay() {
      // geser Sunday (0) ke akhir
      const day = this.startOfMonth.getDay(); // default: Sunday = 0
      return day === 0 ? 6 : day - 1; // ubah: Sunday jadi 6, Monday jadi 0
    },
    year() {
      return this.currentDate.getFullYear();
    },
    month() {
      return this.currentDate.getMonth();
    },
    monthName() {
      return this.monthNames[this.month];
    },
    startOfMonth() {
      return new Date(this.year, this.month, 1);
    },
    endOfMonth() {
      return new Date(this.year, this.month + 1, 0);
    },
    startDay() {
      return this.startOfMonth.getDay();
    },
    daysInMonth() {
      return this.endOfMonth.getDate();
    },
    calendarDays() {
      const days = [];

      // Padding di awal bulan
      for (let i = 0; i < this.adjustedStartDay; i++) {
        days.push({ date: null, events: [], index: `empty-${i}` });
      }

      // Isi hari-hari dalam bulan
      for (let i = 1; i <= this.daysInMonth; i++) {
        const date = new Date(this.year, this.month, i);
        const dateStr = date.toISOString().split("T")[0];
        const eventsOnDate = [];

        this.detailPhaseStatus.forEach((phase) => {
          const match = phase.tanggal_status.find((t) => t.tanggal === dateStr);
          if (match) {
            eventsOnDate.push({
              id: phase.phase_id,
              title: phase.phase_name,
              status: match.status,
            });
          }
        });

        days.push({ date, events: eventsOnDate });
      }

      return days;
    },
  },
  methods: {
    formatShortDate(date) {
      const d = new Date(date);
      const day = String(d.getUTCDate()).padStart(2, "0");
      const month = String(d.getUTCMonth() + 1).padStart(2, "0");
      const year = d.getUTCFullYear();
      return day;
    },
    formatDate(date) {
      const d = new Date(date);
      const day = String(d.getUTCDate()).padStart(2, "0");
      const month = String(d.getUTCMonth() + 1).padStart(2, "0");
      const year = d.getUTCFullYear();
      return `${year}/${month}/${day}`;
    },
    formatDateForBackend(date) {
      const d = new Date(date);
      const day = String(d.getUTCDate()).padStart(2, "0");
      const month = String(d.getUTCMonth() + 1).padStart(2, "0");
      const year = d.getUTCFullYear();
      return `${year}-${month}-${day}`; // sesuai format MySQL
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      this.laporanPhase.lampiran = file;
    },
    prevMonth() {
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
      this.currentDate = new Date(this.currentDate);
    },
    nextMonth() {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
      this.currentDate = new Date(this.currentDate);
    },
    async fetchCalendarStatus(userId) {
      try {
        const token = sessionStorage.getItem("token");
        const res = await axios.get(
          `http://127.0.0.1:8000/api/project/${this.id}/user/${userId}/phase-details`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.detailPhaseStatus = res.data.data;
      } catch (err) {
        this.showAlert("Error", "Data phase gagal ditampilkan", "error");
      }
    },
    async fetchDetailPhase(id, tanggal) {
      try {
        const token = sessionStorage.getItem("token");
        const res = await axios.get(
          `http://127.0.0.1:8000/api/phase/phase-detail/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.detailPhaseById = res.data.data;
        this.laporanPhase.tanggal = tanggal;
        this.laporanPhase.id_phase = id;
      } catch (err) {
        this.showAlert("Error", "Detail laporan gagal ditampilkan", "error");
      }
    },
    async createLaporanPhase() {
      try {
        const token = sessionStorage.getItem("token");
        const formData = new FormData();
        for (const key in this.laporanPhase) {
          formData.append(key, this.laporanPhase[key]);
        }
        const res = await axios.post(
          `http://127.0.0.1:8000/api/laporan-phase/create`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.showAlert("Success", "Laporan berhasil dibuat", "success");
      } catch (err) {
        this.showAlert("Error", "Laporan gagal dibuat", "error");
      }
    },
    showAlert(title, text, icon) {
      this.$swal({
        title: title,
        text: text,
        icon: icon, // Atau gunakan icon lain sesuai kebutuhan
      }).then(() => {});
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
        const level = tokenPayload.level;
        if (level !== "1") {
          this.$router.push("/unauthorized");
        } else if (!header || !signature) {
          this.$router.push("/");
          sessionStorage.removeItem("token");
        }
        // success
        this.fetchCalendarStatus(tokenPayload.id);
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

<style scoped>
.calendar-wrapper {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
}

.calendar-day,
.calendar-date {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  flex-direction: column;
  min-height: 80px;
}

.event-box {
  margin-top: 5px;
  padding: 4px 6px;
  border-radius: 4px;
  font-size: 0.75rem;
  width: 100%;
  text-align: center;
  color: white;
}

.event-red {
  background-color: #f44336;
}

.event-blue {
  background-color: #2196f3;
}
</style>
