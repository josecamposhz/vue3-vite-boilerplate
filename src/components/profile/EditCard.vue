<template>
  <div class="card p-3">
    <h3 class="mb-3">Editar Perfil</h3>

    <form role="updateProfileForm" @submit.prevent="updateProfile">
      <b-input name="firstName" placeholder="Nombre" rules="required|min:2" />
      <b-input name="lastName" placeholder="Apellido" rules="required|min:2" />
      <b-input
        name="email"
        type="email"
        placeholder="Email"
        rules="required|email"
      />

      <div class="row justify-content-center mt-3">
        <div class="col-6">
          <password-modal />
        </div>
        <div class="col-6">
          <button class="col-12 btn btn-primary" type="submit">
            Actualizar Perfil
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { computed } from "vue";
import { useStore } from "vuex";
import { useForm } from "vee-validate";
import authService from "@/services/auth.service";
import PasswordModal from "./PasswordModal.vue";
export default {
    components: { PasswordModal },
  setup() {
    const store = useStore();
    const { handleSubmit, setValues } = useForm();

    const currentUser = computed(() => store.state.user);
    const { firstName, lastName, email, _id: userId } = currentUser.value;

    // Initial values
    setValues({
      firstName,
      lastName,
      email,
    });

    return {
      updateProfile: handleSubmit((formValues) => {
        authService
          .updateProfile(formValues, userId)
          .then(({ data }) => {
            localStorage.setItem("user", JSON.stringify(data.user));
            store.commit("setUser", data.user);
            Swal.fire({
              title: "Usuario actualizado con éxito",
              icon: "success",
              showConfirmButton: false,
              position: "bottom-end",
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
