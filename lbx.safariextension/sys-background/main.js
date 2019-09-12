import api from './api.js'

const mod = {

	// MESSAGE

	MessageDidReceiveFromActive (event) {
    return {
      DispatchBackgroundStorePrivateKey () {
        mod.CommandPrivateKeyStore(event.message)
      },
      DispatchBackgroundStorePublicKey () {
        mod.CommandPublicKeyStore(event.message)
      },
      DispatchBackgroundStorePayloadEncryptedData () {
        mod.CommandHandleEventStorePayloadEncryptedData(event)
      },
      DispatchBackgroundDeleteKeys() {
      	mod.CommandDeleteKeys();
      },
    }[event.name]();
  },


  // // VALUE

  // COMMAND

  async CommandHandleEventStorePayloadEncryptedData (event) {
  	try {
  	  throw 'XYZErrorInputInvalid'
  	} catch (e) {
  		api.MessageSendToPage('DispatchActivePayloadError', e, event);
  	}
  },

  CommandPrivateKeyStore (inputData) {
    mod._CommandLocalDataSet('XYZPrivateKey', inputData);
  },
  CommandPublicKeyStore (inputData) {
    mod._CommandLocalDataSet('XYZPublicKey', inputData);
  },
  _CommandLocalDataSet (key, inputData) {
    api.LocalDataSet(key, JSON.stringify(inputData));
  },
  CommandDeleteKeys () {
    mod._CommandLocalDataSet('XYZPrivateKey', null);
    mod._CommandLocalDataSet('XYZPublicKey', null);
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
  DispatchBackgroundStorePrivateKey: mod.CommandPrivateKeyStore,
  DispatchBackgroundStorePublicKey: mod.CommandPublicKeyStore,
  DispatchBackgroundDeleteKeys: mod.CommandDeleteKeys,
};
