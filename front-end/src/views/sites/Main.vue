<template>
	<div class="page-container center">
		<BC :path="['Сайты', 'Все']" />
		<h2>Ваши сайты</h2>
		<ToolPanel>
			<ToolPanelItem link="/sites/create" name="Создать" icon="plus" />
			<ToolPanelItem name="FTP" icon="directory" />
			<ToolPanelItem name="Базы данных" icon="database" />
			<ToolPanelItem name="DNS" icon="globe" />
			<ToolPanelItem name="Поддомены" icon="network" />
			<ToolPanelItem @click="remove" name="Удалить" icon="trash" color="red" />
		</ToolPanel>
		<table>
			<thead>
				<th style="width: 30px;">
					<input type="checkbox" @change="select(-1, $event)" />
				</th>
				<th>Доменное имя</th>
				<th>Статус</th>
			</thead>
			<tbody>
				<tr v-for="(site, key) in sites" :key="key"
					@click="select(key)"
					:class="site.selected ? 'selected' : ''">
					<td><input type="checkbox" :checked="site.selected" /></td>
					<td>{{ site.domain }}</td>
					<td>{{ getStatus(site.status) }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
class SiteModel {
	domain = ''
	selected = false
	status = 'unknown'

	constructor (siteData) { Object.assign(this, siteData); }
}

export default {
	auth: true,
	data: () => ({
		sites: []
	}),
	created () {
		const chars = '1234567890qwertyuiopasdfghjklzxcvbnms';
		for (let i = 0; i < Math.random() * 10; i++) {
			let domain = '';
			while (domain.length < Math.random() * 12) domain += chars[Math.round(Math.random() * chars.length)];
			this.sites.push(new SiteModel({ domain }));
		}
	},
	methods: {
		select (siteKey, e) {
			console.log(this.config);
			if (siteKey < 0) {
				Object.keys(this.sites).forEach(siteKey => {
					this.sites[siteKey].selected = e.target.checked;
				});
			} else {
				this.sites[siteKey].selected = !this.sites[siteKey].selected;
			}
		},

		getStatus (input) {
			switch (input) {
			case 'unknown': return 'Неизвестно';
			case 'configurated': return 'Настроен';
			case 'disabled': return 'Выключен';
			case 'enabled': return 'Включен';
			}
		},

		remove () {
			let removeOffset = 0;
			// Read copy of array
			[...this.sites].forEach((site, siteKey) => {
				if (!site.selected) return;
				const confirmation = () => {
					const answer = prompt(`Вы действительно хотите удалить '${site.domain}'?\nЕсли да, то напишите доменное имя ниже, иначе оставьте поле пустым.`);
					if (answer === site.domain) {
						// Remove site in original array with offset
						this.sites.splice(siteKey - removeOffset, 1);
						removeOffset++;
					} else if (answer && answer !== '') {
						confirmation();
					}
				};
				confirmation();
			});
		}
	}
}
</script>
