import Swal from "sweetalert2";
import { ref, computed } from "vue";
import { useStore } from "vuex";
import authService from "@/services/auth.service";

const useAvatar = () => {
  const store = useStore();
  const showModal = ref(false);
  const file = ref(null);
  const currentUser = computed(() => store.state.user);
  const { _id: userId } = currentUser.value;

  return {
    currentUser,
    showModal,
    onFileChange: (e) => {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      file.value = files[0];
    },
    updateAvatar: () => {
      let formData = new FormData();
      formData.append("avatar", file.value);
      authService
        .updateAvatar(formData, userId)
        .then(({ data }) => {
          localStorage.setItem("user", JSON.stringify(data.user));
          store.commit("setUser", data.user);
          Swal.fire({
            title: "Avatar actualizado con éxito",
            icon: "success",
            showConfirmButton: false,
            position: "bottom-end",
            timer: 1200,
            toast: true,
          });
          showModal.value = false;
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: `Error`,
            text: error.response.data.error,
          });
        });
    },
  };
};

export default useAvatar;
