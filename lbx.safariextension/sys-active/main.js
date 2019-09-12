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

	// COMMAND

	CommandStorePayloadEncryptedData(inputData) {
		api.MessageSendToBackground('DispatchBackgroundStorePayloadEncryptedData', inputData);
	},

	// SETUP

	SetupEveryting() {
		mod.SetupMessageReceiveFromPage();
	},
	SetupMessageReceiveFromPage() {
		api.MessageReceiveFromPage(mod.MessageDidReceiveFromPage)
	},

	// LIFECYCLE

	LifecyclePageDidLoad() {
		mod.SetupEveryting();
	},
};

mod.LifecyclePageDidLoad();
