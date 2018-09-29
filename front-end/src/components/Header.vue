<template>
    <header>
        <router-link to="/" id="logo">{{config.title}}</router-link>
        <div>
            <router-link exact to="/" class="btn-header">Главная</router-link>
            <template v-if="$store.getters.User.isLogged">
                <button @click="$store.commit('logout')" class="btn-header">Выйти</button>
            </template>
            <template v-else>
                <router-link exact to="/auth/login" class="btn-header">Вход</router-link>
                <router-link exact to="/auth/register" class="btn-header">Регистрация</router-link>
            </template>
        </div>
    </header>
</template>

<script>
export default {
	props: ['config']
}
</script>

<style scoped>
header {
    background: #fff;
    padding: 8px 5vw;
    display: flex;
    justify-content: space-between;
    height: 30px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.35);
    box-shadow: rgba(0, 0, 0, 0.15) 0 0 10px 0;
}
header > div { display: flex; }

#logo {
    color: #263238;
    text-decoration: none;
    font-size: 28px;
    line-height: 30px;
}

.btn-header {
    position: relative;
    display: inline-flex;
    margin: 0 5px;
    font-size: 16px;
    text-decoration: none;
    color: #546E7A;
    background-color: rgba(0, 0, 0, 0.01);
    padding: 4px 15px;
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 20px;
    outline: none;
    cursor: pointer;
    transition: 0.3s;
}

.btn-header:hover, .btn-header:focus {
    background-color: #80CBC4;
    color: #fff;
}

.btn-header.active {
    background-color: #26A69A;
    color: #fff;
}

.btn-header:before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    width: 0;
    margin: auto;
    bottom: -5px;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid #fff;
    filter: drop-shadow(rgba(0, 0, 0, 0.35) 0 0 2px);
    pointer-events: none;
    opacity: 0;
    transition: 0.3s;
}
.btn-header:focus:before { opacity: 1; bottom: -2px; }
</style>
