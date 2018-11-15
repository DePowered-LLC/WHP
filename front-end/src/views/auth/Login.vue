<template>
	<div class="page-container">
		<BC :path="['Авторизация', 'Вход']" />
		<form class="center" @submit="formSend">
			<Sign :type="status.type" title="Вход" :desk="status.text" />
            <h2>Вход в аккаунт {{config.title}}</h2>
			<Input v-model="data.email" name="email" type="email" placeholder="Введите email" />
			<Input v-model="data.pass" name="pass" type="password" placeholder="Введите пароль" />
			<button :disabled="working" type="submit" class="btn btn-success">Войти</button>
		</form>
	</div>
</template>

<script>
import API from '@/API'
const defaultStatus = { type: 'error', text: 'Сбой сервера, попробуйте позже' }
export default {
	props: ['config'],
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
					text: 'Теперь Вы можете войти в свой аккаунт'
				};
			});
		}
	},
	methods: {
		async formSend (e) {
			this.status = {
				type: 'hidden',
				text: ''
			}
			this.working = true
			e.preventDefault()

			let result = await API.auth.login(this.data)
			switch (result.msg) {
			case 'no_account':
				this.status = {
					type: 'error',
					text: 'Аккаунт не найден'
				}
				break
			case 'wrong_password':
				this.status = {
					type: 'warning',
					text: 'Пароль не верный'
				}
				break
			case 'success':
				this.status = {
					type: 'success',
					text: 'Вы успешно вошли в свой аккаунт'
				}
				setTimeout(async () => {
					await this.$store.commit('checkSession')
					this.$router.push('/')
				}, 700)
				break
			default:
				console.error(result)
				this.status = defaultStatus
				break
			}
			this.working = false
		}
	}
}
</script>
