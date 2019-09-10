const mod = {

	// SETUP

	SetupEverything() {
		const app = new Main({
			target: document.body,
			props: {
				LBXPopoverInitializingPublicKey: 'alfa'
			},
		});
	},

	// LIFECYCLE

	LifecyclePageWillLoad () {
		mod.SetupEverything();
	},

};

window.LBXPopoverBehaviour = mod;
