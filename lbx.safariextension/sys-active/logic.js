export const LBXPayloadIsValid = function(inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw 'LBXErrorInputInvalid'
	}

	if (typeof inputData.LBXPayloadEncryptedData !== 'string') {
		return false;
	};

	if (!inputData.LBXPayloadEncryptedData) {
		return false;
	};

	if (inputData.LBXPayloadEncryptedData.trim() !== inputData.LBXPayloadEncryptedData) {
		return false;
	};
	
	return true;
};
