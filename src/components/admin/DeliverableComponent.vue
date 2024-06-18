<template>
  <div>
    <div class="row">
      <div class="col-sm-12">
        <p class="float-end text-primary" @click="addDeliverable" style="cursor: pointer">
          <i class="bi bi-plus"></i> Add
        </p>
        <div v-for="(deliverable, index) in deliverables" :key="index">
          <div class="row">
            <div class="col-sm-12">
              <div class="mb-3">
                <label :for="'deliverable' + index" class="form-label">Deliverable {{ index + 1 }}</label>
                <input type="text" class="form-control" :id="'deliverable' + index" placeholder="write here" v-model="deliverable.deliverable" />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12">
              <div class="mb-3">
                <label :for="'file' + index" class="form-label">Files</label>
                <input type="file" class="form-control" :id="'file' + index" @change="handleFileChange($event, index)" />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12">
              <div class="mb-3">
                <label :for="'notes' + index" class="form-label">Notes</label>
                <textarea class="form-control" :id="'notes' + index" rows="3" v-model="deliverable.notes"></textarea>
              </div>
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
      deliverables: [{ deliverable: '', file: null, notes: '' }],
    };
  },
  methods: {
    addDeliverable() {
      this.deliverables.push({ deliverable: '', file: null, notes: '' });
    },
    handleFileChange(event, index) {
      const file = event.target.files[0];
      if (file) {
        this.deliverables[index].file = file;
        console.log('file ditangkap');
      }
        console.log('file test: ', this.deliverables);
    },
    getDeliverables() {
      this.$emit('update-deliverables', this.deliverables);
    }
  }
};
</script>

<style scoped>
/* Tambahkan gaya sesuai kebutuhan Anda */
</style>
