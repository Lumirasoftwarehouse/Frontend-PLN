<template>
  <div
    class="modal fade"
    id="modalDetailMonitoring"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modalDetailMonitoringLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title" id="modalDetailMonitoringLabel">
            Detail Progress
          </h5>
          <button
            type="button"
            class="close text-white"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-body">
          <div class="container-fluid">
            <div v-if="dataDetailMonitoring && dataDetailMonitoring.length">
              <div
                v-for="phase in dataDetailMonitoring"
                :key="phase.id_phase"
                class="mb-4"
              >
                <h5>{{ phase.phase_name }} ({{ phase.start_date }} - {{ phase.end_date }})</h5>
                
                <div v-if="phase.laporans.length">
                  <table class="table table-bordered table-sm">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Tanggal</th>
                        <th>Nama</th>
                        <th>Jabatan</th>
                        <th>Laporan</th>
                        <th>Lampiran</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(laporan, index) in phase.laporans" :key="laporan.id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ laporan.tanggal }}</td>
                        <td>{{ laporan.user.name }}</td>
                        <td>{{ laporan.user.level == '1' ? 'Manager' : 'Staff' }}</td>
                        <td>{{ laporan.laporan }}</td>
                        <td>
                          <a
                            :href="`http://127.0.0.1:8000/storage/lampiran-laporan-phase/${laporan.lampiran}`"
                            target="_blank"
                            v-if="laporan.lampiran"
                          >
                            Download
                          </a>
                          <span v-else>-</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div v-else>
                  <p class="text-muted">Belum ada laporan untuk fase ini.</p>
                </div>
              </div>
            </div>
            <div v-else>
              <p class="text-danger">Tidak ada data untuk ditampilkan.</p>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Tutup
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["dataDetailMonitoring"],
};
</script>
