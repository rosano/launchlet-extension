import api from './api.js'

const mod = {

	// MESSAGE

	MessageDidReceiveFromActive (event) {
    return {
      DispatchBackgroundStorePrivateKey () {
        mod.CommandPrivateKeyStore(event.message)
      },
      DispatchBackgroundStorePayloadEncryptedData () {
        mod.CommandHandleEventStorePayloadEncryptedData(event)
      },
    }[event.name]();
  },


  // COMMAND

  async CommandHandleEventStorePayloadEncryptedData (event) {
  	try {
  	  throw 'XYZErrorInputInvalid'
  	} catch (e) {
  		api.MessageSendToPage('DispatchActivePayloadError', e, event);
  	}
  },

  CommandPrivateKeyStore (inputData) {
    mod.ValueLocalDataKeySet('XYZPrivateKey', inputData);
  },
  
  // SETUP

  SetupEverything () {
		mod.SetupMessageReceiveFromActive();
	},
	SetupMessageReceiveFromActive() {
		api.MessageReceiveFromActive(mod.MessageDidReceiveFromActive)
	},
  
  // LIFECYCLE

  LifecycleExtensionDidLoad () {
    mod.SetupEverything();
  },

};

mod.LifecycleExtensionDidLoad();

window.LCHBackgroundModule = {
  DispatchBackgroundStorePrivateKey: mod.CommandPrivateKeyStore
};

