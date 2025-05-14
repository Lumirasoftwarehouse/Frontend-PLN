<template>
    <!-- Modal Create Staff -->
<div class="modal fade" id="modalCreateStaff" tabindex="-1" role="dialog">
  <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Tambah Staff</h5>
        <button type="button" class="close" data-dismiss="modal">
          <span>&times;</span>
        </button>
      </div>

      <div class="modal-body">
        <form>
          <div class="mb-3">
            <label class="form-label">Nama Lengkap</label>
            <input
              type="text"
              class="form-control"
              v-model="newStaff.name"
              placeholder="Masukkan nama lengkap"
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Posisi</label>
            <input
              type="text"
              class="form-control"
              v-model="newStaff.position"
              placeholder="Masukkan posisi staff"
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              v-model="newStaff.email"
              placeholder="Masukkan email"
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              v-model="newStaff.password"
              placeholder="Masukkan password"
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Divisi</label>
            <select class="form-select" v-model="newStaff.id_divisi">
              <option disabled value="">Pilih Divisi</option>
              <option v-for="div in divisis" :key="div.id" :value="div.id">
                {{ div.nama_divisi }}
              </option>
            </select>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Batal</button>
            <button type="button" class="btn btn-primary" @click="createStaff">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
    data() {
  return {
    newStaff: {
      id_divisi: "",
      name: "",
      position: "",
      email: "",
      password: "",
    },
    divisis: [], // Asumsikan kamu sudah punya list divisi dari API
  };
},
methods: {
  async createStaff() {
    try {
      const formData = new FormData();
      formData.append("id_divisi", this.newStaff.id_divisi);
      formData.append("name", this.newStaff.name);
      formData.append("position", this.newStaff.position);
      formData.append("email", this.newStaff.email);
      formData.append("password", this.newStaff.password);

      const response = await axios.post("http://127.0.0.1:8000/api/user/create-in-divisi", formData, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      });

      Swal.fire("Berhasil", "Staff berhasil ditambahkan!", "success");

      // Bersihkan form
      this.newStaff = {
        id_divisi: "",
        name: "",
        position: "",
        email: "",
        password: "",
      };

      $("#modalCreateStaff").modal("hide");
      this.listDivisi?.(); // Optional: refresh divisi jika dibutuhkan
      this.listStaff?.();  // Optional: refresh list staff

    } catch (error) {
      console.error(error);
      Swal.fire("Gagal", "Gagal menambahkan staff.", "error");
    }
  }
}

}
</script>