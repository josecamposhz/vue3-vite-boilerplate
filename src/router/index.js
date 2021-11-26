import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import('@/views/Home.vue'),
	},
	{
		path: '/auth/login',
		name: 'Login',
		component: () => import('@/views/auth/Login.vue'),
	},
	{
		path: '/auth/register',
		name: 'Register',
		component: () => import('@/views/auth/Register.vue'),
	},
	{
		path: '/auth/verify-email',
		name: 'VerifyEmail',
		component: () => import('@/views/auth/VerifyEmail.vue'),
	},
	{
		path: '/auth/forgot-password',
		name: 'ForgotPassword',
		component: () => import('@/views/auth/ForgotPassword.vue'),
	},
	{
		path: '/auth/reset-password',
		name: 'ResetPassword',
		component: () => import('@/views/auth/ResetPassword.vue'),
	},
	{
		path: '/profile',
		name: 'Profile',
		meta: { requiresAuth: true },
		component: () => import('@/views/user/Profile.vue'),
	},
	{
		path: '/admin',
		name: 'Admin',
		component: () => import('@/layouts/AdminLayout.vue'),
		meta: { requiresAuth: true },
		beforeEnter: (to, from, next) => {
			if (store.getters.isAdmin) next();
			else next('/profile');
		},
		children: [
			{
				path: 'users',
				name: 'Users',
				component: () => import('@/views/admin/Users.vue'),
			},
		],
	},
	{
		path: '/:pathMatch(.*)*',
		redirect: '/',
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

// agregamos el antes de la exportación de router
router.beforeEach((to, from, next) => {
	// La ruta requiere autentificación
	if (to.matched.some((record) => record.meta.requiresAuth)) {
		// Continuamos con la navegación si el usuario esta autentificado
		if (store.getters.isAuthenticated) next();
		// En caso contrario lo enviamos al Login
		else next({ name: 'Login' });
	} else {
		// Evitamos que un usuario logeado ingrese a alguna vista con el path auth
		if (store.getters.isAuthenticated && to.path.includes('auth')) {
			// En caso de ser así enviamos al usuario al Home
			next({ name: 'Home' });
		} else next();
	}
});

export default router;
