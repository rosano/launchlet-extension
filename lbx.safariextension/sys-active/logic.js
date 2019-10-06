import { _LBX_DISABLE_ENCRYPTION } from '../-shared/_common/main.js';

export const LBXRequestIsValid = function(inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw new Error('LBXErrorInputNotValid');
	}

	if (typeof inputData.LBXRequestName !== 'string') {
		return false;
	}

	if (typeof inputData.LBXRequestEncryptedData !== 'string') {
		return false;
	}

	return true;
};
