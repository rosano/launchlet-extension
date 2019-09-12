import api from './api.js'

const mod = {

	// MESSAGE

	MessageDidReceiveFromActive (event) {
    return {
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
  		api.MessageSendToPage('DispatchPagePayloadError', e, event);
  	}
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
