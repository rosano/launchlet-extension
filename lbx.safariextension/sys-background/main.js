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

    mod._ValuePrivateKey = inputData
  },

  _ValueMemoryPayload: undefined,
  ValueMemoryPayload (inputData) {
    if (typeof inputData === 'undefined') {
      return mod._ValueMemoryPayload;
    };

    mod._ValueMemoryPayload = inputData
  },

  // COMMAND

  async CommandHandleEventStorePayloadEncryptedData (event) {
  	try {
      const decryptedPayload = JSON.parse(await mod._CommandDecrypt(event.message, mod.ValuePrivateKey()));

      if (!decryptedPayload.LBXPayloadBookmarklet) {
        throw "LBXErrorInputInvalid"
      };

      mod.ValueMemoryPayload(decryptedPayload);

      mod._CommandLocalDataSet('LBXPairPayload', decryptedPayload);

      api.MessageSendToPage('DispatchActivePayloadSuccess', mod.ValueMemoryPayload().LBXPayloadHash, event);
  	} catch (e) {
  		api.MessageSendToPage('DispatchActivePayloadError', e, event);
  	}
  },
  async _CommandDecrypt (param1, param2) {
    return new Promise(function (resolve, reject) {
      return simpleCrypto.asym.decrypt(param2, param1, reject, function(decrypted){
        return resolve((new TextDecoder("utf-8")).decode(decrypted))
      });
    })
  },

  CommandPrivateKeyStore (inputData) {
    mod._CommandLocalDataSet('LBXPairPrivateKey', inputData);
  },

  CommandPublicKeyStore (inputData) {
    mod._CommandLocalDataSet('LBXPairPublicKey', inputData);
  },

  CommandDeleteKeys () {
    mod._CommandLocalDataSet('LBXPairPrivateKey', null);
    mod._CommandLocalDataSet('LBXPairPublicKey', null);
    mod._CommandLocalDataSet('LBXPairPayload', null);
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
  
  // SETUP

  SetupEverything () {
		mod.SetupValuePrivateKey();
    mod.SetupValueMemoryPayload();
		mod.SetupMessageReceiveFromActive();
	},
	async SetupValuePrivateKey() {
	  mod.ValuePrivateKey(await (async function DeserializePrivateKey(inputData) {
      if (!inputData) {
        return Promise.resolve(inputData)
      };
	  	
      return new Promise(function (resolve, reject) {
        return simpleCrypto.asym.importEncryptPrivateKey(inputData, reject, resolve);
      })
		})(await mod._CommandLocalDataGet('LBXPairPrivateKey')))
	},
  async SetupValueMemoryPayload() {
    mod.ValueMemoryPayload(await mod._CommandLocalDataGet('LBXPairPayload'))
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

window.LBXBackgroundModule = {
  DispatchBackgroundStorePrivateKey: mod.CommandPrivateKeyStore,
  DispatchBackgroundStorePublicKey: mod.CommandPublicKeyStore,
  DispatchBackgroundDeleteKeys: mod.CommandDeleteKeys,
};
