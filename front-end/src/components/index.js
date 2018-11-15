import Vue from 'vue'

[
	'BC',
	'Dropdown',
	'Header',
	'Icon',
	'Input',
	'Sign',
	'ToolPanel',
	'ToolPanelItem'
].forEach(component => {
	Vue.component(component, require(`./${component}.vue`).default);
});

Vue.$globalTest = 123;
