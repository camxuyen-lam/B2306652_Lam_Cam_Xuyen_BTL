import { createWebHistory, createRouter } from "vue-router";
import GuestHome from "@/views/GuestHome.vue"; 
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Dashboard from "@/views/Dashboard.vue";
import ReaderProfile from "@/views/ReaderProfile.vue";
import BookManagement from "@/views/BookManagement.vue";
import BorrowManagement from "@/views/BorrowManagement.vue";
import ReaderManagement from "@/views/ReaderManagement.vue";
import PublisherManagement from "@/views/PublisherManagement.vue";
import ViolationManagement from "@/views/ViolationManagement.vue";
import CategoryManagement from "@/views/CategoryManagement.vue";
import UserHome from "@/views/UserHome.vue";
import BorrowHistory from "@/views/BorrowHistory.vue";
const routes = [
    { path: "/", name: "guest-home", component: GuestHome },
    { path: "/login", name: "login", component: Login },
    { path: "/register", name: "register", component: Register },
    { path: "/user/home", name: "user-home", component: UserHome },
    { path: "/profile", name: "reader-profile", component: ReaderProfile },
     { path: "/history", name: "borrow-history", component: BorrowHistory },
    { path: "/cart", name: "cart", component: () => import("@/views/Cart.vue") },
    { path: "/settings", name: "settings", component: () => import("@/views/Settings.vue") },
    { path: "/admin/dashboard", name: "dashboard", component: Dashboard },
    { path: "/admin/books", name: "books", component: BookManagement },
    { path: "/admin/categories", name: "categories", component: CategoryManagement },
    { path: "/admin/readers", name: "readers", component: ReaderManagement },
    { path: "/admin/publishers", name: "publishers", component: PublisherManagement },
    { path: "/admin/violations", name: "violations", component: ViolationManagement },
    { path: "/admin/borrow", name: "borrow", component: BorrowManagement },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    const isAdminPage = to.path.startsWith('/admin');
    
    const loggedIn = localStorage.getItem('user');

    if (isAdminPage && !loggedIn) {
        return next('/login');
    }
    next();
});

export default router;