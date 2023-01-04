import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vue3GoogleLogin from "vue3-google-login";

import "./assets/main.css";

const app = createApp(App);

app.use(router);

app.use(vue3GoogleLogin, {
    clientId: "446923302335-4feh7lc4eenvie7cfla3jpdn8kj7snfv.apps.googleusercontent.com",
})

app.mount("#app");
