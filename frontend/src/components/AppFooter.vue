<template>
  <footer class="footer-section text-white pt-5 pb-3">
    <div class="container">
      <div class="row">
        <div class="col-md-4 mb-4">
          <h5 class="font-weight-bold mb-3"><i class="fas fa-book-reader mr-2"></i> ROSE LIBRARY</h5>
          <p class="small text-light-50">
            Thư viện Rose - Nơi lan tỏa tri thức. <br>
            Mang đến cho bạn không gian đọc sách hiện đại và kho tài liệu phong phú đa dạng.
          </p>
        </div>

        <div class="col-md-4 mb-4">
          <h5 class="font-weight-bold mb-3">Liên hệ</h5>
          <ul class="list-unstyled small text-light-50">
            <li class="mb-2"><i class="fas fa-map-marker-alt mr-2"></i> Đường 3/2, Ninh Kiều, Cần Thơ</li>
            <li class="mb-2"><i class="fas fa-phone-alt mr-2"></i> (028) 1234 5678</li>
            <li class="mb-2"><i class="fas fa-envelope mr-2"></i> info@roselibrary.vn</li>
          </ul>
        </div>

        <div class="col-md-4 mb-4">
          <h5 class="font-weight-bold mb-3">Giờ mở cửa</h5>
          <p class="small mb-1">Thứ 2 - Thứ 6: 08:00 - 21:00</p>
          <p class="small mb-3">Thứ 7 - Chủ nhật: 09:00 - 17:00</p>
          <div class="social-icons">
            <a href="#" class="text-white mr-3"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="text-white mr-3"><i class="fab fa-instagram"></i></a>
            <a href="#" class="text-white"><i class="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>

      <hr class="border-secondary mt-4">
      
      <div class="text-center mt-3">
        <p class="small mb-0 text-light-50">&copy; 2025 Rose Library. Tất cả quyền được bảo lưu.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-section {
  background-color: #212529; 
  border-top: 4px solid #ff7f50; 
}
.text-light-50 {
  color: rgba(255, 255, 255, 0.7);
}
.social-icons i {
  font-size: 1.2rem;
  transition: 0.3s;
}
.social-icons i:hover {
  color: #ff7f50;
  transform: scale(1.2);
}
</style>