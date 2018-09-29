<template>
    <p class="bc">
        <router-link to="/" class="part">{{config.title}}</router-link>
        <span v-for="(part, key) in path" :key="key" class="part">{{part}}</span>
    </p>
</template>

<script>
import config from '@/config.json'
export default {
	props: ['path'],
	data: () => ({ config })
}
</script>

<style scoped>
.bc {
    display: flex;
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 3px;
    overflow-x: auto;
}

.bc > .part {
    display: flex;
    flex: 1 1 0;
    justify-content: center;
    position: relative;
    color: #636363;
    text-decoration: none;
    padding: 8px 15px;
}

.bc > .part:not(:last-child):after {
    content: '';
    position: absolute;
    top: 6px;
    bottom: 6px;
    right: -2px;
    margin: auto;
    width: 2px;
    background-color: #0000001f;
    transform: skewX(-30deg);
}
</style>
