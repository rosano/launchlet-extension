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


  // VALUE

  _ValuePrivateKey: undefined,
  ValuePrivateKey (inputData) {
    if (typeof inputData === 'undefined') {
      return mod._ValuePrivateKey;
    };

    console.log('ValuePrivateKey', inputData);

    mod._ValuePrivateKey = inputData
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
  async _CommandLocalDataGet (inputData) {
    const outputData = await api.LocalDataGet(inputData);;
    
    if (typeof outputData === 'undefined') {
      return outputData;
    };

    return JSON.parse(outputData);
  },
  CommandDeleteKeys () {
    mod._CommandLocalDataSet('XYZPrivateKey', null);
    mod._CommandLocalDataSet('XYZPublicKey', null);
  },
  
  // SETUP

  SetupEverything () {
		mod.SetupValuePrivateKey();
		mod.SetupMessageReceiveFromActive();
	},
	async SetupValuePrivateKey() {
	  mod.ValuePrivateKey((function DeserializePrivateKey(json) {
			// https://github.com/wwwtyro/cryptico/issues/28#issuecomment-319841493
		  let rsa = new RSAKey();
		  rsa.setPrivateEx(json.n, json.e, json.d, json.p, json.q, json.dmp1, json.dmq1, json.coeff)
		  return rsa;
		})(await mod._CommandLocalDataGet('XYZPrivateKey')))
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
