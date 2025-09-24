import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router/routes";
import "./style.css";
import "./styles/colors.css";
import { initAuth } from "./utils/authInit.js";

// Inicializar sistema de autenticação
initAuth();

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.mount("#app");
