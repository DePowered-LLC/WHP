<template>
    <div class="page-container">
        <BC :path="['Авторизация', 'Регистрация']" />
        <form class="center" @submit="formSend">
            <Sign :type="status.type" title="Регистрация" :desk="status.text" />
            <h2>Регистрация аккаунта {{config.title}}</h2>
            <Input v-model="data.email" name="email" type="email" placeholder="Введите email" />
            <div style="display: flex">
                <Input v-model="data.first_name" name="first_name" type="text" placeholder="Введите имя" />
                <Input v-model="data.last_name" name="last_name" type="text" placeholder="Введите фамилию" />
            </div>
            <Input v-model="data.pass" type="password" name="pass" placeholder="Введите пароль" />
            <Input v-model="data.passr" type="password" name="passr" placeholder="Повторите пароль" />
            <button :disabled="working" type="submit" class="btn btn-success">Зарегистрироваться</button>
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
		data: {}
	}),
	methods: {
		async formSend (e) {
			this.status = {
				type: 'hidden',
				text: ''
			}
			this.working = true
			e.preventDefault()

			if (this.data.pass !== this.data.passr) {
				this.status = {
					type: 'warning',
					text: 'Пароли не совпадают'
				}
			} else if (this.data.pass.length < 8 || this.data.pass.length > 32) {
				this.status = {
					type: 'warning',
					text: 'Пароль должен содержать от 8 до 32 символов'
				}
			} else {
				let result = await API.auth.register(this.data)
				switch (result.msg) {
				case 'passwords_doesnt_match':
					this.status = {
						type: 'warning',
						text: 'Пароли не совпадают'
					}
					break
				case 'password_length':
					this.status = {
						type: 'warning',
						text: 'Пароль должен содержать от 8 до 32 символов'
					}
					break
				case 'email_taken':
					this.status = {
						type: 'warning',
						text: 'Данный email уже занят'
					}
					break
				case 'success':
					this.status = {
						type: 'success',
						text: 'Аккаунт был успешно зарегистрирован'
					}
					sessionStorage.setItem('register', this.data.email)
					setTimeout(() => this.$router.push('/auth/login'), 1000)
					break
				default:
					console.error(result)
					this.status = defaultStatus
					break
				}
			}
			this.working = false
		}
	}
}
</script>
