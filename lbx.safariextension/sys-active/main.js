import { LBXPayloadIsValid } from './logic.js'

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
		if (event.source !== window) {
		  return;
		}

		// if (not launchlet.dev) {
		//   return;
		// }
		console.warn('stub check event.origin');

		if (!LBXPayloadIsValid(event.data)) {
			return;
		};

		mod.ValueMessageSource(event.source);
	},

	// SETUP

	SetupEveryting() {
		mod.SetupMessageReceiveFromPage();
	},
	SetupMessageReceiveFromPage() {
		// @MessageReceiveFromPage
		window.addEventListener('message', mod.MessageReceiveFromPage, false);
	},

	// LIFECYCLE

	LifecyclePageDidLoad() {
		mod.SetupEveryting();
	},
};

mod.LifecyclePageDidLoad();
