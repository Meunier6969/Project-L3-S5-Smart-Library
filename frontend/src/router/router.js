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
    meta: { requiresAuth: false }  // Utilisation de meta pour la protection de la route
  }
];

// Création du routeur
const router = createRouter({
  history: createWebHistory(), // Utilise l'historique du navigateur
  routes
});



export default router;
