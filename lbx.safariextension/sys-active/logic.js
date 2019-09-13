export const LBXPayloadIsValid = function(inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw 'LBXErrorInputInvalid'
	}

	if (typeof inputData.LBXPayloadEncryptedData !== 'object' || inputData.LBXPayloadEncryptedData === null) {
		return false
	}

	if (typeof inputData.LBXPayloadEncryptedData.rsaEncrypted !== 'object' || inputData.LBXPayloadEncryptedData.rsaEncrypted === null) {
		return false
	}

	return true;
};
