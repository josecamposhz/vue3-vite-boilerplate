import { createApp } from "vue";
import "bootstrap";
import "./plugins/vee-validate";

import App from "./App.vue";
import router from "./router";
import store from "./store";

// styles
import "./assets/scss/index.scss";
import "sweetalert2/dist/sweetalert2.min.css";

const app = createApp(App);
app.use(store);
app.use(router);

// components
import BaseInput from "./components/base/Input.vue";
import BaseTable from "./components/base/Table.vue";
import BaseModal from "./components/base/Modal.vue";
app.component("b-input", BaseInput);
app.component("b-table", BaseTable);
app.component("b-modal", BaseModal);

app.mount("#app");
