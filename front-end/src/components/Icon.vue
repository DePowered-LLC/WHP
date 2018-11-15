<template>
    <svg>
		<use v-bind="{'xlink:href': `#${name}Icon`}"></use>
	</svg>
</template>

<script>
export default {
	props: {
		name: String
	}
}
</script>
