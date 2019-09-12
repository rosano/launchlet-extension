export default {

	MessageReceiveFromActive(inputData) {
		if (typeof safari !== 'undefined') {
			// @MessageReceiveFromActive:Safari
			return safari.application.addEventListener('message', inputData, false);
		};

		// @MessageReceiveFromActive:Shared
		chrome.runtime.onMessage.addListener(inputData);
	},
	
}
