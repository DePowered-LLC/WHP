<template>
    <div class="page-container">
        <BC :path="[lang.Authorization, lang.CreateAccount]" />
        <form class="center" @submit="formSend">
            <Sign :type="status.type" :title="lang.CreateAccount" :desk="lang[status.text]" />
            <h2>{{ lang.AccountRegistration(config.title) }}</h2>
            <Input v-model="data.email" name="email" type="email" placeholder="Email" />
            <div style="display: flex">
                <Input v-model="data.first_name" name="first_name" type="text" :placeholder="lang.FirstName" />
                <Input v-model="data.last_name" name="last_name" type="text" :placeholder="lang.LastName" />
            </div>
            <Input v-model="data.pass" type="password" name="pass" :placeholder="lang.Password" />
            <Input v-model="data.passr" type="password" name="passr" :placeholder="lang.RepeatPassword" />
            <button :disabled="working" type="submit" class="btn btn-success">{{ lang.CreateAccount }}</button>
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
		data: {}
	}),
	methods: {
		async formSend (e) {
			this.status = {
				type: 'hidden',
				text: ''
			};
			this.working = true;
			e.preventDefault();

			if (this.data.pass !== this.data.passr) {
				this.status = {
					type: 'warning',
					text: 'PasswordsDontMatch'
				};
			} else if (this.data.pass.length < 8 || this.data.pass.length > 32) {
				this.status = {
					type: 'warning',
					text: 'PasswordsLength'
				};
			} else {
				let result = await API.auth.register(this.data);
				switch (result.msg) {
				case 'passwords_doesnt_match':
					this.status = {
						type: 'warning',
						text: 'PasswordsDontMatch'
					};
					break;
				case 'password_length':
					this.status = {
						type: 'warning',
						text: 'PasswordsLength'
					};
					break;
				case 'email_taken':
					this.status = {
						type: 'warning',
						text: 'EmailTaken'
					};
					break;
				case 'success':
					this.status = {
						type: 'success',
						text: 'RegisterSuccess'
					};

					sessionStorage.setItem('register', this.data.email);
					setTimeout(() => this.$router.push('/auth/login'), 1000);
					break;
				default:
					console.error(result);
					this.status = { type: 'error', text: 'ServerError' };
					break;
				}
			}
			this.working = false
		}
	}
}
</script>
