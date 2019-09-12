export default {

	CallBackgroundFunction (param1, param2) {
		if (typeof safari !== 'undefined') {
			// @CallBackgroundFunction:Safari
			return safari.extension.globalPage.contentWindow.LBXBackground.param1(param2);
		};

		if (typeof chrome !== 'undefined') {
			// @CallBackgroundFunction:Shared
			return chrome.runtime.sendMessage({
				name: param1,
				message: param2,
			});
		};
	},

	async LocalDataGet (inputData) {
	  return JSON.parse(await this._LocalDataGet(inputData));
	},
	async _LocalDataGet (inputData) {
	  if (typeof safari !== 'undefined') {
	  	// @LocalDataGet:Safari
	    return Promise.resolve(safari.extension.settings[inputData]);
	  };

	  // @LocalDataGet:Shared
	  // return Promise.resolve(localStorage.getItem(inputData));
	  return new Promise(function (resolve, reject) {
	    return chrome.storage.local.get([inputData], function (result) {
	      return resolve(result[inputData])
	    });
	  })
	},
	
}
