<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card border-0 shadow-lg p-4 custom-profile-card">
          <div class="text-center mb-4">
            <div class="position-relative d-inline-block">
              <img :src="'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtLFTAqUP5Kc96lJAB7SGDaCKf1wT4q52aqL6ZLh85Rw&s=' + user.MaDocGia" 
                   class="rounded-circle shadow-sm border" style="width: 120px; height: 120px; object-fit: cover;">
            </div>
            <h4 class="mt-3 font-weight-bold text-orange">HỒ SƠ CỦA TÔI</h4>
          </div>

          <div class="profile-info px-3">
            <div class="mb-3 border-bottom pb-2">
              <label class="small text-muted mb-0">Mã độc giả</label>
              <div class="font-weight-bold text-dark">{{ user.MaDocGia }}</div>
            </div>

            <div class="mb-3 border-bottom pb-2">
              <label class="small text-muted mb-0">Họ và Tên</label>
              <div v-if="!isEditing" class="font-weight-bold text-dark">{{ user.name }}</div>
              <input v-else type="text" class="form-control form-control-sm" v-model="user.name">
            </div>

            <div class="mb-3 border-bottom pb-2">
              <label class="small text-muted mb-0">Số điện thoại</label>
              <div v-if="!isEditing" class="font-weight-bold text-dark">{{ user.DienThoai }}</div>
              <input v-else type="text" class="form-control form-control-sm" v-model="user.DienThoai">
            </div>

            <div class="mb-3 border-bottom pb-2">
              <label class="small text-muted mb-0">Địa chỉ</label>
              <div v-if="!isEditing" class="font-weight-bold text-dark">{{ user.DiaChi || 'Chưa cập nhật' }}</div>
              <input v-else type="text" class="form-control form-control-sm" v-model="user.DiaChi">
            </div>

            <div class="mt-5">
              <button v-if="!isEditing" class="btn btn-orange-xuyen btn-block text-white font-weight-bold py-2 shadow-sm" @click="isEditing = true">
                <i class="fas fa-edit mr-2"></i> CHỈNH SỬA THÔNG TIN
              </button>

              <div v-else class="row">
                <div class="col-6">
                  <button class="btn btn-secondary btn-block font-weight-bold py-2" @click="isEditing = false">HỦY</button>
                </div>
                <div class="col-6">
                  <button class="btn btn-success btn-block font-weight-bold py-2" @click="updateProfile">LƯU LẠI</button>
                </div>
              </div>
            </div>
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
      user: JSON.parse(localStorage.getItem("user") || "{}"),
      isEditing: false 
    }
  },
  methods: {
    async updateProfile() {
      try {
        const userId = this.user._id; 
        
        const nameParts = this.user.name.trim().split(" ");
        const readerData = {
            ...this.user,
            Ten: nameParts.pop(),
            HoLot: nameParts.join(" ")
        };

        await ReaderService.update(userId, readerData);
        
        localStorage.setItem("user", JSON.stringify(this.user));
        
        window.dispatchEvent(new CustomEvent('user-updated'));
        
        alert("Đã lưu xong rồi nhe bạn! ✨");
        this.isEditing = false; 
      } catch (e) {
          console.error(e);
          alert("Lỗi Backend rồi bạn ơi! Kiểm tra xem bạn có dán đúng ID chưa nhe.");
      }
    }
  }
}
</script>

<style scoped>
.custom-profile-card { border-radius: 30px; }
.btn-orange-xuyen { background-color: #ff7f50; border: none; border-radius: 15px; transition: 0.3s; }
.btn-orange-xuyen:hover { background-color: #e66e45; transform: translateY(-2px); }
.form-control { border-radius: 10px; border: 1px solid #ff7f50; }
</style>