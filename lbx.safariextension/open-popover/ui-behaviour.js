const mod = {

	// DATA

	DataProps() {
		return Object.fromEntries((new URLSearchParams(window.location.search)).entries());
	},

	// SETUP

	SetupEverything() {
		const app = new Main({
			target: document.body,
			props: mod.DataProps(),
		});
	},

	// LIFECYCLE

	LifecyclePageWillLoad () {
		mod.SetupEverything();
	},

};

window.LBXPopoverBehaviour = mod;
