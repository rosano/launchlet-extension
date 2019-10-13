<script>
import Module from './main.svelte';

const mod = {

	TestLBXSettingShortcutsDispatchCreate(inputData) {
		window.TestLBXSettingShortcutsDispatchCreate.innerHTML = parseInt(window.TestLBXSettingShortcutsDispatchCreate.innerHTML) + 1;
	},

	TestLBXSettingShortcutsDispatchUpdate(inputData) {
		window.TestLBXSettingShortcutsDispatchUpdate.innerHTML = parseInt(window.TestLBXSettingShortcutsDispatchUpdate.innerHTML) + 1;
		window.TestLBXSettingShortcutsDispatchUpdateValue.innerHTML = JSON.stringify(inputData.detail);
	},

};
</script>

<Module
	on:LBXSettingShortcutsDispatchCreate={ mod.TestLBXSettingShortcutsDispatchCreate }
	on:LBXSettingShortcutsDispatchUpdate={ mod.TestLBXSettingShortcutsDispatchUpdate }
	{...Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		return [e[0], JSON.parse(e[1])];
	})) }
/>

<p>
	<strong>LBXSettingShortcutsDispatchCreate</strong>
	<span id="TestLBXSettingShortcutsDispatchCreate">0</span>
</p>

<p>
	<strong>LBXSettingShortcutsDispatchUpdate</strong>
	<span id="TestLBXSettingShortcutsDispatchUpdate">0</span>
	<span id="TestLBXSettingShortcutsDispatchUpdateValue">undefined</span>
</p>
