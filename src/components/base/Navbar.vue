<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">VueApp</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#baseNavbar"
        aria-controls="baseNavbar"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="baseNavbar">
        <ul class="navbar-nav" />
        <!-- Right aligned nav items -->

        <ul v-if="!isAuthenticated" class="navbar-nav ms-auto">
          <router-link
            class="nav-link"
            to="/auth/login"
            :active="isActive('/auth/login')"
          >
            Iniciar Sesión
          </router-link>
          <router-link
            class="nav-link"
            to="/auth/register"
            :active="isActive('/auth/register')"
          >
            Registrarse
          </router-link>
        </ul>

        <ul v-if="isAuthenticated" class="navbar-nav ms-auto">
          <router-link
            v-if="isAdmin"
            class="nav-link"
            to="/admin/users"
            :active="isActive('/admin/users')"
          >
            Usuarios
          </router-link>

          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              id="navbarDropdownMenuLink"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ userName }}
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <li>
                <router-link
                  class="dropdown-item"
                  to="/profile"
                  :active="isActive('/profile')"
                >
                  Perfil
                </router-link>
              </li>
              <li>
                <button class="dropdown-item" @click="logout()">
                  Cerrar Sesión
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["user"]),
    ...mapGetters(["isAuthenticated", "isAdmin", "userName"]),
  },
  methods: {
    ...mapMutations(["setUser"]),
    isActive(route) {
      return this.$route.path === route;
    },
    logout() {
      this.setUser(null);
      localStorage.clear();
      location.reload();
    },
  },
};
</script>

<style>
.user-name {
  font-size: 0.875rem;
  vertical-align: middle;
  font-weight: 500;
  letter-spacing: 0.0892857143em;
}
</style>
