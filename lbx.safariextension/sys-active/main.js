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
			DispatchActivePayloadSuccess() {
		  	window.postMessage({
		  		LBXResponseHash: event.message,
		  	}, window.location.href)
		  },
			DispatchActiveRunDynamicScript() {
				if (window.top === window) {
		  		eval(event.message)
				}
		  },
		}[event.name]();
	},
	MessageDidKeyDown (event) {
		if (event.key.toLowerCase() !== 'y') {
			return;
		};

		if (!event.shiftKey) {
			return;
		};

		if (!event.metaKey && !event.ctrlKey) {
			return;
		};

		event.stopPropagation();
		event.preventDefault();

		api.MessageSendToBackground('DispatchBackgroundLaunch');
	},

	// COMMAND

	CommandStorePayloadEncryptedData(inputData) {
		api.MessageSendToBackground('DispatchBackgroundStorePayloadEncryptedData', inputData);
	},

	// SETUP

	SetupEveryting() {
		mod.SetupMessageReceiveFromPage();
		mod.SetupMessageReceiveFromBackground();
		mod.SetupKeyboardShortcuts();
	},
	SetupMessageReceiveFromPage() {
		api.MessageReceiveFromPage(mod.MessageDidReceiveFromPage)
	},
	SetupMessageReceiveFromBackground() {
		api.MessageReceiveFromBackground(mod.MessageDidReceiveFromBackground)
	},
	SetupKeyboardShortcuts() {
		// @KeyboardShortcuts
		window.addEventListener('keydown', mod.MessageDidKeyDown, false);
	},

	// LIFECYCLE

	LifecyclePageDidLoad() {
		mod.SetupEveryting();
	},
};

mod.LifecyclePageDidLoad();
