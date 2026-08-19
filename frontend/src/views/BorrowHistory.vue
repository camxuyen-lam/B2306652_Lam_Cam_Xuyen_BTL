<template>
  <div class="container py-5">
    <h3 class="mb-4 font-weight-bold text-center">
      <i class="fas fa-history text-orange mr-2"></i> LỊCH SỬ MƯỢN TRẢ SÁCH
    </h3>
    
    <div class="card border-0 shadow-sm overflow-hidden" style="border-radius: 20px;">
      <div v-if="myBorrows.length > 0" class="table-responsive">
        <table class="table table-hover mb-0">
          <thead class="bg-orange text-white">
            <tr>
              <th>Tên sách</th>
              <th>Ngày mượn</th>
              <th class="text-center">Trạng thái</th>
              <th class="text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in myBorrows" :key="item._id">
              <td class="align-middle">
                <img :src="item.HinhAnh" class="mr-2 rounded" style="width: 30px; height: 40px; object-fit: cover;">
                <strong>{{ item.TenSach }}</strong>
              </td>
              <td class="align-middle">{{ new Date(item.NgayMuon).toLocaleDateString('vi-VN') }}</td>
              <td class="align-middle text-center">
                <span :class="getStatusBadge(item.TrangThai)">{{ getStatusText(item.TrangThai) }}</span>
              </td>
              <td class="align-middle text-center">
                <button v-if="item.TrangThai === 'DangMuon'" class="btn btn-sm btn-outline-danger mr-2" @click="handleReportLost(item._id)">Báo mất</button>
                <button v-if="item.TrangThai === 'MatSach'" class="btn btn-sm btn-warning mr-2" @click="handlePaid(item._id)">Nộp phạt</button>
                <button v-if="!item.GopY && (item.TrangThai === 'DaTra' || item.TrangThai === 'DangMuon')" class="btn btn-sm btn-outline-info" @click="openFeedbackModal(item)">Góp ý</button>
                <span v-else-if="item.GopY" class="text-muted small">Đã góp ý <i class="fas fa-check"></i></span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="text-center py-5">
        <p class="text-muted">Bạn chưa mượn cuốn nào hết trơn! 😂</p>
        <router-link to="/user/home" class="btn btn-orange text-white px-4">Mượn ngay</router-link>
      </div>
    </div>

    <div v-if="showFeedbackModal" class="modal-overlay">
      <div class="modal-content-custom shadow-lg p-4">
        <h5 class="font-weight-bold mb-3 text-orange text-center">GÓP Ý ĐƠN HÀNG</h5>
        <div class="form-group">
          <label class="small font-weight-bold">Nội dung góp ý</label>
          <textarea class="form-control" v-model="feedbackData.noiDung" rows="3"></textarea>
        </div>
        <div class="custom-control custom-checkbox mb-3">
          <input type="checkbox" class="custom-control-input" v-model="feedbackData.isDamaged" id="checkDamaged">
          <label class="custom-control-label small text-danger" for="checkDamaged">Sách bị rách / hỏng / bẩn</label>
        </div>
        <div class="form-group" v-if="feedbackData.isDamaged">
          <input type="text" class="form-control" v-model="feedbackData.hinhAnh" placeholder="Dán link hình minh chứng...">
        </div>
        <div class="text-right mt-4">
          <button class="btn btn-light btn-sm mr-2" @click="showFeedbackModal = false">Hủy</button>
          <button class="btn btn-orange btn-sm text-white px-4" @click="submitFeedback">Gửi ngay</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BorrowService from "@/services/borrow.service";
export default {
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user") || "{}"),
      myBorrows: [],
      showFeedbackModal: false,
      selectedOrder: {},
      feedbackData: { noiDung: "", isDamaged: false, hinhAnh: "" }
    }
  },
  methods: {
    async loadHistory() {
      const all = await BorrowService.getAll();
      this.myBorrows = all.filter(b => b.MaDocGia === this.user.MaDocGia);
    },
    async handleReportLost(id) {
        if (confirm("Báo mất cuốn này nhe bạn?")) {
            await BorrowService.reportLostUser(id);
            this.loadHistory();
        }
    },
    async handlePaid(id) {
        if (confirm("Xác nhận đã nộp phạt?")) {
            await BorrowService.userConfirmPayment(id);
            this.loadHistory();
        }
    },
    openFeedbackModal(order) { this.selectedOrder = order; this.showFeedbackModal = true; },
    async submitFeedback() {
        await BorrowService.sendFeedback(this.selectedOrder._id, this.feedbackData);
        alert("Cảm ơn bạn!");
        this.showFeedbackModal = false;
        this.loadHistory();
    },
    getStatusBadge(s) {
      if (s === 'ChoDuyet') return 'badge badge-warning p-2 text-white';
      if (s === 'DangMuon') return 'badge badge-primary p-2';
      return 'badge badge-success p-2';
    },
    getStatusText(s) {
      const texts = { 'ChoDuyet': '⌛ Chờ duyệt', 'DangMuon': '📖 Đang mượn', 'DaTra': '✅ Đã trả', 'MatSach': '❌ Mất sách', 'ChoXacNhanTien': '💰 Đợi check tiền', 'DaDongPhat': '🎉 Hoàn tất' };
      return texts[s] || s;
    }
  },
  mounted() { this.loadHistory(); }
}
</script>

<style scoped>
.modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 2000; }
.modal-content-custom { background: white; width: 450px; border-radius: 20px; }
.btn-orange { background-color: #ff7f50; border: none; }
</style>
