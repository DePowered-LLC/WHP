<template>
    <div :class="'sign sign-'+type">
        <span class="helper"></span>
        <span class="title">{{title}}</span>
        <div class="desk">{{desk || ''}}</div>
    </div>
</template>

<script>
export default {
	props: ['type', 'title', 'desk']
}
</script>

<style scoped>
.sign {
    position: relative;
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 3px;
    text-align: left;
    padding: 5px 10px;
    padding-left: 65px;
    color: #fff;
}

.sign > .title {
    display: block;
    font-size: 22px;
}

.sign > .desk {
    font-size: 16px;
    white-space: pre-line;
}

.sign > .helper {
    position: absolute;
    display: flex;
    top: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.1);
    width: 55px;
    justify-content: center;
}

.sign-success { background-color: #009688; }
.sign-success > .helper:before {
    content: '';
    position: absolute;
    top: -8px;
    bottom: 0;
    margin: auto;
    width: 10px;
    height: 20px;
    border: 0 solid #fff;
    border-width: 0 2px 2px 0;
    transform: rotateZ(45deg);
}

.sign-error { background-color: #E91E63; }
.sign-error > .helper:before, .sign-error > .helper:after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 2px;
    height: 26px;
    background-color: #fff;
    transform: rotateZ(45deg);
}
.sign-error > .helper:before { transform: rotateZ(-45deg); }

.sign-warning { background-color: #ff9800; }
.sign-warning > .helper:before, .sign-warning > .helper:after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 8px;
    margin: auto;
    width: 3px;
    height: 26px;
    background-color: #fff;
    border-radius: 3px;
}
.sign-warning > .helper:after {
    top: 28px;
    bottom: 0;
    width: 3px;
    height: 3px;
}

.sign-info { background-color: #00bcd4; }
.sign-info > .helper:before, .sign-info > .helper:after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 20px;
    margin: auto;
    width: 3px;
    height: 3px;
    background-color: #fff;
    border-radius: 3px;
}
.sign-info > .helper:after {
    top: 8px;
    bottom: 0;
    width: 3px;
    height: 17px;
    border-radius: 0;
}

.sign-hidden { display: none; }
</style>
