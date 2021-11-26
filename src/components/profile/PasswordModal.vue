<template>
  <button
    type="button"
    class="col-12 btn btn-primary"
    @click="toogleModal(true)"
  >
    Editar Contraseña
  </button>

  <form role="updatePasswordForm" @submit.prevent="updatePassword">
    <b-modal v-model="isOpen" title="Editar Contraseña" centered>
      <template v-slot:body>
        <b-input
          name="oldPassword"
          type="password"
          placeholder="Contraseña Actual"
          rules="required|min:6"
        />
        <b-input
          name="newPassword"
          type="password"
          placeholder="Nueva Contraseña"
          rules="required|min:6"
        />
        <b-input
          name="repeatPassword"
          type="password"
          placeholder="Repetir Nueva Contraseña"
          rules="required|min:6"
        />
      </template>
      <template v-slot:footer>
        <button class="btn btn-light" type="reset" @click="toogleModal(false)">
          Cancelar
        </button>
        <button class="btn btn-primary" type="submit">Actualizar</button>
      </template>
    </b-modal>
  </form>
</template>

<script>
import Swal from "sweetalert2";
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useForm } from "vee-validate";
import authService from "@/services/auth.service";
export default {
  setup() {
    const store = useStore();
    const { handleSubmit } = useForm();

    const isOpen = ref(false);
    const currentUser = computed(() => store.state.user);
    const { _id: userId } = currentUser.value;

    const toogleModal = (status) => (isOpen.value = status);

    return {
      isOpen,
      toogleModal,
      updatePassword: handleSubmit((formValues) => {
        authService
          .updatePassword(formValues, userId)
          .then(() => {
            toogleModal(false);
            Swal.fire({
              title: "Contraseña actualizada con éxito",
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
