<template>
	<div class="container">
		<h2 class="my-4">Usuarios</h2>
		<create-user @loadUsers="getUsers" />
		<b-table class="table-hover" :items="users" :fields="fields">
			<template v-slot:actions="{ item }">
				<button
					class="btn btn-danger btn-sm"
					@click="confirmDeleteUser(item._id)"
				>
					Eliminar
				</button>
			</template>
		</b-table>
	</div>
</template>

<script>
import Swal from "sweetalert2";
import { ref, onMounted } from 'vue';
import userService from '@/services/user.service';
import CreateUser from '@/components/admin/CreateUser.vue';
export default {
	components: { CreateUser },
	setup() {
		const users = ref([]);
		const fields = ref([
			{ key: 'firstName', label: 'Nombres' },
			{ key: 'lastName', label: 'Apellidos' },
			{ key: 'email', label: 'Correo electrónico' },
			{ key: 'role', label: 'Rol' },
			{ key: 'actions', label: 'Actions' },
		]);

		const getUsers = () => {
			userService.all().then(({ data }) => {
				users.value = data;
			});
		};

    const deleteUser = (id) => {
      userService.delete(id).then(
        () => {
          getUsers();
          Swal.fire(
            "Usuario eliminado",
            "El usuario fue eliminado con éxito",
            "success"
          );
        },
        (error) => {
          Swal.fire("Error", error.response.data.error, "error");
        }
      );
    };

		onMounted(() => getUsers());
		return {
			users,
			fields,
			getUsers,
			confirmDeleteUser: (id) => {
				Swal.fire({
					title: '¿Estás seguro?',
					text: 'Tu no puedes revertir esta acción',
					icon: 'warning',
					showCancelButton: true,
					focusCancel: true,
					cancelButtonColor: '#d33',
					confirmButtonText: 'Cancelar',
					cancelButtonText: 'Eliminar',
				}).then((result) => {
					if (!result.isConfirmed) {
						deleteUser(id);
					}
				});
			},
		};
	},
};
</script>
