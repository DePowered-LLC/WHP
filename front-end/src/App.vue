<template>
	<div id="app">
		<div id="loader" :class="$store.getters.loading ? '' : 'hidden'"></div>
		<Header :config="config" />
		<div id="wrapper">
			<transition name="router-anim">
				<router-view v-if="$store.getters.drawRouter" :config="config" />
				<E403 v-else />
			</transition>
		</div>
	</div>
</template>

<script>
import Header from '@/components/Header.vue'
import config from '@/config'
import E403 from '@/views/E403.vue'

export default {
	components: { Header, E403 },
	data: () => ({ config })
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

:-webkit-scrollbar {
	width: 3px;
	height: 3px;
	background-color: rgba(0, 0, 0, 0.1);
}
::-webkit-scrollbar:hover { background-color: rgba(0, 0, 0, 0.15); }
::-webkit-scrollbar-thumb { background-color: rgba(0, 0, 0, 0.25); }
::-webkit-scrollbar-thumb:hover { background-color: rgba(0, 0, 0, 0.4); }

h1, h2, h3, h4, h5, h6 { color: #333;}
#wrapper {
	position: relative;
	display: flex;
	margin: 2.5vh 5vw;
}

#wrapper > div {
	position: absolute;
	left: 0;
	right: 0;
	background-color: #f4f4f4;
	transition: 0.7s;
}

.router-anim-enter {
	opacity: 0.2;
	transform: translateX(150px);
}

.router-anim-leave-to {
	transform: translateX(-100px);
	opacity: 0;
}

button[type="submit"] { width: calc(100% - 8px); }
button[disabled] {
	filter: grayscale(1);
	cursor: not-allowed;
}

.btn {
	position: relative;
	padding: 7px;
	background: #607D8B;
	color: #fff;
	text-decoration: none;
	border-radius: 3px;
	box-shadow: 1px 2px 13px 0px rgba(50, 50, 50, 0.45);
	margin: 4px;
	border: none;
	cursor: pointer;
	font-size: 16px;
	padding: 8px 16px;
	outline: none;
	transition: 0.5s;
}
.btn:hover { background: #6d8d9c; }

.btn:before {
	content: '';
	position: absolute;
	left: 0;
	right: 0;
	width: 0;
	margin: auto;
	bottom: -5px;
	border-left: 8px solid transparent;
	border-right: 8px solid transparent;
	border-bottom: 8px solid #fff;
	filter: drop-shadow(rgba(0, 0, 0, 0.75) 0 0 2px);
	pointer-events: none;
	opacity: 0;
	transition: 0.3s;
}
.btn:focus:before { opacity: 1; bottom: -2px; }

.btn.btn-danger { background: #E91E63; }
.btn.btn-danger:hover { background-color: #c2185b; }

.btn.btn-warning { background: #ff9800; }
.btn.btn-warning:hover { background-color: #f57c00; }

.btn.btn-success { background-color: #009688; }
.btn.btn-success:hover { background-color: #00796B; }

.btn.btn-info { background-color: #00bcd4; }
.btn.btn-info:hover { background-color: #0097a7; }

pre {
	font-family: monospace;
	white-space: pre;
	margin: 10px 0;
	background-color: rgba(0, 0, 0, 0.05);
	border-radius: 3px;
	text-align: left;
	padding: 5px 10px;
}

form {
	width: 380px;
	margin: auto;
}

#loader {
	display: flex;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	justify-content: center;
	align-items: center;
	background-color: #f4f4f4;
	transition: 0.3s;
	z-index: 999999;
}

#loader.hidden {
	bottom: 100%;
	opacity: 0;
	pointer-events: none;
}

#loader:before {
	content: '';
	width: 30vh;
	height: 30vh;
	border: 0.5vh solid rgba(0, 0, 0, 0.3);
	border-radius: 100%;
	clip-path: polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%, 0% 0%);
	animation: loading 5s linear  infinite, rotate 0.7s linear infinite;
}

@keyframes loading {
	0% { clip-path: polygon(90% 100%, 100% 100%, 100% 0%, 100% 0%, 100% 50%); }
	60% { clip-path: polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%, 5% 50%); }
	80% { clip-path: polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%, 0% 0%); }
	100% { clip-path: polygon(90% 100%, 100% 100%, 100% 0%, 100% 0%, 100% 50%); }
}

@keyframes rotate {
	0% { transform: rotate(0deg); }
	100% { transform: rotate(360deg); }
}

.center {
	display: block;
	text-align: center;
}
</style>
