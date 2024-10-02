// src/router/router.js

import { createRouter, createWebHistory } from 'vue-router';
import Home from "@/views/Home.vue";
import Admin from "@/views/Admin.vue";
import NotFound from "@/views/NotFound.vue";


// Configuration des routes
const routes = [

  {path: '/', redirect:'/home'},
  {path: '/home', name: "Home",component: Home},
  {path:'/admin', name:"Admin",component:Admin},
  {
    path: '/:catchAll(.*)', // Capture toutes les routes inconnues
    name: 'NotFound',
    component: NotFound
  }
];

// Création du routeur
const router = createRouter({
  history: createWebHistory(), // Utilise l'historique du navigateur
  routes
});



export default router;
