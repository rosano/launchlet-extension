<script>
import Module from './main.svelte';

const mod = {
	
	TestLBXPreferenceShortcutsDispatchCreate(inputData) {
		window.TestLBXPreferenceShortcutsDispatchCreate.innerHTML = parseInt(window.TestLBXPreferenceShortcutsDispatchCreate.innerHTML) + 1;
	},
	
};
</script>

<Module
	on:LBXPreferenceShortcutsDispatchCreate={ mod.TestLBXPreferenceShortcutsDispatchCreate }
	{...Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		return [e[0], JSON.parse(e[1])];
	})) }
/>

<p>
	<strong>LBXPreferenceShortcutsDispatchCreate</strong>
	<span id="TestLBXPreferenceShortcutsDispatchCreate">0</span>
</p>
