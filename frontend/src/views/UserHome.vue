<template>
  <div class="user-home container py-4">
    <div class="welcome-banner shadow-sm p-4 mb-5">
      <div class="row align-items-center">
        <div class="col-md-6">
          <h2 class="font-weight-bold text-dark">Chào bạn, {{ currentUser.name }}! 👋</h2>
          <p class="text-muted">Hôm nay bạn muốn khám phá thêm kiến thức gì không?</p>
        </div>
        <div class="col-md-6 text-right">
          <div class="d-inline-block text-center px-4 border-left">
            <h3 class="m-0 text-orange font-weight-bold">{{ myBorrowCount }}</h3>
            <small class="text-muted text-uppercase">Sách đang mượn</small>
          </div>
        </div>
      </div>

      <!-- THANH TÌM KIẾM -->
      <div class="row justify-content-center mt-4">
        <div class="col-md-10">
          <div class="input-group custom-search-box shadow-sm">
            <div class="input-group-prepend">
              <span class="input-group-text bg-white border-0"><i class="fas fa-search text-muted"></i></span>
            </div>
            <input type="text" class="form-control border-0" placeholder="Tìm kiếm sách trong thư viện của bạn..." v-model="searchText">
          </div>
        </div>
      </div>
    </div>

    <div v-for="cat in categories" :key="cat" class="category-section mb-5">
      <div v-if="getBooksByCategory(cat).length > 0">
        <h4 class="category-title mb-4">
          <span class="title-dot"></span> Sách {{ cat }}
        </h4>
        <div class="row">
          <div v-for="book in getBooksByCategory(cat)" :key="book._id" class="col-6 col-md-4 col-lg-3 mb-4">
            <BookCardGuest 
              :book="book" 
              @add-to-cart="handleAddToCart" 
              @borrow="handleBorrow" 
            />
          </div>
        </div>
      </div>
    </div>

    <div v-if="filteredBooks.length === 0" class="text-center py-5">
      <p class="text-muted">Không tìm thấy cuốn sách nào phù hợp nhe bạn! 😅</p>
    </div>
  </div>
</template>

<script>
import BookCardGuest from "@/components/BookCardGuest.vue";
import BookService from "@/services/book.service";
import BorrowService from "@/services/borrow.service";

export default {
  components: { BookCardGuest },
  data() {
    return {
      currentUser: JSON.parse(localStorage.getItem("user") || "{}"),
      books: [],
      searchText: "",
      myBorrowCount: 0,
      categories: ['Tiểu thuyết', 'Kỹ năng', 'Trinh thám', 'Công nghệ']
    }
  },
  computed: {
    filteredBooks() {
      const search = this.searchText.toLowerCase();
      return this.books.filter(b => b.TenSach.toLowerCase().includes(search));
    }
  },
  methods: {
    async initData() {
      try {
        this.books = await BookService.getAll();
        const borrows = await BorrowService.getAll();
        this.myBorrowCount = borrows.filter(b => 
          b.MaDocGia === this.currentUser.MaDocGia && b.TrangThai === 'DangMuon'
        ).length;
      } catch (e) {
        console.log("Lỗi tải dữ liệu:", e);
      }
    },

    getBooksByCategory(categoryName) {
      return this.filteredBooks.filter(b => b.TheLoai === categoryName);
    },

    handleAddToCart(book) {
      let cart = JSON.parse(localStorage.getItem("cart") || "[]");

      if (cart.length >= 5) {
        alert("Bạn ơi, mượn tối đa 5 cuốn thôi, đọc hết rồi mượn tiếp nhe! 😂");
        return;
      }

      if (cart.find(item => item._id === book._id)) {
        alert("Cuốn này bạn chọn rồi mà! Chọn cuốn khác đi nhe.");
        return;
      }

      cart.push(book);
      localStorage.setItem("cart", JSON.stringify(cart));
      

      window.dispatchEvent(new CustomEvent('cart-updated'));
      alert(`Đã thêm "${book.TenSach}" vào giỏ hàng! 🛒`);
    },

    handleBorrow(book) { 
      alert(`Bạn muốn mượn ngay cuốn: ${book.TenSach} đúng không? Qua giỏ hàng xác nhận nhe!`); 
      this.handleAddToCart(book); 
      this.$router.push("/cart");
    }
  },
  mounted() {
    this.initData();
  }
}
</script>

<style scoped>
.user-home { background-color: #f8f9fa; min-height: 100vh; }
.welcome-banner { background: white; border-radius: 25px; border: 1px solid #eee; }
.custom-search-box { background: white; border-radius: 15px; overflow: hidden; border: 1px solid #ddd; }
.custom-search-box input:focus { box-shadow: none; }
.category-title { display: flex; align-items: center; font-weight: bold; color: #333; }
.title-dot { width: 8px; height: 25px; background-color: #ff7f50; border-radius: 10px; margin-right: 15px; }
.text-orange { color: #ff7f50; }
</style>