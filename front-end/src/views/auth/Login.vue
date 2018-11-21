<template>
	<div class="page-container">
		<BC :path="[lang.Authorization, lang.LogIn]" />
		<form class="center" @submit="formSend">
			<Sign :type="status.type" :title="lang.LogIn" :desk="lang[status.text]" />
            <h2>{{ lang.AccountLogIn(config.title) }}</h2>
			<Input v-model="data.email" name="email" type="email" placeholder="Email" />
			<Input v-model="data.pass" name="pass" type="password" :placeholder="lang.Password" />
			<button :disabled="working" type="submit" class="btn btn-success">{{ lang.LogIn }}</button>
		</form>
	</div>
</template>

<script>
import API from '@/API'
export default {
	data: () => ({
		working: false,
		status: {
			type: 'hidden',
			text: ''
		},
		data: {
			email: '',
			pass: ''
		}
	}),
	created () {
		if (sessionStorage.getItem('register')) {
			this.$nextTick(() => {
				this.data.email = sessionStorage.getItem('register');
				sessionStorage.removeItem('register');
				this.status = {
					type: 'info',
					text: 'AccountCreateSuccess'
				};
			});
		}
	},
	methods: {
		async formSend (e) {
			this.status = {
				type: 'hidden',
				text: ''
			};
			this.working = true;
			e.preventDefault();

			let result = await API.auth.login(this.data);
			switch (result.msg) {
			case 'no_account':
				this.status = {
					type: 'error',
					text: 'AccountNotFound'
				};
				break;
			case 'wrong_password':
				this.status = {
					type: 'warning',
					text: 'WrongPassword'
				};
				break;
			case 'success':
				this.status = {
					type: 'success',
					text: 'LogInSuccess'
				};

				setTimeout(async () => {
					await this.$store.commit('checkSession');
					this.$router.push('/');
				}, 700);
				break;
			default:
				console.error(result);
				this.status = { type: 'error', text: 'ServerError' };
				break;
			}
			this.working = false;
		}
	}
}
</script>
