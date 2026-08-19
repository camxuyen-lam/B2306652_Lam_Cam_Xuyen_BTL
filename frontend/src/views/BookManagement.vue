<template>
  <div class="book-mgmt">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3 class="font-weight-bold text-orange">
        <i class="fas fa-book"></i>
         Quản lý sách</h3>
      <button class="btn btn-success" @click="openAddModal">
        <i class="fas fa-plus"></i> Thêm sách mới
      </button>
    </div>

    <div class="card shadow-sm border-0" style="border-radius: 15px; overflow: hidden;">
      <div class="card-body p-0">
        <table class="table table-hover mb-0">
          <thead class="bg-orange text-white border">
            <tr>
              <th>Mã sách</th>
              <th>Tên sách</th>
              <th>Thể loại</th>
              <th>Số lượng</th>
              <th class="text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="book in books" :key="book._id">
              <td>{{ book.MaSach }}</td>
              <td>{{ book.TenSach }}</td>
              <td><span class="badge badge-info">{{ book.TheLoai }}</span></td>
              <td>{{ book.SoQuyen }} cuốn</td>
              <td class="text-center">
                <button class="btn btn-sm btn-warning mr-2" @click="openEditModal(book)"><i class="fas fa-edit"></i></button>
                <button class="btn btn-sm btn-danger" @click="confirmDelete(book._id)"><i class="fas fa-trash"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content-custom shadow-lg">
        <div class="modal-header-custom bg-orange text-white p-3 d-flex justify-content-between">
          <h5 class="m-0">{{ isEdit ? 'CHỈNH SỬA SÁCH' : 'THÊM SÁCH MỚI' }}</h5>
          <span class="close-btn" @click="showModal = false">&times;</span>
        </div>
        <div class="modal-body p-4">
          <form @submit.prevent="saveBook">
            <div class="form-group"><label>Mã sách</label><input type="text" class="form-control" v-model="currentBook.MaSach" required></div>
            <div class="form-group"><label>Tên sách</label><input type="text" class="form-control" v-model="currentBook.TenSach" required></div>
            <div class="form-group">
              <label>Thể loại</label>
              <select class="form-control" v-model="currentBook.TheLoai">
                <option value="Tiểu thuyết">Tiểu thuyết</option>
                <option value="Kỹ năng">Kỹ năng</option>
                <option value="Trinh thám">Trinh thám</option>
                <option value="Công nghệ">Công nghệ</option>
              </select>
            </div>
            <div class="form-group"><label>Số quyển</label><input type="number" class="form-control" v-model="currentBook.SoQuyen"></div>
            <div class="form-group"><label>Link hình ảnh</label><input type="text" class="form-control" v-model="currentBook.HinhAnh"></div>
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
import BookService from "@/services/book.service";
export default {
  data() {
    return {
      books: [], showModal: false, isEdit: false,
      currentBook: { MaSach: "", TenSach: "", TheLoai: "Tiểu thuyết", SoQuyen: 1, HinhAnh: "" }
    };
  },
  methods: {
    async refreshList() { this.books = await BookService.getAll(); },
    openAddModal() { this.isEdit = false; this.currentBook = { MaSach: "", TenSach: "", TheLoai: "Tiểu thuyết", SoQuyen: 1 }; this.showModal = true; },
    openEditModal(book) { this.isEdit = true; this.currentBook = { ...book }; this.showModal = true; },
    async saveBook() {
      try {
        if (this.isEdit) { await BookService.update(this.currentBook._id, this.currentBook); }
        else { await BookService.create(this.currentBook); }
        this.showModal = false; this.refreshList();
      } catch (e) { alert("Lỗi lưu sách"); }
    },
    async confirmDelete(id) { if (confirm("Bạn có chắc chắn muốn xóa cuốn sách này không?")) { await BookService.delete(id); this.refreshList(); } }
  },
  mounted() { this.refreshList(); }
};
</script>

<style scoped>
.modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 1000; }
.modal-content-custom { background: white; width: 500px; border-radius: 15px; overflow: hidden; }
.bg-orange { background-color: #ff7f50; }
.btn-orange { background-color: #ff7f50; color: white; }
.close-btn { cursor: pointer; }
</style>