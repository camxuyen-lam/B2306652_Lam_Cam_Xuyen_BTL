<template>
  <div class="guest-home">
    <div class="hero-section">
      <div class="hero-overlay"></div>
      <div class="container hero-content text-center">
        <h1 class="display-3 font-weight-bold text-white mb-2">ROSE LIBRARY</h1>
        <p class="text-light mb-4" style="font-size: 1.2rem;">Hệ thống mượn trả sách trực tuyến thông minh</p>
        
        <div class="row justify-content-center">
          <div class="col-md-7">
            <div class="input-group shadow-lg custom-search">
              <input type="text" class="form-control border-0" placeholder="Tìm tên sách hoặc tác giả..." v-model="searchText">
              <div class="input-group-append">
                <button class="btn btn-orange text-white px-4"><i class="fas fa-search"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container mt-5 pb-5">
      <div class="mb-5" v-if="topBooks.length > 0">
        <h4 class="font-weight-bold mb-4 text-orange">
          <i class="fas fa-fire mr-2"></i> TOP SÁCH TIÊU BIỂU
        </h4>
        <div class="row">
          <div v-for="book in topBooks" :key="book._id" class="col-6 col-md-4 col-lg-3 mb-4">
            <BookCardGuest :book="book" @add-to-cart="handleAddToCart" @borrow="handleBorrow" />
          </div>
        </div>
      </div>

      <div v-for="cat in categories" :key="cat" class="mb-5">
        <div v-if="getBooksByCategory(cat).length > 0">
          <h4 class="font-weight-bold mb-4 border-bottom pb-2 text-dark text-uppercase" style="letter-spacing: 1px;">
            <i class="fas fa-bookmark mr-2 text-orange"></i> Sách {{ cat }}
          </h4>
          <div class="row">
            <div v-for="book in getBooksByCategory(cat)" :key="book._id" class="col-6 col-md-4 col-lg-3 mb-4">
              <BookCardGuest :book="book" @add-to-cart="handleAddToCart" @borrow="handleBorrow" />
            </div>
          </div>
        </div>
      </div>

      <div v-if="filteredBooks.length === 0" class="text-center py-5">
        <p class="text-muted">Bạn ơi, không tìm thấy cuốn sách nào hết trơn! 😅</p>
      </div>
    </div>
  </div>
</template>

<script>
import BookCardGuest from "@/components/BookCardGuest.vue";
import BookService from "@/services/book.service";

export default {
  components: { BookCardGuest },
  data() {
    return {
      books: [],
      searchText: "",
      categories: ['Tiểu thuyết', 'Kỹ năng', 'Trinh thám', 'Công nghệ']
    }
  },
  computed: {
    filteredBooks() {
      const search = this.searchText.toLowerCase();
      return this.books.filter(b => b.TenSach.toLowerCase().includes(search));
    },
    topBooks() {
      return this.filteredBooks.slice(0, 4);
    }
  },
  methods: {
    async loadBooks() {
      try {
        this.books = await BookService.getAll();
      } catch (e) {
        console.log("Lỗi tải sách:", e);
      }
    },
    getBooksByCategory(categoryName) {
      return this.filteredBooks.filter(b => b.TheLoai === categoryName);
    },
    handleAddToCart(book) {
      const user = localStorage.getItem("user");
      if (!user) {
        alert("Bạn ơi, đăng nhập đi rồi tui mới cho bỏ vô giỏ hàng nhe! 😉");
        this.$router.push("/login");
      } else {
        alert(`Đã thêm cuốn "${book.TenSach}" vào giỏ hàng!`);
      }
    },
    handleBorrow(book) {
      const user = localStorage.getItem("user");
      if (!user) {
        alert("Bạn phải đăng nhập mới được mượn sách nhe bạn! ");
        this.$router.push("/login");
      } else {
        alert(`Đang chuyển bạn đến trang làm thủ tục mượn cuốn: ${book.TenSach}`);
      }
    }
  },
  mounted() {
    this.loadBooks();
  }
}
</script>

<style scoped>
.hero-section { position: relative; padding: 100px 0; background-color: #333; overflow: hidden; }
.hero-overlay { 
  position: absolute; top: 0; left: 0; width: 100%; height: 100%; 
  background-image: url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1350&q=80');
  background-size: cover; background-position: center; filter: blur(3px); opacity: 0.5;
}
.hero-content { position: relative; z-index: 2; }
.custom-search { border-radius: 50px; overflow: hidden; background: white; }
.btn-orange { background-color: #ff7f50; border: none; }
.text-orange { color: #ff7f50; }
</style>