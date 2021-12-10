<template>
  <div class="container">
    <div class="mt-5 row justify-content-center">
      <div class="col-lg-5 col-md-7">
        <div class="card mb-0">
          <div class="card-body p-5">
            <h2 class="mb-4">Registro</h2>
            <form
              role="registerForm"
              @submit.prevent="saveUser"
              @reset="resetForm"
            >
              <b-input
                name="firstName"
                placeholder="Nombre"
                rules="required|min:2"
              />

              <b-input
                name="lastName"
                placeholder="Apellido"
                rules="required|min:2"
              />

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

              <div class="text-center mt-4">
                <button class="btn btn-light mx-1" type="reset">Limpiar</button>
                <button class="btn btn-primary mx-1" type="submit">
                  Crear Cuenta
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useForm } from "vee-validate";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import authService from "@/services/auth.service";
export default {
  setup() {
    const { handleSubmit } = useForm();
    const router = useRouter();

    return {
      saveUser: handleSubmit((formValues) => {
        authService
          .register(formValues)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Usuario creado con exito",
            }).then(() => {
              router.push("/auth/login");
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
