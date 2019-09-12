export default {
	MessageReceiveFromPage(inputData) {
		// @MessageReceiveFromPage
		window.addEventListener('message', inputData, false);
	},
}
