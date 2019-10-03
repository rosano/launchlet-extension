export default {

	MessageReceiveFromActive(inputData) {
		if (typeof safari !== 'undefined') {
			// @MessageReceiveFromActive:Safari
			return safari.application.addEventListener('message', inputData, false);
		}

		// @MessageReceiveFromActive:Shared
		chrome.runtime.onMessage.addListener(inputData);
	},

	MessageSendToPage(param1, param2, event) {
		if (typeof safari !== 'undefined') {
		  // @MessageSendToPage:Safari
		  return event.target.page.dispatchMessage(param1, param2);
		}

		// @MessageSendToPage:Shared
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		  chrome.tabs.sendMessage(tabs[0].id, {
		    name: param1,
		    message: param2,
		  });
		});
	},

	LocalDataSet (param1, param2) {
	  // console.log('LocalDataSet', param1, param2);
	  if (typeof safari !== 'undefined') {
	  	// @LocalDataSet:Safari
	    return (safari.extension.settings[param1] = param2);
	  }

	  // @LocalDataSet:Shared
	  // localStorage.setItem(param1, param2);
	  chrome.storage.local.set([param1].reduce(function (coll, item) {
	    coll[item] = param2;

	    return coll;
	  }, {}));
	},
	async LocalDataGet (inputData) {
	  if (typeof safari !== 'undefined') {
	  	// @LocalDataGet:Safari
	    return Promise.resolve(safari.extension.settings[inputData]);
	  }

	  // @LocalDataGet:Shared
	  // return Promise.resolve(localStorage.getItem(inputData));
	  return new Promise(function (resolve, reject) {
	    return chrome.storage.local.get([inputData], function (result) {
	      return resolve(result[inputData]);
	    });
	  });
	},

	RunDynamicScript (inputData, event) {
		if (typeof safari !== 'undefined') {
			// @RunDynamicScript:Safari
			return this.MessageSendToPage('DispatchActiveRunDynamicScript', inputData, event);
		}

		// @RunDynamicScript:Shared
		chrome.tabs.executeScript({
		  'code': inputData,
		  'matchAboutBlank': true,
		  // file: 'contentScript.js'
		  // 'runAt': document_start,
		}, function () {
		  if (!chrome.runtime.lastError) {
		    return;
		  }

		  console.log(chrome.runtime.lastError);
		});
	}
	
};
