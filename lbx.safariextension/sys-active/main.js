'use strict';

const mod = {

	// VALUE

	_ValueMessageSource: undefined,
	ValueMessageSource (inputData) {
	  if (typeof inputData === 'undefined') {
	    return mod._ValueMessageSource;
	  };

	  mod._ValueMessageSource = inputData
	},

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

		mod.ValueMessageSource(event.source);
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
