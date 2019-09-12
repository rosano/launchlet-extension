import api from './api.js'

const mod = {

	// MESSAGE

	MessageDidReceiveFromActive (event) {
    return {
      async DispatchBackgroundStorePayloadEncryptedData () {
      },
    }[event.name]();
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
