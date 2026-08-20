<template>
  <div class="borrow-mgmt">
    <h3 class="mb-4 text-orange">
      <i class="fas fa-exchange-alt"></i>
       Duyệt đơn mượn & Trả sách</h3>
    
    <div class="card shadow-sm border-0" style="border-radius: 15px;">
      <div class="card-body p-0">
        <table class="table table-striped mb-0">
          <thead class="bg-orange text-white">
            <tr>
              <th>Độc giả</th>
              <th>Tên sách</th>
              <th>Ngày yêu cầu</th>
              <th>Trạng thái</th>
              <th class="text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in borrowList" :key="item._id">
              <td><strong>{{ item.MaDocGia }}</strong></td>
              <td>{{ item.TenSach }}</td>
              <td>{{ new Date(item.NgayMuon).toLocaleDateString('vi-VN') }}</td>
              <td>
                <span :class="getStatusClass(item.TrangThai)">{{ getStatusText(item.TrangThai) }}</span>
              </td>
              <td class="text-center">
                <div v-if="item.TrangThai === 'ChoDuyet'">
                  <button class="btn btn-success btn-sm px-3 mr-2" @click="handleApprove(item._id)">Duyệt</button>
                  <button class="btn btn-outline-danger btn-sm px-3" @click="handleReject(item._id)">Từ chối</button>
                </div>

                <div v-else-if="item.TrangThai === 'DangMuon' || item.TrangThai === 'TreHen'">
                  <button class="btn btn-primary btn-sm px-3 mr-2" @click="handleReturn(item._id)">Xác nhận trả</button>
                  <button class="btn btn-danger btn-sm px-3" @click="handleLost(item._id)">Báo mất</button>
                </div>

                 <div v-else-if="item.TrangThai === 'ChoXacNhanTien'">
                  <button class="btn btn-warning btn-sm px-3 text-white font-weight-bold" @click="handleConfirmFine(item._id)">
                    Xác nhận đã nhận tiền
                  </button>
                </div>

                <div v-if="item.GopY" class="mt-2">
                  <button class="btn btn-info btn-sm px-3" @click="viewFeedback(item)">
                    <i class="fas fa-comment-dots"></i> Xem góp ý
                  </button>
                </div>

                <span v-if="item.TrangThai === 'DaTra' || item.TrangThai === 'DaDongPhat'" class="text-success small">Hoàn tất</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="showFeedbackModal" class="modal-overlay">
      <div class="modal-content-custom shadow-lg p-4 text-center">
        <h5 class="font-weight-bold text-orange mb-3">NỘI DUNG GÓP Ý</h5>
        <div class="text-left bg-light p-3 rounded mb-3">
          <p><strong>Lời nhắn:</strong> {{ currentFeedback.GopY }}</p>
        </div>
        
        <div v-if="currentFeedback.HinhAnhMinhChung">
          <p class="small font-weight-bold text-danger">Hình ảnh minh chứng sách hỏng:</p>
          <img :src="currentFeedback.HinhAnhMinhChung" class="img-fluid rounded shadow-sm border" style="max-height: 300px;">
        </div>

        <div class="mt-4">
          <button class="btn btn-secondary btn-block" @click="showFeedbackModal = false">Đóng</button>
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
      borrowList: [],
      showFeedbackModal: false,
      currentFeedback: {}
    }
  },
  methods: {
    async refreshList() {
      try {
        this.borrowList = await BorrowService.getAll();
      } catch (e) { console.log(e); }
    },
    async handleConfirmFine(id) {
      if(confirm("Bạn xác nhận đã nhận được tiền chuyển khoản rồi nhe?")) {
        await BorrowService.adminConfirmFine(id); 
        alert("Đã xác nhận xong! Độc giả này đã sạch nợ. 😂");
        this.refreshList();
      }
    },
    viewFeedback(item) {
      this.currentFeedback = item;
      this.showFeedbackModal = true;
    },
    async handleApprove(id) {
      await BorrowService.approveBorrow(id);
      this.refreshList();
    },
    async handleReturn(id) {
      await BorrowService.returnBook(id);
      this.refreshList();
    },
    async handleLost(id) {
      await BorrowService.reportLost(id);
      this.refreshList();
    },
    getStatusClass(status) {
      if (status === 'ChoDuyet') return 'badge badge-warning p-2 text-white';
      if (status === 'DangMuon') return 'badge badge-primary p-2';
      if (status === 'ChoXacNhanTien') return 'badge badge-info p-2 text-white';
      if (status === 'DaTra' || status === 'DaDongPhat') return 'badge badge-success p-2';
      return 'badge badge-danger p-2';
    },
    getStatusText(status) {
      const texts = {
        'ChoDuyet': '⌛ Chờ duyệt', 'DangMuon': '📖 Đang mượn', 'DaTra': '✅ Đã trả',
        'TreHen': '🔴 Trễ hẹn', 'MatSach': '❌ Mất sách', 'ChoXacNhanTien': '💰 Chờ tiền',
        'DaDongPhat': '🎉 Hoàn tất', 'TuChoi': '🚫 Đã từ chối'
      };
      return texts[status] || status;
    }
  },
  mounted() { this.refreshList(); }
}
</script>

<style scoped>
.modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 2000; }
.modal-content-custom { background: white; width: 500px; border-radius: 20px; }
.text-orange { color: #ff7f50; }
</style>