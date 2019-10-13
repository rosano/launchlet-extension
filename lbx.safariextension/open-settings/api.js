export default {

	MessageSendToBackground (param1, param2) {
		if (typeof safari !== 'undefined') {
			if (typeof safari.self === 'undefined') {
				return;
			};

			// @MessageSendToBackground:Safari
			return safari.self.tab.dispatchMessage(param1, param2);
		}

		if (typeof chrome !== 'undefined') {
			// @MessageSendToBackground:Shared
			return chrome.runtime.sendMessage({
				name: param1,
				message: param2,
			});
		};
	},

	MessageReceiveFromBackground (inputData) {
		if (typeof safari !== 'undefined') {
			if (typeof safari.self === 'undefined') {
				return;
			};

			// @MessageReceiveFromBackground:Safari
			return safari.self.addEventListener('message', inputData, false);
		}

		if (typeof chrome !== 'undefined') {
			// @MessageReceiveFromBackground:Shared
			return chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
				if (sender.tab) { // from a content script
					return;
				}

			  inputData(request);
			});
		}
	},

};
