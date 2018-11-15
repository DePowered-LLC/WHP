<template>
    <div class="page-container center">
        <BC :path="['Ошибка доступа']" />
        <h1>403</h1>
        <h2>Недостоточно прав для просмотра страницы</h2>
        <a onclick="history.back()" class="btn">Назад</a>
        <router-link to="/" class="btn btn-success">Главная</router-link>
        <router-link to="/auth/login" class="btn btn-info">Вход</router-link>
    </div>
</template>
