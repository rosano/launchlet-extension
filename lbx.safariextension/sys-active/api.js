export default {

	MessageReceiveFromPage(inputData) {
		// @MessageReceiveFromPage
		window.addEventListener('message', inputData, false);
	},

	MessageSendToBackground (param1, param2) {
		if (typeof safari !== 'undefined') {
			// @MessageSendToBackground:Safari
			return safari.self.tab.dispatchMessage(param1, param2);
		}

		// @MessageSendToBackground:Shared
		chrome.runtime.sendMessage({
			name: param1,
			message: param2,
		});
	},

	MessageReceiveFromBackground (inputData) {
		if (typeof safari !== 'undefined') {
			// @MessageReceiveFromBackground:Safari
			return safari.self.addEventListener('message', inputData, false);
		}

		// @MessageReceiveFromBackground:Shared
		chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
			if (sender.tab) { // from a content script
				return;
			}
		  
		  inputData(request);
		});
	},
	
};
