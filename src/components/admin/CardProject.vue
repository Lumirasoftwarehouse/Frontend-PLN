<template>
  <div class="row">
    <div class="col-md-3 mb-3" v-for="project in projects" :key="project.id">
      <div class="card h-100 text-white bg-primary">
        <div class="card-body pt-2 ps-3 pe-3">
          <div class="status-date d-flex justify-content-between mb-2">
            <span class="status" :class="{'status-active': project.status === '1', 'status-inactive': project.status === '0'}">
              {{ project.status === '1' ? 'Active' : 'Inactive' }}
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
</template>

<script>
export default {
  name: 'CardProject',
  props: {
    projects: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
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
  background-color: #dc3545; /* Warna merah untuk status tidak aktif */
  color: white;
}
.date {
  background-color: white;
  color: #007bff;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.9rem;
}
.card-client {
  /* font-weight: bold; */
}
.card-project {

}
.card-icons i {
  cursor: pointer;
  font-size: 1.2rem;
}
</style>
