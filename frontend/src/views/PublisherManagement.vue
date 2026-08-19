<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3 class="text-orange">
        <i class="fas fa-building"></i>
        Quản lý Nhà xuất bản</h3>
      <button class="btn btn-success" @click="openAddModal">
        <i class="fas fa-plus"></i> Thêm NXB mới
      </button>
    </div>

    <div class="card shadow-sm col-md-10 p-0" style="border-radius: 15px; overflow: hidden;">
      <table class="table table-hover mb-0">
        <thead class="bg-orange text-white">
          <tr>
            <th>Mã NXB</th>
            <th>Tên nhà xuất bản</th>
            <th>Địa chỉ</th>
            <th class="text-center">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pub in publishers" :key="pub._id">
            <td>{{ pub.MaNXB }}</td>
            <td>{{ pub.TenNXB }}</td>
            <td>{{ pub.DiaChi }}</td>
            <td class="text-center">
              <button class="btn btn-sm btn-warning mr-2" @click="openEditModal(pub)">
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn btn-sm btn-danger" @click="confirmDelete(pub._id)">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content-custom shadow-lg">
        <div class="modal-header-custom bg-orange text-white p-3 d-flex justify-content-between">
          <h5 class="m-0">{{ isEdit ? 'CHỈNH SỬA NHÀ XUẤT BẢN' : 'THÊM NHÀ XUẤT BẢN MỚI' }}</h5>
          <span class="close-btn" @click="showModal = false">&times;</span>
        </div>
        <div class="modal-body p-4">
          <form @submit.prevent="savePublisher">
            <div class="form-group">
              <label>Mã NXB</label>
              <input type="text" class="form-control" v-model="currentPublisher.MaNXB" required>
            </div>
            <div class="form-group">
              <label>Tên nhà xuất bản</label>
              <input type="text" class="form-control" v-model="currentPublisher.TenNXB" required>
            </div>
            <div class="form-group">
              <label>Địa chỉ</label>
              <input type="text" class="form-control" v-model="currentPublisher.DiaChi">
            </div>
            <div class="form-group">
              <label>Ghi chú</label>
              <input type="text" class="form-control" v-model="currentPublisher.GhiChu">
            </div>
            <div class="text-right mt-4">
              <button type="button" class="btn btn-secondary mr-2" @click="showModal = false">Hủy</button>
              <button type="submit" class="btn btn-orange text-white">Lưu thông tin</button>
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
      publishers: [
        { _id: "1", MaNXB: "NXB01", TenNXB: "Kim Đồng", DiaChi: "Hà Nội", GhiChu: "Nhà xuất bản nổi tiếng" },
        { _id: "2", MaNXB: "NXB02", TenNXB: "Trẻ", DiaChi: "TP.HCM", GhiChu: "Nhà xuất bản trẻ em" }
      ],
      showModal: false,
      isEdit: false,
      currentPublisher: { MaNXB: "", TenNXB: "", DiaChi: "", GhiChu: "" },
    };
  },
  methods: {
    openAddModal() {
      this.isEdit = false;
      this.currentPublisher = { MaNXB: "", TenNXB: "", DiaChi: "", GhiChu: "" };
      this.showModal = true;
    },
    openEditModal(pub) {
      this.isEdit = true;
      this.currentPublisher = { ...pub };
      this.showModal = true;
    },
    savePublisher() {
      alert("Đã lưu thông tin nhà xuất bản thành công!");
      this.showModal = false;
    },
    confirmDelete(id) {
      if (confirm("Bà có chắc muốn xóa NXB này không?")) {
        alert("Đã xóa NXB có ID: " + id);
      }
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content-custom {
  background: white;
  width: 500px;
  border-radius: 8px;
  overflow: hidden;
}
.bg-orange { background-color: #ff7f50; }
.btn-orange { background-color: #ff7f50; color: white; }
.close-btn { cursor: pointer; font-size: 24px; }
</style>