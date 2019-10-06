export default {

	IsExtensionContext () {
		if (typeof safari !== 'undefined' && typeof safari.extension !== 'undefined') {
			return true;
		}

		if (typeof chrome !== 'undefined') {
			return true;
		}

		return false;
	},

	CallBackgroundFunction (param1, param2) {
		if (typeof safari !== 'undefined') {
			// @CallBackgroundFunction:Safari
			return safari.extension.globalPage.contentWindow.LBXBackgroundModule[param1](param2);
		}

		if (typeof chrome !== 'undefined') {
			// @CallBackgroundFunction:Shared
			return chrome.runtime.sendMessage({
				name: param1,
				message: param2,
			});
		}
	},

	LocalDataStore (param1, param2) {
	  if (typeof safari !== 'undefined') {
	  	// @LocalDataStore:Safari
	    return (safari.extension.settings[param1] = param2);
	  }

	  // @LocalDataStore:Shared
	  chrome.storage.local.set([param1].reduce(function (coll, item) {
	    coll[item] = param2;

	    return coll;
	  }, {}));
	},

	async LocalDataRetrieve (inputData) {
	  if (typeof safari !== 'undefined') {
	  	// @LocalDataRetrieve:Safari
	    return Promise.resolve(safari.extension.settings[inputData]);
	  }

	  // @LocalDataRetrieve:Shared
	  // return Promise.resolve(localStorage.getItem(inputData));
	  return new Promise(function (resolve, reject) {
	    return chrome.storage.local.get([inputData], function (result) {
	      return resolve(result[inputData]);
	    });
	  });
	},

	SettingsPageProgrammaticLaunch () {
		if (typeof safari !== 'undefined') {
			// @SettingsPageProgrammaticLaunch:Safari
			return safari.application.activeBrowserWindow.openTab().url = safari.extension.baseURI + "open-preferences/ui-view.html";
		}

		if (typeof chrome !== 'undefined') {
			// @SettingsPageProgrammaticLaunch:Shared
			return chrome.runtime.openOptionsPage();
		}
	},
	
};
