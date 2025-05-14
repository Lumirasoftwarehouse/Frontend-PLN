<template>
  <div class="row">
    <div
      class="col-md-3 mb-3"
      v-for="project in filteredProjects" :key="project.id"
    >
      <div
        class="card h-100 text-white bg-primary"
        data-toggle="modal"
        data-target="#modalDetailProject"
        @click="setDataDetail(project.id)"
      >
        <div class="card-body pt-2 ps-3 pe-3">
          <div class="status-date d-flex justify-content-between mb-2">
            <span
              class="status"
              :class="{
                'status-active': project.status === '1',
                'status-inactive': project.status === '0',
              }"
            >
              {{ project.status === "1" ? "Completed" : "In Progress" }}
            </span>
            <span class="date">
              {{ new Date(project.dueDate).toLocaleDateString() }}
            </span>
          </div>
          <div class="card-client mb-2">Client: {{ project.client }}</div>
          <div class="card-project mb-4">Project: {{ project.project }}</div>
          <div class="card-icons d-flex justify-content-between">
            <i class="fas fa-comment"></i>
            <i class="fas fa-link"></i>
            <i class="fas fa-user"></i>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- modal detail project -->
  <div
    class="modal fade"
    id="modalDetailProject"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modalDetailProjectLabel"
    aria-hidden="true"
    ref="modalDetailProjectRef"
  >
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalDetailProjectLabel">
            Project Details
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
          <div class="row">
            <div class="col-8">
              <div class="row mb-3">
                <div class="col-6">
                  <span>Client</span><br />
                  <h5 class="fw-bold">{{ detailProject.client }}</h5>
                  <span>Project</span><br />
                  <h5 class="fw-bold">{{ detailProject.project }}</h5>
                </div>
                <div class="col-6 text-end">
                  <button class="btn btn-success">Completed</button>
                </div>
              </div>

              <!-- Phases -->
              <h6 class="mt-3">Phases</h6>
              <div class="row mb-2">
                <div
                  class="col-6"
                  v-for="(item, index) in detailPhase"
                  :key="item.id"
                >
                  <span>Phase {{ index + 1 }}</span
                  ><br />
                  <span class="subPhase">{{ item.phase }}</span
                  ><br />
                  <span class="phaseTgl">{{ item.start_date }}</span>
                </div>
                <div class="col-6 text-end">
                  <button class="btn btn-success">Completed</button>
                </div>
              </div>

              <!-- Deliverables -->
              <h6 class="mt-3">Deliverables</h6>
              <div
                class="row mb-2"
                v-for="(item, index) in detailDeliverable"
                :key="item.id"
              >
                <div class="col-6">
                  <span>Deliverable {{ index + 1 }}</span
                  ><br />
                  <h6>{{ item.deliverable }}</h6>
                  <h6><i class="bi bi-link-45deg"></i> {{ item.file }}</h6>
                  <h6>{{ item.notes }}</h6>
                </div>
                <div class="col-6 text-end">
                  <button class="btn btn-success">Completed</button>
                </div>
              </div>
            </div>

            <!-- Right column -->
            <div class="col-4">
              <span>Due Date</span><br />
              <h5 class="fw-bold">{{ detailProject.dueDate }}</h5>
              <br />
              <span>People</span><br />
              <div
                class="d-flex align-items-center mb-3"
                v-for="item in detailUserProject"
                :key="item.id"
              >
                <img
                  src="path/to/photo.jpg"
                  class="rounded-circle me-2"
                  alt="User Photo"
                  width="50"
                  height="50"
                />
                <div>
                  <h6 class="mb-0">{{ item.name }}</h6>
                  <small>{{ item.position }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- end modal detail project -->
</template>

<script>
import axios from "axios";
export default {
  name: "CardProject",
  props: {
    projects: {
      type: Array,
      required: true,
    },
    statusProject: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      detailProject: [],
      detailPhase: [],
      detailDeliverable: [],
      detailUserProject: [],
    };
  },
  computed: {
    filteredProjects() {
      if (this.statusProject === 'all') {
        return this.projects;
      } else {
        return this.projects.filter(project => project.status === this.statusProject);
      }
    }
  },
  methods: {
    setDataDetail(id) {
      this.getAllDataProject(id);
    },
    async getAllDataProject(id) {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/project/detail-project/${id}`,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        );
        this.detailProject = response.data.data.dataProject;
        this.detailPhase = response.data.data.dataPhase;
        this.detailDeliverable = response.data.data.dataDeliverable;
        this.detailUserProject = response.data.data.dataUserProject;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.subPhase {
  font-size: 15px;
}
.phaseTgl {
  font-size: 12px;
}

.card {
  background-color: #007bff; /* Warna biru */
  color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
}
.card:hover {
  transform: translateY(-5px);
}
.card-body {
  padding: 20px;
}
.status-date {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.status {
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.9rem;
}
.status-active {
  background-color: #28a745; /* Warna hijau untuk status aktif */
  color: white;
}
.status-inactive {
  background-color: #a7b307; /* Warna merah untuk status tidak aktif */
  color: white;
}
.date {
  background-color: white;
  color: #007bff;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.9rem;
}
.card-icons i {
  cursor: pointer;
  font-size: 1.2rem;
}
</style>
