<template>
  <div class="container mt-5">
    <div class="card">
      <div v-if="!linkSent" class="card-body">
        <h1 class="h2">Restablecer contraseña</h1>
        <form role="loginForm" @submit.prevent="sendLink">
          <b-input
            name="email"
            type="email"
            label="Introduce tu Correo electrónico"
            placeholder="Email"
            rules="required|email"
          />
          <button class="btn btn-success" type="submit" :disabled="isLoading">
            {{ isLoading ? "Cargando..." : "Enviar enlace de restablecimiento" }}
          </button>
        </form>
      </div>
      <div v-else class="card-body">
        <h2>Restablecer contraseña</h2>
        <div v-show="message" class="my-3">{{ message }}</div>
        <router-link class="btn btn-primary" to="/auth/login">
          Volver al Inicio
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useForm } from "vee-validate";
import authService from "@/services/auth.service";
import Swal from "sweetalert2";
export default {
  setup() {
    const { handleSubmit } = useForm();
    const isLoading = ref(false);
    const linkSent = ref(false);
    const message = ref("");
    const email = ref("");

    return {
      email,
      message,
      linkSent,
      isLoading,
      sendLink: handleSubmit((formValues) => {
        isLoading.value = true;
        authService.forgotPassword(formValues).then(
          ({ data }) => {
            linkSent.value = true;
            isLoading.value = false;
            message.value = data.message;
          },
          (error) => {
            isLoading.value = false;
            Swal.fire({
              icon: "error",
              title: `Error`,
              text: error.response.data.error,
            });
          }
        );
      }),
    };
  },
};
</script>
