export default {

	MessageReceiveFromActive(inputData) {
		if (typeof safari !== 'undefined') {
			// @MessageReceiveFromActive:Safari
			return safari.application.addEventListener('message', inputData, false);
		};

		// @MessageReceiveFromActive:Shared
		chrome.runtime.onMessage.addListener(inputData);
	},

	MessageSendToPage(param1, param2, event) {
		if (typeof safari !== 'undefined') {
		  // @MessageSendToPage:Safari
		  return event.target.page.dispatchMessage(param1, param2);
		};

		// @MessageSendToPage:Shared
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		  chrome.tabs.sendMessage(tabs[0].id, {
		    name: param1,
		    message: param2,
		  });
		});
	},
	
}
