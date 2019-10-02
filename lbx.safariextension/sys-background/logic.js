export const LBXPayloadIsValid = function(inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw new Error('LBXErrorInputNotValid');
	}

	if (typeof inputData.LBXPayloadBookmarklet !== 'string') {
		return false;
	}

	return true;
};
