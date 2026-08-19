<template>
  <div :class="{ 'wrapper': isAdmin }">
    
    <nav v-if="isAdmin" id="sidebar" class="bg-orange shadow">
      <div class="sidebar-header text-white p-3">
        <h4><b>ROSE LIBRARY</b></h4>
      </div>
      <ul class="list-unstyled components">
        <li :class="{ active: $route.name === 'dashboard' }"><router-link to="/admin/dashboard"><i class="fas fa-chart-line"></i> Tổng quan</router-link></li>
        <li :class="{ active: $route.name === 'books' }"><router-link to="/admin/books"><i class="fas fa-book"></i> Quản lý sách</router-link></li>
        <li :class="{ active: $route.name === 'categories' }"><router-link to="/admin/categories"><i class="fas fa-tags"></i> Quản lý thể loại</router-link></li>
        <li :class="{ active: $route.name === 'readers' }"><router-link to="/admin/readers"><i class="fas fa-users"></i> Quản lý độc giả</router-link></li>
        <li :class="{ active: $route.name === 'publishers' }"><router-link to="/admin/publishers"><i class="fas fa-building"></i> Quản lý NXB</router-link></li>
        <li :class="{ active: $route.name === 'violations' }"><router-link to="/admin/violations"><i class="fas fa-exclamation-triangle"></i> Xử lý vi phạm</router-link></li>
        <li :class="{ active: $route.name === 'borrow' }"><router-link to="/admin/borrow"><i class="fas fa-exchange-alt"></i> Mượn trả sách</router-link></li>
        
        <li class="mt-4 border-top"><router-link to="/"><i class="fas fa-home"></i> Xem trang khách</router-link></li>
        <li><a href="#" @click.prevent="handleLogout"><i class="fas fa-sign-out-alt"></i> Đăng xuất</a></li>
      </ul>
    </nav>

    <nav v-if="!isAdmin && $route.path !== '/login' && $route.path !== '/register'" 
         class="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top py-3">
      <div class="container">
        <router-link class="navbar-brand font-weight-bold text-orange" to="/">ROSE LIBRARY</router-link>
        
        <div class="ml-auto d-flex align-items-center">
          <template v-if="currentUser && currentUser.Email !== 'admin@gmail.com'">
            <router-link to="/user/home" class="nav-link-xuyen">Trang chủ</router-link>
            <router-link to="/history" class="nav-link-xuyen">Lịch sử mượn-trả</router-link>
            
            <router-link to="/cart" class="nav-link text-dark mr-4 position-relative cart-icon">
              <i class="fas fa-shopping-basket fa-lg"></i>
              <span class="badge badge-orange">{{ cartCount }}</span>
            </router-link>

            <div class="dropdown">
              <div class="avatar-nav shadow-sm" id="userMenu" data-toggle="dropdown">
                <img :src="currentUser.Avatar || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtLFTAqUP5Kc96lJAB7SGDaCKf1wT4q52aqL6ZLh85Rw&s=' + currentUser.MaDocGia" alt="avatar">
              </div>
              <div class="dropdown-menu dropdown-menu-right shadow-lg border-0 mt-3 custom-dropdown">
                <div class="dropdown-header text-dark"><strong>{{ currentUser.name }}</strong></div>
                <router-link to="/profile" class="dropdown-item"><i class="fas fa-user-circle mr-2"></i> Trang cá nhân</router-link>
                <router-link to="/settings" class="dropdown-item"><i class="fas fa-cog mr-2"></i> Cài đặt</router-link>
                <div class="dropdown-divider"></div>
                <a href="#" class="dropdown-item text-danger" @click.prevent="handleLogout">
                  <i class="fas fa-power-off mr-2"></i> Thoát
                </a>
              </div>
            </div>
          </template>

          <router-link v-else-if="!currentUser" to="/login" class="btn-login-xuyen">Đăng nhập</router-link>

          <router-link v-else to="/admin/dashboard" class="btn btn-dark btn-sm px-3">Quay lại Quản lý</router-link>
        </div>
      </div>
    </nav>

    <div id="content" :class="{ 'guest-padding': !isAdmin && $route.path !== '/login' }">
      <nav v-if="isAdmin" class="navbar navbar-expand-lg navbar-light bg-light shadow-sm mb-4">
        <div class="container-fluid">
  <div class="ml-auto d-flex align-items-center" v-if="currentUser">
            <span class="mr-3 small">Chào admin, <strong>{{ currentUser.name }}</strong></span>
            <a href="#" class="text-danger" @click.prevent="handleLogout"><i class="fas fa-sign-out-alt fa-lg"></i></a>
          </div>
        </div>
      </nav>

      <div class="container-fluid">
        <router-view />
      </div>

      <AppFooter v-if="!isAdmin && $route.path !== '/login' && $route.path !== '/register'" />
    </div>
  </div>
