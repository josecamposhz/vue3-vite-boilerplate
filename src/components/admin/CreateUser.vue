<template>
	<div>
		<button @click="showModal = true" class="btn btn-primary mb-4">
			Crear Usuario
		</button>

		<form role="registerForm" @submit.prevent="saveUser">
			<b-modal v-model="showModal" title="Crear Usuario" centered hide-footer>
				<template v-slot:body>
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
				</template>
				<template v-slot:footer>
					<button class="btn btn-primary mx-1" type="reset">Limpiar</button>
					<button class="btn btn-light mx-1" variant="primary" type="submit">
						Crear Cuenta
					</button>
				</template>
			</b-modal>
		</form>
	</div>
</template>

<script>
import Swal from 'sweetalert2';
import { ref } from 'vue';
import { useForm } from 'vee-validate';
import userService from '@/services/user.service';
export default {
	setup(_, { emit }) {
		const showModal = ref(false);
		const { handleSubmit } = useForm();
		return {
			showModal,
			saveUser: handleSubmit((formValues) => {
				showModal.value = false;
				Swal.fire({
					title: 'Procesando solicitud',
					icon: 'info',
					showConfirmButton: false,
					position: 'bottom-end',
					timer: 1200,
					toast: true,
				});
				userService
					.save(formValues)
					.then(({ data }) => {
						emit('loadUsers');
						Swal.fire({
							title: data,
							icon: 'success',
							showConfirmButton: false,
							position: 'bottom-end',
							timer: 1200,
							toast: true,
						});
					})
					.catch((error) => {
						Swal.fire({
							icon: 'error',
							title: `Error`,
							text: error.response.data.error,
						});
					});
			}),
		};
	},
};
</script>
