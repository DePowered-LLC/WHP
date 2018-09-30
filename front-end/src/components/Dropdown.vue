<template>
    <div :class="'dropdown' + (active?' active':'')">
        <div @keypress.enter="toggle" @click="toggle" tabindex="0" class="heading"><slot name="heading" /></div>
        <div class="body"><slot name="body" /></div>
    </div>
</template>

<script>
export default {
	data: () => ({
		active: false
	}),
	methods: {
		toggle () { this.active = !this.active },
		away (e) { !e.target.closest('.dropdown') && (this.active = false) }
	},
	created () {
		document.removeEventListener('click', this.away);
		document.addEventListener('click', this.away);
	}
}
</script>

<style scoped>
.dropdown {
    position: relative;
    display: inline-flex;
    margin: 0 5px;
    color: #546E7A;
}

.dropdown > .heading {
    position: relative;
    font-size: 16px;
    padding: 4px 15px;
    padding-right: 20px;
    border: 1px solid transparent;
    cursor: pointer;
    transition: 0.3s;
}

.dropdown > .heading:hover, .dropdown > .heading:focus {
    background-color: rgba(0, 0, 0, 0.03);
    border-color: rgba(0, 0, 0, 0.05);
    border-radius: 3px;
    outline: none;
}

.dropdown.active > .heading {
    background-color: transparent;
    border-color: rgba(0, 0, 0, 0.35);
    border-radius: 3px 3px 0 0;
}

.dropdown > .heading:after {
    content: '';
    position: absolute;
    right: 7px;
    top: 0;
    bottom: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid #546E7A;
    margin: auto;
    transition: 0.3s;
}
.dropdown.active > .heading:after { transform: rotate(-180deg); }

.dropdown > .body {
    position: absolute;
    top: 85%;
    left: 0;
    right: 0;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.35);
    border-top: none;
    border-radius: 0 0 3px 3px;
    box-shadow: rgba(0, 0, 0, 0.25) 1px 2px 10px 0;
    opacity: 0;
    pointer-events: none;
    z-index: 1;
    transition: 0.3s;
}

.dropdown.active > .body {
    top: 100%;
    opacity: 1;
    pointer-events: all;
}

.dropdown > .body > * {
    display: flex;
    width: 100%;
    margin: 0;
    font-size: 13px;
    padding: 5px 10px;
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.35);
    background-color: transparent;
    cursor: pointer;
    transition: 0.3s;
}
.dropdown > .body > *:last-child { border-bottom: none; }

.dropdown > .body > *:hover, .dropdown > .body > *:focus {
    background-color: rgba(0, 0, 0, 0.05);
    outline: none;
}
</style>
