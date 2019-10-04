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
	{...Object.fromEntries((new window.URLSearchParams(window.location.search)).entries())}
/>

<p>
	<strong>LBXPreferenceShortcutsDispatchCreate</strong>
	<span id="TestLBXPreferenceShortcutsDispatchCreate">0</span>
</p>
