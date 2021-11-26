<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-lg-5 col-md-7">
        <div class="card">
          <div class="card-body">
            <h2 class="text-center mb-3">Verificar Usuario</h2>
            <form role="resetPasswordForm" @submit.prevent="verifyEmail">
              <b-input
                name="password"
                placeholder="Contraseña"
                rules="required|min:6"
                type="password"
              />
              <b-input
                name="confirmPassword"
                placeholder="Repetir Contraseña"
                rules="required|min:6"
                type="password"
              />
              <button class="btn btn-primary d-block" type="submit">
                Verificar
              </button>
            </form>
          </div>
        </div>
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
    const route = useRoute();
    const router = useRouter();
    const { handleSubmit } = useForm();

    return {
      verifyEmail: handleSubmit((formValues) => {
        authService.verifyEmail({ token: route.query.token, ...formValues }).then(
          ({ data }) => {
            router.push("/auth/login");
            Swal.fire({
              title: data.message,
              icon: "success",
              showConfirmButton: false,
              position: "top-end",
              timer: 2000,
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
