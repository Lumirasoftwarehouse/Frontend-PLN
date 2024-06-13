<template>
  <div class="row">
    <div class="col-md-3 mb-3" v-for="project in projects" :key="project.id">
      <div
        class="card h-100 text-white bg-primary"
        data-toggle="modal"
        data-target="#modalDetailProject"
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
              {{ project.status === "1" ? "In Progress" : "Completed" }}
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
        <h5 class="modal-title" id="modalDetailProjectLabel">Project Details</h5>
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
                <h5 class="fw-bold">PT Ecorn Consulting</h5>
                <span>Project</span><br />
                <h5 class="fw-bold">Consulting & Training</h5>
              </div>
              <div class="col-6 text-end">
                <button class="btn btn-success">Completed</button>
              </div>
            </div>

            <!-- Phases -->
            <h6 class="mt-3">Phases</h6>
            <div class="row mb-2">
              <div class="col-6">
                <span>Phase 1</span><br />
                <span class="subPhase">Initial Consultation</span><br />
                <span class="phaseTgl">March 15, 2021</span>
              </div>
              <div class="col-6 text-end">
                <button class="btn btn-success">Completed</button>
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-6">
                <span>Phase 2</span><br />
                <span class="subPhase">Implementation</span><br />
                <span class="phaseTgl">April 15, 2021</span>
              </div>
              <div class="col-6 text-end">
                <button class="btn btn-success">Completed</button>
              </div>
            </div>

            <!-- Deliverables -->
            <h6 class="mt-3">Deliverables</h6>
            <div class="row mb-2">
              <div class="col-6">
                <span>Deliverable 1</span><br />
                <h6>Project Report</h6>
              </div>
              <div class="col-6 text-end">
                <button class="btn btn-success">Completed</button>
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-6">
                <span>Deliverable 2</span><br />
                <h6>Training Materials</h6>
              </div>
              <div class="col-6 text-end">
                <button class="btn btn-success">Completed</button>
              </div>
            </div>

            <!-- Files -->
            <h6 class="mt-3"><i class="bi bi-link-45deg"></i> Files</h6>
            <div class="row">
              <div class="col-6">
                <div class="mb-3">
                  <input type="file" class="form-control" id="file1" />
                </div>
              </div>
              <div class="col-6">
                <div class="mb-3">
                  <input type="file" class="form-control" id="file2" />
                </div>
              </div>
            </div>
          </div>

          <!-- Right column -->
          <div class="col-4">
            <span>Due Date</span><br />
            <h5 class="fw-bold">Mar 26, 2021</h5><br />
            <span>People</span><br />
            <div class="d-flex align-items-center mb-3">
              <img src="path/to/photo.jpg" class="rounded-circle me-2" alt="User Photo" width="50" height="50" />
              <div>
                <h6 class="mb-0">John Doe</h6>
                <small>Project Manager</small>
              </div>
            </div>
            <div class="d-flex align-items-center">
              <img src="path/to/photo.jpg" class="rounded-circle me-2" alt="User Photo" width="50" height="50" />
              <div>
                <h6 class="mb-0">Jane Smith</h6>
                <small>Consultant</small>
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
export default {
  name: "CardProject",
  props: {
    projects: {
      type: Array,
      required: true,
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
