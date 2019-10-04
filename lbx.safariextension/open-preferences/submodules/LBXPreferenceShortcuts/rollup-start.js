import RollupMain from './main.svelte';

const LBXPreferenceShortcuts = new RollupMain({
	target: document.body,
	props: Object.fromEntries((new URLSearchParams(window.location.search)).entries()),
});

export default LBXPreferenceShortcuts;
