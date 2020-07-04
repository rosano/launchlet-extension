import api from './api.js'
import { _LBX_DISABLE_ENCRYPTION } from '../-shared/_common/main.js'
import { LBXPayloadIsValid } from './logic.js'

const mod = {

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

  // CONTROL

  async ControlHandleEventStorePayloadEncryptedData (event) {
  	try {
      const decryptedPayload = JSON.parse(await mod._ControlDecrypt(event.message, mod.ValuePrivateKey()));

      if (!LBXPayloadIsValid(decryptedPayload)) {
        throw new Error('LBXPayloadNotValid');
      };

      mod.ValueMemoryPayload(decryptedPayload);

      mod._ControlLocalDataSet('kLBXPreferencePayload', decryptedPayload);

      api.MessageSendToPage('DispatchActivePayloadSuccess', mod.ValueMemoryPayload().LBXPayloadConfirmation, event);
  	} catch (e) {
  		api.MessageSendToPage('DispatchActivePayloadError', e, event);
  	}
  },
  async _ControlDecrypt (param1, param2) {
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

  ControlPrivateKeySave (inputData) {
    mod._ControlLocalDataSet('kLBXPreferencePrivateKey', inputData);

    mod.SetupValueMemoryPrivateKey();
  },

  ControlPrivateKeyForget () {
    mod._ControlLocalDataSet('kLBXPreferencePrivateKey', null);
    mod._ControlLocalDataSet('kLBXPreferencePayload', null);

    delete mod._ValueMemoryPrivateKey;
    delete mod._ValueMemoryPayload;
  },

  _ControlLocalDataSet (key, inputData) {
    api.LocalDataSet(key, JSON.stringify(inputData));
  },
  async _ControlLocalDataGet (inputData) {
    const outputData = await api.LocalDataGet(inputData);;
    
    if (typeof outputData === 'undefined') {
      return outputData;
    };

    return JSON.parse(outputData);
  },

  ControlRunSignature (event) {
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

  async ControlRunTasks (event) {
    if (!mod.ValueMemoryPayload()) {
      return;
    };
    
    if (!(await mod._ControlLocalDataGet('kLBXPreferenceRunAutomaticRecipes'))) {
      return;
    };
    
    api.RunDynamicScript(`(function () {
      ${ mod.ValueMemoryPayload().LBXPayloadPackageScript };

      Launchlet.LCHTasksRun(${ mod.ValueMemoryPayload().LBXPayloadRecipes })
    })()`, event)
  },

  async ControlSendShortcutsMap (event) {
    const result = await mod._ControlLocalDataGet('kLBXPreferenceShortcutsMap');

    api.MessageSendToPage('DispatchSharedShortcutsMap', result || {
      'Alt+Shift+Digit1': 'LBXShortcutDefault',
      'Alt+Shift+Digit2': 'XYZAlfa',
      'Alt+Shift+Digit3': 'XYZBravo',
      'Alt+Shift+[`]': 'XYZCharlie',
    }, event);
  },

  ControlUpdateShortcutsMap (inputData) {
    mod._ControlLocalDataSet('kLBXPreferenceShortcutsMap', inputData);
  },
  
  // MESSAGE

  MessageDidReceiveFromActive (event) {
    return {
      DispatchBackgroundPrivateKeySave () {
        mod.ControlPrivateKeySave(event.message)
      },
      DispatchBackgroundPrivateKeyForget() {
        mod.ControlPrivateKeyForget();
      },
      DispatchBackgroundStorePayloadEncryptedData () {
        mod.ControlHandleEventStorePayloadEncryptedData(event)
      },
      DispatchBackgroundRunSignature() {
        mod.ControlRunSignature(event)
      },
      DispatchBackgroundRunTasks() {
        mod.ControlRunTasks(event)
      },
      DispatchBackgroundSendShortcutsMap () {
        mod.ControlSendShortcutsMap(event);
      },
      DispatchBackgroundUpdateShortcutsMap () {
        mod.ControlUpdateShortcutsMap(event.message);
      },
    }[event.name]();
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
		})(await mod._ControlLocalDataGet('kLBXPreferencePrivateKey')))
	},
  async SetupValueMemoryPayload() {
    mod.ValueMemoryPayload(await mod._ControlLocalDataGet('kLBXPreferencePayload'))
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
  DispatchBackgroundPrivateKeySave: mod.ControlPrivateKeySave,
  DispatchBackgroundPrivateKeyForget: mod.ControlPrivateKeyForget,
};
