import { createStore } from "vuex";
import credentialService from "@/services/credential.service";

export default createStore({
  state: {
    user: credentialService.getUser(),
  },
  getters: {
    userName(state) {
      return `${state.user.firstName} ${state.user.lastName}`;
    },
    isAuthenticated(state) {
      return state.user !== null;
    },
    isAdmin(state) {
      return state.user.role === "ADMIN";
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {},
});
