<template>
	<router-link v-if="link" :to="link" :class="'item item-'+color">
		<Icon :name="icon" />
		{{ name }}
	</router-link>
	<div @click="$emit('click', $event)" v-else :class="'item item-'+color" tabindex="0">
		<Icon :name="icon" />
		{{ name }}
	</div>
</template>

<script>
export default {
	props: {
		name: String,
		icon: String,
		link: String,
		color: {
			type: String,
			default: 'green'
		}
	}
}
</script>

<style scoped>
.item {
	display: inline-block;
	flex: 1 1 0;
    border: 1px solid #5f5f5f;
    width: 80px;
    height: 80px;
	padding: 8px 5px;
	margin: 5px;
	text-align: center;
	text-decoration: none;
	color: #000;
    box-sizing: border-box;
    cursor: pointer;
    transition: 0.3s;
}

.item:focus, .item:hover {
	background-color: #5f5f5f;
	color: #fff !important;
    outline: none;
}

.item > svg {
    display: block;
    margin: auto;
    height: 40px;
    width: 40px;
    margin-bottom: 5px;
}

.item.item-green { border-color: #009688; color: #009688; }
.item.item-green:hover, .item-green:focus { background-color: #009688; }

.item.item-red { border-color: #E91E63; color: #E91E63; }
.item.item-red:hover, .item-red:focus { background-color: #E91E63; }
</style>
