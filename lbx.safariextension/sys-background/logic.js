export const LBXPayloadIsValid = function(inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw new Error('LBXErrorInputNotValid');
	}

	if (typeof inputData.LBXPayloadPackageScript !== 'string') {
		return false;
	}

	if (typeof inputData.LBXPayloadPackageStyle !== 'string') {
		return false;
	}

	if (typeof inputData.LBXPayloadPackageOptions !== 'object' || inputData.LBXPayloadPackageOptions === null) {
		return false;
	}

	return true;
};