</template>

<script>
import AppFooter from "@/components/AppFooter.vue";
export default {
  components: { AppFooter },
  data() {
    return { currentUser: null, cartCount: 0 }
  },
  computed: {
    isAdmin() { return this.$route.path.startsWith('/admin'); }
  },
  methods: {
    updateUser() {
      const user = localStorage.getItem("user");
      this.currentUser = user ? JSON.parse(user) : null;
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      this.cartCount = cart.length; 
    },
    handleLogout() {
      if (confirm("Bà có chắc muốn thoát không?")) {
        localStorage.removeItem("user");
        this.updateUser();
        this.$router.push("/");
      }
    }
  },
  mounted() { 
    this.updateUser(); 
    window.addEventListener('cart-updated', this.updateUser);
  },
  beforeUnmount() { window.removeEventListener('cart-updated', this.updateUser); },
  watch: { '$route'() { this.updateUser(); } }
}
</script>

<style>
#sidebar {
  min-width: 250px; max-width: 250px; min-height: 100vh; position: sticky; top: 0; z-index: 1001;
  background: linear-gradient(180deg, #ff8e53 0%, #ff6b6b 100%); transition: all 0.3s;
}
#sidebar ul li a { padding: 15px 20px; display: block; color: white !important; text-decoration: none; }
#sidebar ul li.active a { background: rgba(255, 255, 255, 0.25); border-left: 4px solid white; }

.bg-orange { background-color: #ff7f50; }
.text-orange { color: #ff7f50; }
.btn-orange { background-color: #ff7f50; color: white; border: none; }
.wrapper { display: flex; width: 100%; align-items: stretch; }
#content { width: 100%; min-height: 100vh; background: #f8f9fa; flex: 1; }
.guest-padding { padding-top: 90px; }

.avatar-nav { width: 40px; height: 40px; border-radius: 50%; overflow: hidden; border: 2px solid #ff7f50; cursor: pointer; }
.avatar-nav img { width: 100%; height: 100%; object-fit: cover; }
.badge-orange { position: absolute; top: -5px; right: -8px; background-color: #ff7f50; color: white; border-radius: 50%; font-size: 10px; padding: 3px 6px; }

.nav-link-xuyen { position: relative; color: #333 !important; font-weight: 600; margin-right: 25px; text-decoration: none !important; transition: 0.3s; }
.nav-link-xuyen:hover, .router-link-exact-active.nav-link-xuyen { color: #ff7f50 !important; }
.nav-link-xuyen::after { content: ""; position: absolute; bottom: -5px; left: 0; width: 0; height: 2px; background-color: #ff7f50; transition: 0.3s; }
.nav-link-xuyen:hover::after, .router-link-exact-active.nav-link-xuyen::after { width: 100%; }

.btn-login-xuyen { background-color: white; color: #333; border: 1px solid #ddd; padding: 6px 20px; border-radius: 8px; font-weight: bold; text-decoration: none; }
.btn-login-xuyen:hover { background-color: #ff7f50; color: white !important; }
</style>