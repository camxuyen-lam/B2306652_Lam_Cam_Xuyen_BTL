<template>
  <div class="card h-100 shadow-sm">
    <div class="card-body">
      <h5 class="card-title text-primary">{{ book.TenSach }}</h5>
      <p class="card-text"><strong>Tác giả:</strong> {{ book.TacGia }}</p>
      <p class="card-text text-danger font-weight-bold">Giá: {{ book.DonGia.toLocaleString() }}đ</p>
      <p class="card-text"><small class="text-muted">Số lượng còn: {{ book.SoQuyen }}</small></p>
    </div>
    <div class="card-footer bg-white border-top-0">
      <button class="btn btn-success btn-block">Mượn sách</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    book: { type: Object, required: true },
  },
};
</script>

<style scoped>
.card {
  transition: transform 0.2s;
}
.card:hover {
  transform: translateY(-5px);
}
</style>