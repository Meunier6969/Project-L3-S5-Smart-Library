// src/router/router.js

import { createRouter, createWebHistory } from 'vue-router';


import Profile from '@/views/Profile.vue';
import Home from "@/views/Home.vue";

// Configuration des routes
const routes = [

  {path: '/', redirect:'/home'},
  {path: '/home', name: "Home",component: Home},
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true }  // Utilisation de meta pour la protection de la route
  }
];

// Création du routeur
const router = createRouter({
  history: createWebHistory(), // Utilise l'historique du navigateur
  routes
});

// Middleware pour la vérification de l'authentification
router.beforeEach((to, from, next) => {
  const isAuthenticated = false; // Remplace par ta logique d'authentification

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    // Si la route nécessite une authentification et que l'utilisateur n'est pas authentifié
    next({ name: 'Login' });
  } else {
    next(); // Continue vers la route demandée
  }
});

export default router;
