<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-success shadow">
    <div class="container">
      <router-link to="/" class="navbar-brand font-weight-bold">
        <i class="fas fa-university mr-2"></i> ROSE LIBRARY
      </router-link>
      
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link">🏠 Tổng quan</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/books" class="nav-link">📚 Quản lý Sách</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/readers" class="nav-link">👥 Độc giả</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/borrow" class="nav-link">📝 Mượn trả</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/publishers" class="nav-link">🏢 Nhà xuất bản</router-link>
          </li>
        </ul>
        
        <div class="navbar-nav">
          <span class="nav-item nav-link text-light mr-3">Chào, Admin Xuyến!</span>
          <button class="btn btn-outline-danger btn-sm">Đăng xuất</button>
        </div>
      </div>
    </div>
  </nav>
</template>