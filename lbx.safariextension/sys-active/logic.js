import { _LBX_DISABLE_ENCRYPTION } from '../-shared/_common/global.js'

export const LBXPayloadIsValid = function(inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw new Error('LBXErrorInputInvalid')
	}

	if (_LBX_DISABLE_ENCRYPTION()) {
		return typeof inputData.LBXPayloadEncryptedData === 'string';
	};

	if (typeof inputData.LBXPayloadEncryptedData !== 'object' || inputData.LBXPayloadEncryptedData === null) {
		return false
	}

	if (typeof inputData.LBXPayloadEncryptedData.rsaEncrypted !== 'object' || inputData.LBXPayloadEncryptedData.rsaEncrypted === null) {
		return false
	}

	return true;
};
