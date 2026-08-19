<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3 class="font-weight-bold text-orange">
        <i class="fas fa-tags"></i> Quản lý thể loại sách
      </h3>
      <button class="btn btn-success" @click="openAddModal">
        <i class="fas fa-plus"></i> Thêm thể loại
      </button>
    </div>

    <div class="card shadow-sm col-md-8 p-0" style="border-radius: 15px; overflow: hidden;">
      <table class="table table-hover mb-0">
        <thead class="bg-orange text-white">
          <tr>
            <th>Mã loại</th>
            <th>Tên thể loại</th>
            <th class="text-center">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cat in categories" :key="cat._id">
            <td>{{ cat.MaTheLoai }}</td>
            <td>{{ cat.TenTheLoai }}</td>
            <td class="text-center">
              <button class="btn btn-sm btn-warning mr-2" @click="openEditModal(cat)">
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn btn-sm btn-danger" @click="handleDelete(cat._id)">
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
          <h5 class="
          m-0">{{ isEdit ? 'CHỈNH SỬA THỂ LOẠI' : 'THÊM THỂ LOẠI MỚI' }}</h5>
          <span class="close-btn" @click="showModal = false">&times;</span>
        </div>
        <div class="modal-body p-4">
          <form @submit.prevent="saveCategory">
            <div class="form-group">
              <label>Mã thể loại</label>
              <input type="text" class="form-control" v-model="currentCategory.MaTheLoai" :disabled="isEdit" required>
            </div>
            <div class="form-group">
              <label>Tên thể loại</label>
              <input type="text" class="form-control" v-model="currentCategory.TenTheLoai" required>
            </div>
            <div class="text-right mt-4">
              <button type="button" class="btn btn-secondary mr-2" @click="showModal = false">Hủy</button>
              <button type="submit" class="btn btn-orange text-white">Lưu lại</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryService from "@/services/category.service";
export default {
  data() {
    return {
      categories: [],
      showModal: false,
      isEdit: false,
      currentCategory: { MaTheLoai: "", TenTheLoai: "" }
    };
  },
  methods: {
    async refreshList() {
      this.categories = await CategoryService.getAll();
    },
    openAddModal() {
      this.isEdit = false;
      this.currentCategory = { MaTheLoai: "", TenTheLoai: "" };
      this.showModal = true;
    },
    openEditModal(cat) {
      this.isEdit = true;
      this.currentCategory = { ...cat }; 
      this.showModal = true;
    },
    async saveCategory() {
      try {
        if (this.isEdit) {
          await CategoryService.update(this.currentCategory._id, this.currentCategory);
          alert("Đã cập nhật thể loại thành công!");
        } else {
          await CategoryService.create(this.currentCategory);
          alert("Đã thêm thể loại thành công!");
        }
        this.showModal = false;
        this.refreshList();
      } catch (e) { alert("Lỗi khi lưu dữ liệu!"); }
    },
    async handleDelete(id) {
      if(confirm("Bạn có chắc chắn muốn xóa thể loại này không?")) {
        await CategoryService.delete(id);
        this.refreshList();
      }
    }
  },
  mounted() { this.refreshList(); }
};
</script>

<style scoped>
.modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 1000; }
.modal-content-custom { background: white; width: 400px; border-radius: 15px; overflow: hidden; }
.bg-orange { background-color: #ff7f50; }
.btn-orange { background-color: #ff7f50; color: white; border: none; }
.close-btn { cursor: pointer; }
</style>