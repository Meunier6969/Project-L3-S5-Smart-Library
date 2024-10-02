import { createRouter, createWebHistory } from 'vue-router';
import Home from "@/views/Home.vue";
import Admin from "@/views/Admin.vue";
import NotFound from "@/views/NotFound.vue";
import AdminStats from "@/views/AdminStats.vue";

const routes = [
  {path: '/', redirect:'/home'},
  {path: '/home', name: "Home",component: Home},
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'stats',
        name: 'AdminStats',
        component: AdminStats,
      },
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
