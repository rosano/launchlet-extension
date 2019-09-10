const mod = {

	// SETUP

	SetupEverything() {
		const app = new Main({
			target: document.body,
			props: Object.fromEntries((new URLSearchParams(window.location.search)).entries()),
		});
	},

	// LIFECYCLE

	LifecyclePageWillLoad () {
		mod.SetupEverything();
	},

};

window.LBXPopoverBehaviour = mod;
