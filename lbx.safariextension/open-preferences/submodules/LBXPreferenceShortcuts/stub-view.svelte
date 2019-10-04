<script>
import Module from './main.svelte';

const mod = {
	
	TestLBXPreferenceShortcutsDispatchCreate(inputData) {
		window.TestLBXPreferenceShortcutsDispatchCreate.innerHTML = parseInt(window.TestLBXPreferenceShortcutsDispatchCreate.innerHTML) + 1;
	},
	
	TestLBXPreferenceShortcutsDispatchUpdate(inputData) {
		window.TestLBXPreferenceShortcutsDispatchUpdate.innerHTML = parseInt(window.TestLBXPreferenceShortcutsDispatchUpdate.innerHTML) + 1;
		window.TestLBXPreferenceShortcutsDispatchUpdateValue.innerHTML = JSON.stringify(inputData.detail);
	},
	
};
</script>

<Module
	on:LBXPreferenceShortcutsDispatchCreate={ mod.TestLBXPreferenceShortcutsDispatchCreate }
	on:LBXPreferenceShortcutsDispatchUpdate={ mod.TestLBXPreferenceShortcutsDispatchUpdate }
	{...Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		return [e[0], JSON.parse(e[1])];
	})) }
/>

<p>
	<strong>LBXPreferenceShortcutsDispatchCreate</strong>
	<span id="TestLBXPreferenceShortcutsDispatchCreate">0</span>
</p>

<p>
	<strong>LBXPreferenceShortcutsDispatchUpdate</strong>
	<span id="TestLBXPreferenceShortcutsDispatchUpdate">0</span>
	<span id="TestLBXPreferenceShortcutsDispatchUpdateValue">undefined</span>
</p>
