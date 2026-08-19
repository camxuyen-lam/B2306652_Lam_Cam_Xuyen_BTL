<template>
  <div class="reader-management"> 
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3>
        <i class="fas fa-users"></i>
         Quản lý độc giả</h3>
      <button class="btn btn-success" @click="openAddModal"><i class="fas fa-user-plus"></i> Thêm độc giả</button>
    </div>

    <div class="card shadow-sm" style="border-radius: 15px; overflow: hidden;">
      <table class="table table-hover mb-0">
        <thead class="bg-orange text-white border">
          <tr>
            <th>Mã ĐG</th>
            <th>Họ tên</th>
            <th>Phái</th>
            <th>Điện thoại</th>
            <th class="text-center">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="reader in readers" :key="reader._id">
            <td>{{ reader.MaDocGia }}</td>
            <td>{{ reader.HoLot }} {{ reader.Ten }}</td>
            <td>{{ reader.Phai }}</td>
            <td>{{ reader.DienThoai }}</td>
            <td class="text-center">
              <button class="btn btn-sm btn-warning mr-2" @click="openEditModal(reader)"><i class="fas fa-edit"></i></button>
              <button class="btn btn-sm btn-danger" @click="confirmDelete(reader._id)"><i class="fas fa-trash"></i></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content-custom shadow-lg">
        <div class="modal-header-custom bg-orange text-white p-3 d-flex justify-content-between">
          <h5 class="m-0">{{ isEdit ? 'SỬA ĐỘC GIẢ' : 'THÊM ĐỘC GIẢ MỚI' }}</h5>
          <span class="close-btn" @click="showModal = false">&times;</span>
        </div>
        <div class="modal-body p-4">
          <div class="form-group"><label>Mã Độc giả</label><input v-model="currentReader.MaDocGia" class="form-control"></div>
          <div class="form-group"><label>Tên</label><input v-model="currentReader.Ten" class="form-control"></div>
          <div class="form-group"><label>Địa chỉ</label><input v-model="currentReader.DiaChi" class="form-control"></div>
          <div class="text-right mt-3">
            <button class="btn btn-secondary mr-2" @click="showModal = false">Hủy</button>
            <button class="btn btn-orange text-white" @click="saveReader">Lưu lại</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ReaderService from "@/services/reader.service";
export default {
  data() {
    return {
      readers: [],
      showModal: false,
      isEdit: false,
      currentReader: { MaDocGia: "", Ten: "", DiaChi: "" }
    }
  },
  methods: {
    async refreshList() {
      try { this.readers = await ReaderService.getAll(); } catch (e) { console.log(e); }
    },
    async saveReader() {
      try {
        if (this.isEdit) { await ReaderService.update(this.currentReader._id, this.currentReader); }
        else { await ReaderService.create(this.currentReader); }
        this.showModal = false;
        this.refreshList();
      } catch (e) { alert("Lỗi lưu dữ liệu"); }
    },
    openAddModal() { this.isEdit = false; this.currentReader = { MaDocGia: "", Ten: "", DiaChi: "" }; this.showModal = true; },
    openEditModal(reader) { this.isEdit = true; this.currentReader = {...reader}; this.showModal = true; },
    async confirmDelete(id) { if (confirm("Xóa không bạn?")) { await ReaderService.delete(id); this.refreshList(); } }
  },
  mounted() { this.refreshList(); }
}
</script>

<style scoped>
.modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 1000; }
.modal-content-custom { background: white; width: 500px; border-radius: 8px; }
.bg-orange { background-color: #ff7f50; }
.btn-orange { background-color: #ff7f50; color: white; }
.close-btn { cursor: pointer; }
</style>

