import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router/routes";
import "./style.css";
import { initAuth } from "./utils/authInit.js";
import { useAuthStore } from "./stores/auth.js";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

// Inicializar sistema de autenticação após criar o Pinia
const authStore = useAuthStore();
authStore.init();

// Inicializar sistema de autenticação
initAuth();

app.mount("#app");
