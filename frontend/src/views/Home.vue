<template>
  <div class="guest-home">
    <div class="hero-search py-5 mb-5">
      <div class="container text-center">
        <h1 class="display-4 font-weight-bold mb-3">Tìm sách bạn yêu thích?</h1>
        <p class="text-muted mb-4">Hàng ngàn cuốn sách hay đang chờ bạn khám phá</p>
        <div class="row justify-content-center">
          <div class="col-md-7">
            <div class="input-group input-group-lg shadow-sm custom-search">
              <input type="text" class="form-control border-0" placeholder="Nhập tên sách hoặc tác giả..." v-model="searchText">
              <div class="input-group-append">
                <button class="btn btn-orange px-4 text-white"><i class="fas fa-search"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container pb-5">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h4 class="font-weight-bold m-0">📚 Sách mới cập nhật</h4>
        <span class="text-muted">Tìm thấy {{ filteredBooks.length }} cuốn</span>
      </div>

      <div v-if="filteredBooks.length > 0" class="row">
        <div v-for="book in filteredBooks" :key="book._id" class="col-6 col-lg-3 mb-4">
          <BookCardGuest :book="book" @add-to-cart="handleAddToCart" @chat-ai="handleChatAI" />
        </div>
      </div>
      
      <div v-else class="text-center py-5">
        <i class="fas fa-search fa-3x text-muted mb-3"></i>
        <p class="text-muted">Không tìm thấy cuốn sách nào phù hợp!</p>
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
      searchText: ""
    }
  },
  computed: {
    filteredBooks() {
      if (!this.searchText) return this.books;
      const search = this.searchText.toLowerCase();
      return this.books.filter(b => 
        b.TenSach.toLowerCase().includes(search) || 
        b.TacGia.toLowerCase().includes(search)
      );
    }
  },
  methods: {
    async loadBooks() {
      try {
        this.books = await BookService.getAll();
      } catch (e) { console.log(e); }
    },
    handleAddToCart(book) {
      alert(`Đã thêm cuốn "${book.TenSach}" vào giỏ hàng nhe bạn!`);
    },
    handleChatAI(book) {
      alert(`Đang kết nối Trợ lý AI để tư vấn về cuốn: ${book.TenSach}`);
    }
  },
  mounted() { this.loadBooks(); }
}
</script>

<style scoped>
.guest-home { background-color: #f8f9fa; min-height: 100vh; }
.hero-search { background: white; border-bottom: 1px solid #eee; }
.custom-search { border-radius: 50px; overflow: hidden; border: 2px solid #ff7f50; }
.btn-orange { background-color: #ff7f50; }
</style>