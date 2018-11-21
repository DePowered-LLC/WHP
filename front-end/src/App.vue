<template>
	<div id="app">
		<div id="loader" :class="$store.getters.loading ? '' : 'hidden'"></div>
		<Header />
		<div id="wrapper">
			<transition name="router-anim">
				<router-view v-if="$store.getters.drawRouter" />
				<E403 v-else />
			</transition>
		</div>
		<IconSprite />
	</div>
</template>

<script>
import E403 from '@/views/E403.vue'
import IconSprite from '@/assets/icons/IconSprite.vue'

import '@/styles/buttons.css'
import '@/styles/formatting.css'
import '@/styles/icons.css'
import '@/styles/loader.css'
import '@/styles/tables.css'
export default {
	components: { E403, IconSprite },
	created () { this.$store.commit('checkSession'); }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Ubuntu');
* { font-family: 'Ubuntu', sans-serif; }
body {
	background: #f4f4f4;
	margin: 0;
	padding: 0;
}

::-webkit-scrollbar {
	width: 4px;
	height: 4px;
	background-color: rgba(0, 0, 0, 0.1);
}
::-webkit-scrollbar:hover { background-color: rgba(0, 0, 0, 0.15); }
::-webkit-scrollbar-thumb { background-color: rgba(0, 0, 0, 0.25); }
::-webkit-scrollbar-thumb:hover { background-color: rgba(0, 0, 0, 0.4); }

.router-anim-enter {
	opacity: 0.2;
	transform: translateX(150px);
}

.router-anim-leave, .router-anim-leave-to {
	position: absolute;
	left: 0;
	right: 0;
}
.router-anim-leave-to {
	transform: translateX(-100px);
	opacity: 0;
}

@keyframes rotate {
	0% { transform: rotate(0deg); }
	100% { transform: rotate(360deg); }
}
</style>
