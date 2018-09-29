<template>
    <div class="page-container center">
        <BC :path="['Страница не найдена']" />
        <h1>404</h1>
        <h2>Страница не найдена</h2>
        <a onclick="history.back()" class="btn">Назад</a>
        <router-link to="/" class="btn btn-success">Главная</router-link>
    </div>
</template>

<script>
import BC from '@/components/BC.vue'
export default {
	components: { BC }
}
</script>
