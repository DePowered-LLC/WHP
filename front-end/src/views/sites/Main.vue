<template>
	<div class="page-container center">
		<BC :path="[lang.Sites, lang.All]" />
		<h2>{{ lang.All }} {{ lang.Sites.toLowerCase() }}</h2>
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
				<th>{{ lang.Domain }}</th>
				<th>{{ lang.Status }}</th>
			</thead>
			<tbody>
				<tr v-for="(site, key) in sites" :key="key"
					@click="select(key)"
					:class="site.selected ? 'selected' : ''">
					<td><input type="checkbox" :checked="site.selected" /></td>
					<td>{{ site.domain }}</td>
					<td>{{ lang[site.status.firstUpper()] }}</td>
				</tr>
				<tr v-if="sites.length === 0">
					<td colspan="3">{{ lang.NoSites }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import API from '@/API'
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
	async created () {
		const sites = await API.sites.all();
		console.log(sites);
		sites.msg.forEach(data => this.sites.push(new SiteModel(data)));
	},
	methods: {
		select (siteKey, e) {
			if (siteKey < 0) {
				Object.keys(this.sites).forEach(siteKey => {
					this.sites[siteKey].selected = e.target.checked;
				});
			} else {
				this.sites[siteKey].selected = !this.sites[siteKey].selected;
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
