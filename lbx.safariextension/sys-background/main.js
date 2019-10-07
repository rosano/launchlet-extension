import api from './api.js'
import { _LBX_DISABLE_ENCRYPTION } from '../-shared/_common/main.js'
import { LBXPayloadIsValid } from './logic.js'

const mod = {

	// MESSAGE

	MessageDidReceiveFromActive (event) {
    return {
      DispatchBackgroundPrivateKeySave () {
        mod.CommandPrivateKeySave(event.message)
      },
      DispatchBackgroundPrivateKeyForget() {
        mod.CommandPrivateKeyForget();
      },
      DispatchBackgroundStorePayloadEncryptedData () {
        mod.CommandHandleEventStorePayloadEncryptedData(event)
      },
      DispatchBackgroundRunSignature() {
        mod.CommandRunSignature(event)
      },
      DispatchBackgroundRunTasks() {
        mod.CommandRunTasks(event)
      },
      DispatchBackgroundSendShortcutsMap () {
        mod.CommandSendShortcutsMap(event);
      },
      DispatchBackgroundUpdateShortcutsMap () {
        mod.CommandUpdateShortcutsMap(event.message);
      },
    }[event.name]();
  },

  // VALUE

  _ValueMemoryPrivateKey: undefined,
  ValuePrivateKey (inputData) {
    if (typeof inputData === 'undefined') {
      return mod._ValueMemoryPrivateKey;
    };

    mod._ValueMemoryPrivateKey = inputData
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

      if (!LBXPayloadIsValid(decryptedPayload)) {
        throw new Error('LBXPayloadNotValid');
      };

      mod.ValueMemoryPayload(decryptedPayload);

      mod._CommandLocalDataSet('kLBXPreferencePayload', decryptedPayload);

      api.MessageSendToPage('DispatchActivePayloadSuccess', mod.ValueMemoryPayload().LBXPayloadConfirmation, event);
  	} catch (e) {
  		api.MessageSendToPage('DispatchActivePayloadError', e, event);
  	}
  },
  async _CommandDecrypt (param1, param2) {
    if (_LBX_DISABLE_ENCRYPTION()) {
      return Promise.resolve(param1);
    };

    return new Promise(function (resolve, reject) {
      return simpleCrypto.asym.decrypt(param2, (function DeserializeCipher(inputData) {

        // javascript - Converting between strings and ArrayBuffers - Stack Overflow https://stackoverflow.com/a/11058858
        function str2ab(str) {
          var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
          var bufView = new Uint16Array(buf);
          for (var i=0, strLen=str.length; i<strLen; i++) {
            bufView[i] = str.charCodeAt(i);
          }
          return buf;
        };

        return Object.keys(inputData).reduce(function (coll, item) {
          coll[item] = str2ab(inputData[item]);

          return coll;
        }, {});
      })(JSON.parse(param1)), reject, function(decrypted){
        return resolve((new TextDecoder("utf-8")).decode(decrypted))
      });
    })
  },

  CommandPrivateKeySave (inputData) {
    mod._CommandLocalDataSet('kLBXPreferencePrivateKey', inputData);

    mod.SetupValueMemoryPrivateKey();
  },

  CommandPrivateKeyForget () {
    mod._CommandLocalDataSet('kLBXPreferencePrivateKey', null);
    mod._CommandLocalDataSet('kLBXPreferencePayload', null);

    delete mod._ValueMemoryPrivateKey;
    delete mod._ValueMemoryPayload;
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

  CommandRunSignature (event) {
    if (!mod.ValueMemoryPayload()) {
      return;
    };

    if (!event.message) {
      return console.warn('LBXSignatureNotValid');
    };

    api.RunDynamicScript(`(function () {
      ${ mod.ValueMemoryPayload().LBXPayloadPackageScript };

      Launchlet.LCHTasksRun([{
        LCHRecipeCallback () {},
        LCHRecipeStyle: \`${ mod.ValueMemoryPayload().LBXPayloadPackageStyle }\`,
        LCHRecipeURLFilter: '*',
        LCHRecipeIsAutomatic: true,
      }]);

      Launchlet.LCHTasksRun([{
        LCHRecipeSignature: 'Launchlet',
        LCHRecipeCallback () {
          return Launchlet;
        },
      }, {
        LCHRecipeSignature: 'LBXShortcutDefault',
        LCHRecipeCallback () {
          this.api.Launchlet().LCHSingletonCreate(Object.assign(${ JSON.stringify(mod.ValueMemoryPayload().LBXPayloadPackageOptions) }, {
            LCHOptionRecipes: ${ mod.ValueMemoryPayload().LBXPayloadRecipes },
          }));
        },
      }].concat(${ mod.ValueMemoryPayload().LBXPayloadRecipes }.map(function (e) {
        delete e.LCHRecipeIsAutomatic;

        return e;
      })).concat({
        LCHRecipeCallback () {
          this.api['${ event.message }']();
        },
        LCHRecipeURLFilter: '*',
        LCHRecipeIsAutomatic: true,
      }));
    })()`, event)
  },

  async CommandRunTasks (event) {
    if (!mod.ValueMemoryPayload()) {
      return;
    };
    
    if (!(await mod._CommandLocalDataGet('kLBXPreferenceRunAutomaticRecipes'))) {
      return;
    };
    
    api.RunDynamicScript(`(function () {
      ${ mod.ValueMemoryPayload().LBXPayloadPackageScript };

      Launchlet.LCHTasksRun(${ mod.ValueMemoryPayload().LBXPayloadRecipes })
    })()`, event)
  },

  async CommandSendShortcutsMap (event) {
    const result = await mod._CommandLocalDataGet('kLBXPreferenceShortcutsMap');

    api.MessageSendToPage('DispatchSharedShortcutsMap', result || {
      'Alt+Shift+Digit1': 'LBXShortcutDefault',
      'Alt+Shift+Digit2': 'XYZAlfa',
      'Alt+Shift+Digit3': 'XYZBravo',
      'Alt+Shift+[`]': 'XYZCharlie',
    }, event);
  },

  CommandUpdateShortcutsMap (inputData) {
    mod._CommandLocalDataSet('kLBXPreferenceShortcutsMap', inputData);
  },
  
  // SETUP

  SetupEverything () {
		mod.SetupValueMemoryPrivateKey();
    mod.SetupValueMemoryPayload();
		mod.SetupMessageReceiveFromActive();
	},
	async SetupValueMemoryPrivateKey() {
	  mod.ValuePrivateKey(await (async function (inputData) {
      if (!inputData) {
        return Promise.resolve(inputData)
      };
	  	
      return new Promise(function (resolve, reject) {
        return simpleCrypto.asym.importEncryptPrivateKey(inputData, reject, resolve);
      })
		})(await mod._CommandLocalDataGet('kLBXPreferencePrivateKey')))
	},
  async SetupValueMemoryPayload() {
    mod.ValueMemoryPayload(await mod._CommandLocalDataGet('kLBXPreferencePayload'))
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
  DispatchBackgroundPrivateKeySave: mod.CommandPrivateKeySave,
  DispatchBackgroundPrivateKeyForget: mod.CommandPrivateKeyForget,
};
