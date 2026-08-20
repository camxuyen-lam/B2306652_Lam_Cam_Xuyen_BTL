<template>
  <div class="register-page">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card shadow-lg border-0 custom-card">
            <router-link to="/" class="back-home-icon"><i class="fas fa-home"></i></router-link>

            <div class="card-body p-5">
              <h3 class="text-center mb-4 font-weight-bold">ĐĂNG KÝ TÀI KHOẢN</h3>
              
              <form @submit.prevent="handleRegister">
                <div class="row">
                  <div class="col-md-6 form-group mb-3">
                    <label class="small font-weight-bold">Họ lót</label>
                    <input type="text" class="form-control custom-input" v-model="reader.HoLot" placeholder="Nguyễn Văn" required>
                  </div>
                  <div class="col-md-6 form-group mb-3">
                    <label class="small font-weight-bold">Tên</label>
                    <input type="text" class="form-control custom-input" v-model="reader.Ten" placeholder="An" required>
                  </div>
                </div>

                <div class="form-group mb-3">
                  <label class="small font-weight-bold">Địa chỉ Email</label>
                  <input type="email" class="form-control custom-input" v-model="reader.Email" placeholder="vidu@gmail.com" required>
                </div>

                <div class="form-group mb-3">
                  <label class="small font-weight-bold">Số điện thoại</label>
                  <input type="text" class="form-control custom-input" v-model="reader.DienThoai" placeholder="09xxx..." required>
                </div>

                <div class="form-group mb-3">
                  <label class="small font-weight-bold">Mật khẩu</label>
                  <input type="password" class="form-control custom-input" v-model="reader.Password" placeholder="Nhập mật khẩu" required>
                </div>

                <div class="row">
                  <div class="col-md-6 form-group mb-3">
                    <label class="small font-weight-bold">Ngày sinh</label>
                    <input type="date" class="form-control custom-input" v-model="reader.NgaySinh">
                  </div>
                  <div class="col-md-6 form-group mb-3">
                    <label class="small font-weight-bold">Phái</label>
                    <select class="form-control custom-input" v-model="reader.Phai">
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                      <option value="Khác">Khác</option>
                    </select>
                  </div>
                </div>

                <button type="submit" class="btn btn-orange btn-block py-2 mt-4 custom-btn shadow-sm">
                  Đăng ký ngay
                </button>
              </form>

              <div class="text-center mt-4">
                <p class="small mb-0">Đã có tài khoản? 
                  <router-link to="/login" class="text-primary font-weight-bold">Đăng nhập</router-link>
                </p>
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
      reader: {
        MaDocGia: "DG" + Math.floor(Math.random() * 10000),
        HoLot: "",
        Ten: "",
        Email: "", 
        DienThoai: "",
        Password: "",
        NgaySinh: "",
        Phai: "Nữ"
      }
    };
  },
  methods: {
    async handleRegister() {
      try {
        await ReaderService.create(this.reader);
        alert("Đăng ký thành công rồi nhe bạn! Giờ dùng Email này để đăng nhập nhe. 😉");
        this.$router.push("/login");
      } catch (error) {
        alert("Lỗi rồi bạn ơi!");
      }
    }
  }
};
</script>
<style>
.btn-orange {
  background-color: #ff8c5a !important; 
  color: white !important;
  border: none;
  font-weight: 600;
  border-radius: 8px; 
  transition: all 0.3s ease; 
}

.btn-orange:hover {
  background-color: #e67e50 !important; 
  transform: translateY(-2px); 
  box-shadow: 0 4px 12px rgba(255, 140, 90, 0.4) !important; 
  color: white !important;
}

.btn-orange:active {
  transform: translateY(0);
}

.custom-btn {
  width: 100%; 
  text-transform: uppercase; 
  letter-spacing: 1px;
}
</style>