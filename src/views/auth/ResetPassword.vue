<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-body">
        <h1 class="h2">Restablecer contraseña</h1>
        <form role="resetPasswordForm" @submit.prevent="resetPassword">
          <b-input
            name="password"
            type="password"
            placeholder="Nueva Contraseña"
            rules="required|min:6"
          />
          <b-input
            name="confirmPassword"
            type="password"
            placeholder="Repetir Contraseña"
            rules="required|min:6"
          />
          <button class="btn btn-primary" type="submit">
            Restablecer contraseña
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { useForm } from "vee-validate";
import { useRoute, useRouter } from "vue-router";
import authService from "@/services/auth.service";
export default {
  setup() {
    const { handleSubmit } = useForm();
    const router = useRouter();
    const route = useRoute();

    return {
      resetPassword: handleSubmit((formValues) => {
        authService
          .resetPassword({
            token: route.query.token,
            ...formValues,
          })
          .then(
            ({ data }) => {
              router.push("/auth/login");
              Swal.fire({
                title: data.message,
                icon: "success",
                showConfirmButton: false,
                position: "top-end",
                timer: 1200,
                toast: true,
              });
            },
            (error) => {
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
