<template>
  <div class="container py-5">
    <h3 class="font-weight-bold mb-4">
      <i class="fas fa-shopping-basket text-orange mr-2"></i> Giỏ hàng của tui
    </h3>

    <div v-if="cartItems.length > 0" class="card border-0 shadow-sm p-4 custom-card">
      <div class="table-responsive">
        <table class="table table-hover">
          <thead class="thead-light">
            <tr>
              <th>Hình ảnh</th>
              <th>Tên sách</th>
              <th>Tác giả</th>
              <th class="text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in cartItems" :key="index">
              <td style="width: 100px;">
                <img :src="item.HinhAnh" class="rounded shadow-sm" style="width: 60px; height: 80px; object-fit: cover;">
              </td>
              <td class="align-middle">
                <div class="font-weight-bold">{{ item.TenSach }}</div>
                <small class="text-success" v-if="item.SoQuyen > 0">Còn {{ item.SoQuyen }} cuốn</small>
              </td>
              <td class="align-middle text-muted">{{ item.TacGia }}</td>
              <td class="align-middle text-center">
                <button class="btn btn-success btn-sm mr-2 px-3 rounded-pill" @click="borrowOne(item, index)">
                  Mượn cuốn này
                </button>
                <button class="btn btn-outline-danger btn-sm rounded-circle" @click="removeFromCart(index)" title="Xóa khỏi giỏ">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="d-flex justify-content-between align-items-center mt-4 border-top pt-4">
        <router-link to="/user/home" class="text-orange font-weight-bold">
          <i class="fas fa-arrow-left mr-2"></i> Tiếp tục chọn sách
        </router-link>
        <div>
           <span class="mr-3 text-muted" v-if="cartItems.length > 5">
             ⚠️ Bạn chỉ được mượn tối đa 5 cuốn thôi nhe!
           </span>
           <button class="btn btn-orange text-white px-4 py-2 font-weight-bold shadow-sm" 
                   :disabled="cartItems.length > 5"
                   @click="confirmBorrowAll">
            MƯỢN TẤT CẢ ({{ cartItems.length }})
          </button>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-5 shadow-sm bg-white rounded-lg" style="border-radius: 20px;">
      <i class="fas fa-box-open fa-4x text-light mb-3"></i>
      <p class="text-muted">Giỏ hàng trống trơn hà bạn ơi! 😂</p>
      <router-link to="/user/home" class="btn btn-orange text-white px-4">Đi chọn sách ngay</router-link>
    </div>
  </div>
</template>

<script>
import BorrowService from "@/services/borrow.service";

export default {
  data() {
    return {
      cartItems: [],
      user: JSON.parse(localStorage.getItem("user") || "{}")
    };
  },
  methods: {
    loadCart() {
      const cart = localStorage.getItem("cart");
      this.cartItems = cart ? JSON.parse(cart) : [];
    },

    async borrowOne(book, index) {
      if (confirm(`Bạn chắc chắn muốn mượn cuốn "${book.TenSach}" này không?`)) {
        try {
          await BorrowService.createRequest({
            MaDocGia: this.user.MaDocGia,
            cartItems: [book] 
          });

          alert("Đã gửi yêu cầu mượn thành công! Đợi Admin duyệt nhe. 🎉");
          
          this.cartItems.splice(index, 1);
          localStorage.setItem("cart", JSON.stringify(this.cartItems));
          window.dispatchEvent(new CustomEvent('cart-updated'));
          this.$router.push("/profile");
        } catch (error) {
          alert("Lỗi rồi bạn ơi!");
        }
      }
    },

    async confirmBorrowAll() {
      if (this.cartItems.length > 5) {
        alert("Tham quá bạn ơi! Bỏ bớt ra, mượn tối đa 5 cuốn thôi nhe! 😂");
        return;
      }

      try {
        await BorrowService.createRequest({
          MaDocGia: this.user.MaDocGia,
          cartItems: this.cartItems 
        });

        alert("Đã gửi yêu cầu mượn tất cả thành công! 🎉");
        localStorage.removeItem("cart");
        window.dispatchEvent(new CustomEvent('cart-updated'));
        this.$router.push("/profile");
      } catch (error) {
        alert("Lỗi rồi bạn ơi!");
      }
    },

    removeFromCart(index) {
      this.cartItems.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(this.cartItems));
      window.dispatchEvent(new CustomEvent('cart-updated'));
    }
  },
  mounted() { this.loadCart(); }
};
</script>

<style scoped>
.custom-card { border-radius: 20px; }
.btn-orange { background-color: #ff7f50; border: none; }
.text-orange { color: #ff7f50; }
.rounded-pill { border-radius: 50px; }
</style>