import api from './api.js'
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

	MessageDidReceiveFromPage (event) {
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

		mod.CommandStorePayloadEncryptedData(event.data.LBXPayloadEncryptedData)
	},
	MessageDidReceiveFromBackground (event) {
		return {
			DispatchActivePayloadError() {
		  	window.postMessage({
		  		LBXResponseHash: '',
		  		LBXResponseError: event.message,
		  	}, window.location.href)
		  },
		}[event.name]();
	},

	// COMMAND

	CommandStorePayloadEncryptedData(inputData) {
		api.MessageSendToBackground('DispatchBackgroundStorePayloadEncryptedData', inputData);
	},

	// SETUP

	SetupEveryting() {
		mod.SetupMessageReceiveFromPage();
		mod.SetupMessageReceiveFromBackground();
	},
	SetupMessageReceiveFromPage() {
		api.MessageReceiveFromPage(mod.MessageDidReceiveFromPage)
	},
	SetupMessageReceiveFromBackground() {
		api.MessageReceiveFromBackground(mod.MessageDidReceiveFromBackground)
	},

	// LIFECYCLE

	LifecyclePageDidLoad() {
		mod.SetupEveryting();
	},
};

mod.LifecyclePageDidLoad();
