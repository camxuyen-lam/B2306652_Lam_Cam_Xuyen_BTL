<template>
  <div class="violation-mgmt">
    <h3 class="mb-4">🚫 Danh sách vi phạm & Tiền phạt</h3>
    
    <div class="row mb-4">
      <div class="col-md-4">
        <div class="card bg-white shadow-sm p-3 border-left-danger" style="border-radius: 15px;">
          <small class="text-muted font-weight-bold text-uppercase">Tiền phạt chưa thu</small>
          <h3 class="text-danger font-weight-bold m-0">{{ totalPendingFines.toLocaleString() }}đ</h3>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card bg-white shadow-sm p-3 border-left-success" style="border-radius: 15px;">
          <small class="text-muted font-weight-bold text-uppercase">Tổng tiền đã thu</small>
          <h3 class="text-success font-weight-bold m-0">{{ totalCollectedFines.toLocaleString() }}đ</h3>
        </div>
      </div>
    </div>

    <div class="card shadow-sm border-0" style="border-radius: 15px; overflow: hidden;">
      <div class="card-body p-0">
        <table class="table table-hover mb-0">
          <thead class="bg-orange text-white">
            <tr>
              <th>Độc giả</th>
              <th>Tên sách</th>
              <th>Lỗi vi phạm</th>
              <th>Tiền phạt</th>
              <th>Trạng thái</th>
              <th class="text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in violationList" :key="item._id">
              <td><strong>{{ item.MaDocGia }}</strong></td>
              <td>{{ item.TenSach }}</td>
              <td>
                <span v-if="item.TrangThai === 'TreHen'" class="text-danger small">⚠️ Trễ hạn trả</span>
                <span v-else class="text-dark small font-weight-bold">❌ Làm mất sách</span>
              </td>
              <td class="font-weight-bold" :class="item.DaThuTien ? 'text-success' : 'text-danger'">
                {{ item.TienPhat.toLocaleString() }}đ
              </td>
              
              <td>
                <span v-if="!item.DaThuTien" class="badge badge-warning p-2">Chờ thu tiền</span>
                <span v-else class="badge badge-success p-2">Đã thanh toán</span>
              </td>

              <td class="text-center">
                <button v-if="!item.DaThuTien" class="btn btn-primary btn-sm px-3 shadow-sm" @click="handlePayment(item._id)">
                  Thu tiền ngay
                </button>
                <span v-else class="text-success small font-weight-bold"><i class="fas fa-check-circle"></i> Hoàn tất</span>
              </td>
            </tr>
          </tbody>
        </table>
        
        <div v-if="violationList.length === 0" class="text-center py-5">
          <p class="text-muted">Hiện tại chưa có dữ liệu vi phạm nhe bà! 😂</p>
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
      violationList: []
    }
  },
  computed: {
    totalPendingFines() {
      return this.violationList
        .filter(i => !i.DaThuTien)
        .reduce((sum, item) => sum + (item.TienPhat || 0), 0);
    },
    totalCollectedFines() {
      return this.violationList
        .filter(i => i.DaThuTien)
        .reduce((sum, item) => sum + (item.TienPhat || 0), 0);
    }
  },
  methods: {
    async refreshList() {
      try {
        const all = await BorrowService.getAll();
        this.violationList = all.filter(b => 
          b.TrangThai === 'TreHen' || b.TrangThai === 'MatSach' || b.TrangThai === 'DaDongPhat'
        );
      } catch (e) { console.log(e); }
    },
    async handlePayment(id) {
      if (confirm("Bà xác nhận đã thu tiền của độc giả này nhe?")) {
        try {
          await BorrowService.adminConfirmFine(id);
          alert("Xác nhận đã thu tiền thành công! 💰");
          this.refreshList();
        } catch (e) { alert("Lỗi xử lý!"); }
      }
    }
  },
  mounted() {
    this.refreshList();
  }
}
</script>

<style scoped>
.border-left-danger { border-left: 5px solid #dc3545 !important; }
.border-left-success { border-left: 5px solid #28a745 !important; } 
.badge-warning { background-color: #f1c40f; color: white; }
.badge-success { background-color: #28a745; color: white; }
</style>