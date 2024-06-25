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
                <span v-if="day.date">{{ day.date.getDate() }}</span>
                <router-link
                  to="/detail-schedule"
                 >
                <div
                  v-for="event in day.events"
                  :key="event.title"
                  class="event-box"
                >
                  {{ event.title }}
                </div>
                </router-link>
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
import { ref, computed, watchEffect } from "vue";
import Sidebar from "../../components/Sidebar.vue";
import Navbar from "../../components/Navbar-Admin.vue";
import Footer from "../../components/Footer.vue";

export default {
  components: {
    Sidebar,
    Navbar,
    Footer,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const sidebarToggled = ref(false);
    const sidebarClass = ref("");

    const toggleSidebar = () => {
      sidebarToggled.value = !sidebarToggled.value;
      sidebarClass.value = sidebarToggled.value ? "toggle-sidebar" : "";
    };

    const currentDate = ref(new Date());
    const detailPhase = ref([]);

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthNames = [
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
    ];

    const year = computed(() => currentDate.value.getFullYear());
    const month = computed(() => currentDate.value.getMonth());
    const monthName = computed(() => monthNames[month.value]);

    const startOfMonth = computed(() => new Date(year.value, month.value, 1));
    const endOfMonth = computed(() => new Date(year.value, month.value + 1, 0));
    const startDay = computed(() => startOfMonth.value.getDay());
    const daysInMonth = computed(() => endOfMonth.value.getDate());

    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/project/detail-project/${props.id}`,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        );
        detailPhase.value = response.data.data.dataPhase.map((phase) => ({
          startDate: new Date(phase.start_date),
          endDate: new Date(phase.end_date),
          title: phase.phase,
        }));
      } catch (error) {
        console.error(error);
      }
    };

    const calendarDays = computed(() => {
      const days = [];
      for (let i = 0; i < startDay.value; i++) {
        days.push({ date: null, events: [], index: `empty-${i}` });
      }
      for (let i = 1; i <= daysInMonth.value; i++) {
        const date = new Date(year.value, month.value, i);
        const eventsOnDate = detailPhase.value
          .filter((event) => date >= event.startDate && date <= event.endDate)
          .map((event) => ({
            title: event.title,
          }));
        days.push({ date, events: eventsOnDate });
      }
      return days;
    });

    const prevMonth = () => {
      currentDate.value.setMonth(currentDate.value.getMonth() - 1);
      currentDate.value = new Date(currentDate.value); // force update
    };

    const nextMonth = () => {
      currentDate.value.setMonth(currentDate.value.getMonth() + 1);
      currentDate.value = new Date(currentDate.value); // force update
    };

    watchEffect(() => {
      fetchEvents();
    });

    return {
      daysOfWeek,
      monthName,
      year,
      calendarDays,
      prevMonth,
      nextMonth,
      sidebarClass,
      toggleSidebar,
    };
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
}

.event-box {
  font-size: 0.8em;
  background-color: #e0f7fa;
  margin-top: 5px;
  padding: 2px 5px;
  border-radius: 3px;
  width: 100%;
  text-align: center;
}
</style>
