import api from './api.js';
import { LBXMessageIsValid } from './logic.js';
import { LBXShortcutValidation } from '../-shared/LBXShortcut/main.js';

const mod = {

	// VALUE

	_ValueMessageSource: undefined,
	ValueMessageSource (inputData) {
	  if (typeof inputData === 'undefined') {
	    return mod._ValueMessageSource;
	  }

	  mod._ValueMessageSource = inputData;
	},

	_ValueShortcutMap: {},

	// MESSAGE

	MessageDidReceiveFromPage (event) {
		if (event.source !== window) {
		  return;
		}

		if ('LBX_ACTIVE_MESSAGE_PAGE_ORIGIN_STRING'.indexOf(event.origin) === -1) {
			return
		  // return console.warn('event.origin not match', event);
		}

		if (!LBXMessageIsValid(event.data)) {
			return;
		}

		return {
			DispatchRequestStorePayload() {
		  	mod.ValueMessageSource(event.source);

		  	mod.CommandStorePayloadEncryptedData(event.data.LBXMessageEncryptedData);
		  },
		}[event.data.LBXMessageName]();
	},

	MessageDidReceiveFromBackground (event) {
		return {
			DispatchActivePayloadError() {
		  	window.postMessage({
		  		LBXResponseHash: '',
		  		LBXResponseError: event.message,
		  	}, window.location.href);
		  },
			DispatchActivePayloadSuccess() {
		  	window.postMessage({
		  		LBXResponseHash: event.message,
		  	}, window.location.href);
		  },
			DispatchActiveRunDynamicScript() {
				if (window.top === window) {
		  		(new Function(event.message))();
				}
		  },
		  DispatchSharedShortcutsMap() {
		  	mod._ValueShortcutMap = event.message;
		  },
		}[event.name]();
	},

	MessageDidKeyDown (event) {
		const signature = mod._ValueShortcutMap[Object.keys(mod._ValueShortcutMap).filter(function (e) {
			return LBXShortcutValidation(e)(event);
		}).shift()];

		if (!signature) {
			return;
		};

		event.stopPropagation();
		event.preventDefault();

		api.MessageSendToBackground('DispatchBackgroundRunSignature', signature);
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
		mod.SetupValueKeyboardShortcutsMap();
		mod.SetupRunTasks();
	},

	SetupMessageReceiveFromPage() {
		api.MessageReceiveFromPage(mod.MessageDidReceiveFromPage);
	},
	
	SetupMessageReceiveFromBackground() {
		api.MessageReceiveFromBackground(mod.MessageDidReceiveFromBackground);
	},
	
	SetupKeyboardShortcuts() {
		// @KeyboardShortcuts
		window.addEventListener('keydown', mod.MessageDidKeyDown, false);
	},
	
	SetupValueKeyboardShortcutsMap() {
		api.MessageSendToBackground('DispatchBackgroundSendShortcutsMap');
	},
	
	SetupRunTasks() {
		api.MessageSendToBackground('DispatchBackgroundRunTasks');
	},

	// LIFECYCLE

	LifecyclePageDidLoad() {
		mod.SetupEveryting();
	},

};

mod.LifecyclePageDidLoad();
