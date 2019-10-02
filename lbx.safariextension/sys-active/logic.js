import { _LBX_DISABLE_ENCRYPTION } from '../-shared/_common/global.js'

export const LBXPayloadIsValid = function(inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw new Error('LBXErrorInputNotValid')
	}

	if (_LBX_DISABLE_ENCRYPTION()) {
		return typeof inputData.LBXPayloadEncryptedData === 'string';
	};

	if (typeof inputData.LBXPayloadEncryptedData !== 'string') {
		return false
	}

	return true;
};
