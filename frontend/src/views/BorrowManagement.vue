<template>
  <div class="borrow-mgmt">
    <h3 class="mb-4">
      <i class="fas fa-exchange-alt"></i>
       Duyệt đơn mượn & Trả sách</h3>
    
    <div class="card shadow-sm border-0" style="border-radius: 15px;">
      <div class="card-body p-0">
        <table class="table table-striped mb-0">
          <thead class="bg-orange text-white border">
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
              <td><strong>{{ item.MaDocGia || 'Ẩn danh' }}</strong></td>
              <td>{{ item.TenSach }}</td>
              <td>{{ new Date(item.NgayMuon).toLocaleDateString('vi-VN') }}</td>
              <td>
                <span :class="getStatusClass(item.TrangThai)">{{ getStatusText(item.TrangThai) }}</span>
              </td>
              <td class="text-center">
                <div v-if="item.TrangThai === 'ChoDuyet'">
                  <button class="btn btn-success btn-sm px-3 mr-2" @click="handleApprove(item._id)">
                    Duyệt
                  </button>
                  <button class="btn btn-outline-danger btn-sm px-3" @click="handleReject(item._id)">
                    Từ chối
                  </button>
                </div>

                <div v-else-if="item.TrangThai === 'DangMuon' || item.TrangThai === 'TreHen'">
                  <button class="btn btn-primary btn-sm px-3 mr-2" @click="handleReturn(item._id)">
                    Xác nhận trả
                  </button>
                  <button class="btn btn-danger btn-sm px-3" @click="handleLost(item._id)">
                    Báo mất
                  </button>
                </div>

                <span v-else class="text-muted small italic">Đã xử lý xong</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import BorrowService from "@/services/borrow.service";

export default {
  data() { return { borrowList: [] } },
  methods: {
    async refreshList() {
      try {
        this.borrowList = await BorrowService.getAll();
      } catch (e) { console.log("Lỗi tải danh sách:", e); }
    },
    async handleApprove(id) {
      if(confirm("Bạn duyệt cho mượn nhe?")) {
        try {
          await BorrowService.approveBorrow(id);
          alert("Đã duyệt thành công! 📖");
          this.refreshList();
        } catch (e) { alert("Lỗi khi duyệt!"); }
      }
    },
    async handleReject(id) {
      if(confirm("Bạn từ chối đơn này hả? Sách sẽ được cộng lại vào kho nhe.")) {
        try {
          await BorrowService.rejectBorrow(id);
          alert("Đã từ chối và hoàn trả sách! ❌");
          this.refreshList();
        } catch (e) { alert("Lỗi khi từ chối!"); }
      }
    },
    async handleReturn(id) {
      if(confirm("Xác nhận đã nhận lại sách?")) {
        try {
          await BorrowService.returnBook(id);
          alert("Sách đã về kho an toàn! ✅");
          this.refreshList();
        } catch (e) { alert("Lỗi khi trả sách!"); }
      }
    },
    async handleLost(id) {
      if(confirm("Bạn xác nhận sinh viên này làm mất sách? Phạt 200k nhe!")) {
        try {
          await BorrowService.reportLost(id);
          alert("Đã ghi nhận mất sách! 🚫");
          this.refreshList();
        } catch (e) { alert("Lỗi khi báo mất!"); }
      }
    },
    getStatusClass(status) {
      if (status === 'ChoDuyet') return 'badge badge-warning p-2 text-white';
      if (status === 'DangMuon') return 'badge badge-primary p-2';
      if (status === 'DaTra') return 'badge badge-success p-2';
      if (status === 'TreHen') return 'badge badge-danger p-2';
      return 'badge badge-secondary p-2';
    },
    getStatusText(status) {
      const texts = {
        'ChoDuyet': '⌛ Chờ duyệt',
        'DangMuon': '📖 Đang mượn',
        'DaTra': '✅ Đã trả',
        'TreHen': '🔴 Trễ hẹn',
        'MatSach': '❌ Mất sách',
        'TuChoi': '🚫 Đã từ chối'
      };
      return texts[status] || status;
    }
  },
  mounted() { this.refreshList(); }
}
</script>