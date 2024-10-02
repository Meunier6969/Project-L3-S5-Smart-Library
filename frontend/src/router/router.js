import { createRouter, createWebHistory } from 'vue-router';
import Home from "@/views/Home.vue";
import Admin from "@/views/Admin.vue";
import NotFound from "@/views/NotFound.vue";
import AdminManagerUser from "@/components/AdminManager/AdminUserManager.vue";
import AdminManagerBooks from "@/components/AdminManager/AdminBookManager.vue";

const routes = [
  {path: '/', redirect:'/home'},
  {path: '/home', name: "Home",component: Home},
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    redirect: '/admin/books',
    meta: { requiresAuth: true },
    children: [
      {
        path: 'users',
        name: 'AdminManagerUsers',
        component: AdminManagerUser,
      },
        {
          path: 'books',
            name: 'AdminManagerBook',
            component: AdminManagerBooks
        }
    ],

  },
  {
    path: '/:catchAll(.*)', // Capture toutes les routes inconnues
    name: 'NotFound',
    component: NotFound,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  console.log('Navigating to:', to.fullPath);

  if (to.meta.requiresAuth) {
    const userStore = JSON.parse(localStorage.getItem('userStore')); // Parse la chaîne JSON
    if (userStore.user) {
      console.log('User data found:', userStore);
      var token = true;
    }


    console.log('Token found:', !!token);

    if (token) {
      next();
    } else {
      next('/');
    }
  } else {
    next();
  }
});

export default router;
