<template>
	<div class="card">
		<div class="card-body text-center">
			<div class="position-relative">
				<img
					:src="currentUser.avatar"
					height="240"
					width="240"
					class="rounded-circle mx-auto"
					:alt="currentUser.firstName"
				/>
				<span
					class="
						rounded-circle
						position-absolute
						translate-middle
						bottom-0
						btn-primary btn
						p-3
					"
					@click="showModal = true"
				>
					<svg
						height="20"
						width="20"
						aria-hidden="true"
						focusable="false"
						data-prefix="fas"
						data-icon="camera"
						class="svg-inline--fa fa-camera fa-w-16"
						role="img"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 512 512"
					>
						<path
							fill="currentColor"
							d="M512 144v288c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48h88l12.3-32.9c7-18.7 24.9-31.1 44.9-31.1h125.5c20 0 37.9 12.4 44.9 31.1L376 96h88c26.5 0 48 21.5 48 48zM376 288c0-66.2-53.8-120-120-120s-120 53.8-120 120 53.8 120 120 120 120-53.8 120-120zm-32 0c0 48.5-39.5 88-88 88s-88-39.5-88-88 39.5-88 88-88 88 39.5 88 88z"
						></path>
					</svg>
				</span>
			</div>

			<h4>{{ currentUser.firstName }} {{ currentUser.lastName }}</h4>
			<div class="d-flex justify-content-center">
				<h6 class="badge rounded-pill bg-primary px-3 py-2">
					{{ currentUser.role }}
				</h6>
			</div>
		</div>
		<b-modal v-model="showModal" title="Editar Avatar">
			<template v-slot:body>
				<input
					class="form-control"
					type="file"
					accept="image/*"
					placeholder="Selecciona una imagen"
					drop-placeholder="Arrastra una imagen aqui..."
					browse-text="Buscar"
					@change="onFileChange"
				/>
			</template>
			<template v-slot:footer>
				<button class="btn btn-primary" @click="updateAvatar">
					Actualizar Avatar
				</button>
			</template>
		</b-modal>
	</div>
</template>

<script>
import useAvatar from '@/composables/useAvatar';
export default {
	setup() {
		const { showModal, currentUser, onFileChange, updateAvatar } = useAvatar();

		return {
			showModal,
			currentUser,
			onFileChange,
			updateAvatar,
		};
	},
};
</script>
