<template>
  <div class="row">
    <div class="col-sm-12">
      <p class="float-end text-primary" @click="addPhase" style="cursor: pointer">
        <i class="bi bi-plus"></i> Add
      </p>
      <div v-for="(phase, index) in phases" :key="index">
        <div class="row">
          <div class="col-sm-12">
            <div class="mb-3">
              <label :for="'phase' + index" class="form-label">Phase {{ index + 1 }}</label>
              <textarea class="form-control" :id="'phase' + index" rows="3" v-model="phase.phase" placeholder="enter phase"></textarea>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6">
          <label :for="'startDate' + index" class="form-label">Start Date</label>
            <div class="mb-3">
              <input type="date" class="form-control" :id="'startDate' + index" v-model="phase.start_date" />
            </div>
          </div>
          <div class="col-sm-6">
          <label :for="'endDate' + index" class="form-label">End Date</label>
            <div class="mb-3">
              <input type="date" class="form-control" :id="'endDate' + index" v-model="phase.end_date" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phases: [{ phase: "", start_date: "", end_date: "" }],
    };
  },
  methods: {
    addPhase() {
      this.phases.push({ phase: "", start_date: "", end_date: "" });
    },
    getPhases() {
      // Emit event to parent with phases data
      this.$emit('update-phases', this.phases);
    },
  },
};
</script>

<style scoped>
/* Tambahkan gaya sesuai kebutuhan Anda */
</style>
