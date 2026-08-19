<template>
  <div class="login-page">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-5">
          <div class="card shadow-lg border-0 position-relative custom-card">
            <router-link to="/" class="back-home-icon" title="Quay lại trang chủ">
              <i class="fas fa-home"></i>
            </router-link>

            <div class="card-body p-5">
              <h3 class="text-center mb-4 font-weight-bold">ĐĂNG NHẬP</h3>
              
              <form @submit.prevent="handleLogin">
                <div class="form-group mb-3">
                  <label class="small font-weight-bold">Email</label>
                  <input type="email" class="form-control custom-input" v-model="username" placeholder="Nhập email" required>
                </div>
                <div class="form-group mb-4">
                  <label class="small font-weight-bold">Mật khẩu</label>
                  <input type="password" class="form-control custom-input" v-model="password" placeholder="Nhập mật khẩu" required>
                </div>
                <button type="submit" class="btn btn-orange btn-block py-2 shadow-sm custom-btn text-white">
                  Đăng nhập
                </button>
              </form>

              <div class="text-center my-4 text-muted small">hoặc</div>

              <button class="btn btn-facebook btn-block text-white py-2 shadow-sm custom-btn" style="background-color: #3b5998;">
                <i class="fab fa-facebook-f mr-2"></i> Facebook
              </button>

              <div class="text-center mt-4">
                <p class="small mb-0">Chưa có tài khoản? 
                  <router-link to="/register" class="text-primary font-weight-bold">Đăng ký ngay</router-link>
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
      username: "",
      password: "",
    };
  },
  methods: {
    async handleLogin() {
      if (this.username === "admin@gmail.com" && this.password === "123") {
        const adminUser = {
          name: "Admin Xuyến",
          Email: "admin@gmail.com",
          role: "admin" 
        };
        localStorage.setItem("user", JSON.stringify(adminUser));
        alert("Chào sếp Xuyến! Đang vào trang Quản lý nhe. 😎");
        this.$router.push("/admin/dashboard");
        return;
      }

      try {
        const user = await ReaderService.login({ 
          email: this.username, 
          password: this.password 
        });

        if (user) {
          const userData = {
            MaDocGia: user.MaDocGia,
            name: user.HoLot + " " + user.Ten,
            Email: user.Email,
            DienThoai: user.DienThoai,
            DiaChi: user.DiaChi,
            role: "user" 
          };
          
          localStorage.setItem("user", JSON.stringify(userData));
          
          alert(`Chào bạn ${user.Ten}! Đăng nhập thành công nhe. 🎉`); 
          this.$router.push("/user/home"); 
        }
      } catch (error) {
        console.error("Lỗi đăng nhập:", error);
        alert("Sai tài khoản hoặc mật khẩu rồi bạn ơi! Kiểm tra lại nhe.");
      }
    }
  }
};
</script>

<style scoped>
.login-page { min-height: 100vh; display: flex; align-items: center; background-color: #f0f2f5; }
.custom-card { border-radius: 20px; }
.back-home-icon { position: absolute; top: 20px; left: 20px; color: #adb5bd; font-size: 1.2rem; z-index: 10; }
.back-home-icon:hover { color: #ff7f50; transform: scale(1.2); }
.custom-input { border-radius: 10px; padding: 12px 15px; border: 1px solid #ddd; }
.custom-btn { border-radius: 10px; font-weight: bold; }
.btn-orange { background-color: #ff7f50; border: none; }
.btn-orange:hover { background-color: #e66e45; }
</style>