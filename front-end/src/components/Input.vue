<template>
    <div :class="'input_wrapper' + (active?' active':'')">
        <input :value="value" @input="onInput" :name="name" :type="type" required />
        <span class="placeholder">{{placeholder}}</span>
    </div>
</template>

<script>
export default {
	props: {
		value: [String, Number],
		name: String,
		type: { type: String, default: 'text' },
		placeholder: String
	},
	data: () => ({
		active: false
	}),
	methods: {
		onInput () {
			const val = this.$el.querySelector('input').value;
			if (val) this.active = true
			else this.active = false
			this.$emit('change', val);
			this.$emit('input', val);
		}
	},
	watch: {
		value () { setTimeout(() => this.onInput(), 10) }
	}
}
</script>

<style scoped>
.input_wrapper {
    display: flex;
    text-align: left;
    position: relative;
    margin: 8px 4px;
}

.input_wrapper > input {
    width: 100%;
    border: none;
    outline: none;
    font-size: 16px;
    margin-top: 18px;
    background-color: transparent;
    border-bottom: 2px solid #607D8B;
    padding: 5px 10px;
    box-sizing: border-box;
}

.input_wrapper > .placeholder {
    position: absolute;
    top: 23px;
    left: 10px;
    font-size: 16px;
    pointer-events: none;
    transition: 0.3s;
}

.input_wrapper > input:focus ~ .placeholder, .input_wrapper.active > .placeholder {
    top: 0;
    left: 0;
    font-size: 14px;
}
</style>
