<template>
  <div class="card h-100 border-0 shadow-sm book-card" :class="{ 'out-of-stock': book.SoQuyen <= 0 }">
    <div class="book-img-container">
      <img :src="book.HinhAnh || 'https://via.placeholder.com/150x200?text=Rose+Library'" 
           class="card-img-top p-2" alt="Bìa sách">
      <span v-if="book.SoQuyen <= 0" class="badge badge-danger position-absolute m-2" style="top:0; right:0">Hết sách</span>
    </div>
    
    <div class="card-body text-center pt-2">
      <h6 class="font-weight-bold text-dark mb-1 text-truncate" :title="book.TenSach">
        {{ book.TenSach }}
      </h6>
      <p class="small text-muted mb-2">{{ book.TacGia }}</p>
      <p class="small font-weight-bold text-orange mb-3">Còn lại: {{ book.SoQuyen }} cuốn</p>
      
      <div class="d-flex justify-content-center gap-2 border-top pt-3">
        <button class="btn btn-outline-primary btn-sm mr-2" 
                :disabled="book.SoQuyen <= 0"
                @click="$emit('add-to-cart', book)" 
                title="Thêm vào giỏ">
          <i class="fas fa-shopping-basket"></i>
        </button>

        <button :class="book.SoQuyen > 0 ? 'btn-success' : 'btn-secondary'" 
                class="btn btn-sm px-3 font-weight-bold" 
                :disabled="book.SoQuyen <= 0"
                @click="$emit('borrow', book)">
          {{ book.SoQuyen > 0 ? 'Mượn ngay' : 'Hết sách' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default { 
  props: ['book'] 
}
</script>

<style scoped>
.book-card { 
  border-radius: 15px; 
  transition: 0.3s; 
  border: 1px solid #eee !important; 
}
.book-card:hover { 
  transform: translateY(-10px); 
  box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important; 
}

.out-of-stock {
  opacity: 0.8;
}
.out-of-stock img {
  filter: grayscale(80%);
}

.book-img-container { 
  height: 220px; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  overflow: hidden; 
  background-color: #fcfcfc;
  border-radius: 15px 15px 0 0;
  position: relative;
}
.book-img-container img { 
  height: 90%; 
  object-fit: contain; 
}

.text-orange { color: #ff7f50; }
.btn-success { background-color: #28a745; border: none; }
.btn-secondary { background-color: #adb5bd; border: none; }
</style>