export default {

	CallBackgroundFunction (param1, param2) {
		if (typeof safari !== 'undefined') {
			// @CallBackgroundFunction:Safari
			return safari.extension.globalPage.contentWindow.LBXBackground.param1(param2);
		};

		// @CallBackgroundFunction:Shared
		chrome.runtime.sendMessage({
			name: param1,
			message: param2,
		});
	},
	
}
