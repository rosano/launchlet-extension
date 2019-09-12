'use strict';

const mod = {

	// MESSAGE

	MessageReceiveFromPage (event) {
		// We only accept messages from ourselves
		if (event.source !== window) {
		  return;
		}

		// We only accept messages from ourselves
		// if (not launchlet.dev) {
		//   return;
		// }
		console.log('stub check event source');
	},

	// SETUP

	SetupEveryting() {
		mod.SetupReceiveMessageFromPage();
	},
	SetupReceiveMessageFromPage() {
		// @MessageReceiveFromPage
		window.addEventListener('message', mod.MessageReceiveFromPage, false);
	},

	// LIFECYCLE

	LifecyclePageDidLoad() {
		mod.SetupEveryting();
	},
};

mod.LifecyclePageDidLoad();
