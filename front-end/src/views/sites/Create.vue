<template>
	<div class="page-container">
		<BC :path="[lang.Sites, lang.Create]" />
		<form class="center" @submit="formSend">
			<Sign :type="status.type" :title="lang.SiteCreation" :desk="lang[status.text]" />
			<h2>{{ lang.Create }} {{ lang.Site.toLowerCase() }}</h2>
			<Input v-model="domain" name="domain" :placeholder="lang.Domain" />
			<button :disabled="working" type="submit" class="btn btn-success">{{ lang.Create }}</button>
		</form>
	</div>
</template>

<script>
import API from '@/API'
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
							text: 'CopyTemplateError'
						}
						break;
					case 'enable_error':
						this.status = {
							type: 'error',
							text: 'SiteEnableError'
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
					case 'domain_taken':
						this.status = {
							type: 'warning',
							text: 'DomainTaken'
						};
						this.working = false;
						break;
					case 'creating_config':
						this.status = {
							type: 'info',
							text: 'CreatingConfigs'
						}
						break;
					case 'creating_directories':
						this.status = {
							type: 'info',
							text: 'CreatingDirectories'
						}
						break;
					case 'connected':
						this.status = {
							type: 'info',
							text: 'Connected'
						};
						break;
					case 'success':
						this.status = {
							type: 'success',
							text: 'SiteCreateSuccess'
						};
						setTimeout(async () => {
							this.$router.push('/sites/' + this.domain);
						}, 700);
						this.working = false;
						break;
					default:
						console.error(res);
						this.status = { type: 'error', text: 'ServerError' };
						this.working = false;
						break;
					}
				}
			});
		}
	}
}
</script>
