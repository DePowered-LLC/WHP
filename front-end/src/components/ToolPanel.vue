<template>
    <div class="tool-panel">
        <slot />
    </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.tool-panel {
    display: flex;
    margin-bottom: 10px;
}

.tool-panel > :first-child { margin-left: 0; }
.tool-panel > :last-child { margin-right: 0; }
</style>
