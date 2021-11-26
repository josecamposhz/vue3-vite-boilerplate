<template>
  <div class="container">
    <div class="mt-5 row justify-content-center">
      <div class="col-lg-5 col-md-7">
        <div class="card mb-0">
          <div class="card-body d-grid gap-2 p-5">
            <h2 class="mb-4">Iniciar Sesión</h2>
            <form role="loginForm" class="d-grid" @submit.prevent="login">
              <b-input
                name="email"
                type="email"
                placeholder="Email"
                rules="required|email"
              />
              <b-input
                name="password"
                type="password"
                placeholder="Contraseña"
                rules="required|min:6"
              />

              <button class="btn btn-primary my-3" type="submit">
                Iniciar Sesión
              </button>
            </form>
            <router-link class="text-center" to="/auth/forgot-password">
              ¿Olvidaste tu contraseña?
            </router-link>
            <hr>
            <router-link to="/auth/register" class="btn btn-success mt-2">
              Crear cuenta
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useForm } from "vee-validate";
import authService from "@/services/auth.service";
import Swal from "sweetalert2";
export default {
  setup() {
    const { handleSubmit } = useForm();
    const router = useRouter();
    const store = useStore();

    return {
      login: handleSubmit(({ email, password }) => {
        authService
          .login({ email, password })
          .then((response) => {
            const { user, token } = response.data;
            store.commit("setUser", user);
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", token);
            router.push("/profile");
            Swal.fire({
              title: `Bienvenido ${user.firstName} ${user.lastName}`,
              icon: "success",
              showConfirmButton: false,
              position: "top-end",
              timer: 1200,
              toast: true,
            });
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: `Error`,
              text: error.response.data.error,
            });
          });
      }),
    };
  },
};
</script>
