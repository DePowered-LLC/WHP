<template>
	<div class="page-container">
		<BC :path="['Сайты', 'Создать новый']" />
		<form class="center" @submit="formSend">
			<Sign :type="status.type" title="Создание сайта" :desk="status.text" />
			<h2>Создать сайт</h2>
			<Input v-model="domain" name="domain" placeholder="Домен" />
			<button :disabled="working" type="submit" class="btn btn-success">Создать</button>
		</form>
	</div>
</template>

<script>
import API from '@/API'
const defaultStatus = { type: 'error', text: 'Сбой сервера, попробуйте позже' }
export default {
	auth: true,
	data: () => ({
		working: false,
		status: {
			type: 'hidden',
			text: ''
		},
		domain: ''
	}),
	methods: {
		async formSend (e) {
			this.status = {
				type: 'hidden',
				text: ''
			};
			this.working = true;
			e.preventDefault();

			API.sites.ws_create({ domain: this.domain }, res => {
				if (res.msg instanceof Array) {
					switch (res.msg[0]) {
					case 'copy_template_error':
						this.status = {
							type: 'warning',
							text: 'Невозможно скопировать шаблон сайта.\nПопытка продолжить создание...'
						}
						break;
					case 'enable_error':
						this.status = {
							type: 'error',
							text: 'Невозможно перезагрузить веб-сервер...'
						}
						this.working = false;
						break;
					default:
						this.working = false;
						break;
					}
					console.error(res.msg);
				} else {
					switch (res.msg) {
					case 'db_error':
						this.status = {
							type: 'error',
							text: 'Ошибка базы данных'
						};
						this.working = false;
						break;
					case 'domain_taken':
						this.status = {
							type: 'warning',
							text: 'Домен занят'
						};
						this.working = false;
						break;
					case 'creating_config':
						this.status = {
							type: 'info',
							text: 'Создание файлов конфигураций...'
						}
						break;
					case 'creating_directories':
						this.status = {
							type: 'info',
							text: 'Создание директорий...'
						}
						break;
					case 'connected':
						this.status = {
							type: 'info',
							text: 'Подключение установлено'
						};
						break;
					case 'success':
						this.status = {
							type: 'success',
							text: 'Сайт был успешно создан'
						};
						setTimeout(async () => {
							this.$router.push('/sites/' + this.domain);
						}, 700);
						this.working = false;
						break;
					default:
						console.error(res);
						this.status = defaultStatus;
						this.working = false;
						break;
					}
				}
			});
		}
	}
}
</script>
