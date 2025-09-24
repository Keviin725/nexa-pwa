import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";
import AuthLayout from "../layouts/AuthLayout.vue";
import LandingPage from "../pages/LandingPage.vue";
import HomePage from "../pages/HomePage.vue";
import Products from "../pages/Products.vue";
import Sales from "../pages/Sales.vue";
import Clients from "../pages/Clients.vue";
import Reports from "../pages/Reports.vue";
import Settings from "../pages/Settings.vue";
import UserManagement from "../pages/UserManagement.vue";
import Billing from "../pages/Billing.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import {
  requireAuth,
  requireAdmin,
  requireManager,
  redirectIfAuthenticated,
} from "./guards.js";
import {
  salesGuard,
  productsGuard,
  clientsGuard,
  reportsGuard,
  usersGuard,
  settingsGuard,
} from "./guards.js";

const routes = [
  // Landing Page (pública)
  { path: "/", name: "Landing", component: LandingPage },
  { path: "/landing", redirect: "/" },

  // Rotas com MainLayout (sistema principal)
  {
    path: "/app",
    component: MainLayout,
    beforeEnter: requireAuth,
    children: [
      { path: "", name: "Home", component: HomePage },
      {
        path: "products",
        name: "Products",
        component: Products,
        beforeEnter: productsGuard,
      },
      {
        path: "sales",
        name: "Sales",
        component: Sales,
        beforeEnter: salesGuard,
      },
      {
        path: "clients",
        name: "Clients",
        component: Clients,
        beforeEnter: clientsGuard,
      },
      {
        path: "reports",
        name: "Reports",
        component: Reports,
        beforeEnter: reportsGuard,
      },
      {
        path: "settings",
        name: "Settings",
        component: Settings,
        beforeEnter: settingsGuard,
      },
      {
        path: "users",
        name: "UserManagement",
        component: UserManagement,
        beforeEnter: usersGuard,
      },
      {
        path: "billing",
        name: "Billing",
        component: Billing,
        beforeEnter: requireAuth,
      },
    ],
  },
  // Rotas com AuthLayout (autenticação)
  {
    path: "/auth",
    component: AuthLayout,
    children: [
      {
        path: "login",
        name: "Login",
        component: Login,
        beforeEnter: redirectIfAuthenticated,
      },
      {
        path: "register",
        name: "Register",
        component: Register,
        beforeEnter: redirectIfAuthenticated,
      },
    ],
  },
  // Redirecionamentos para compatibilidade
  { path: "/login", redirect: "/auth/login" },
  { path: "/register", redirect: "/auth/register" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
