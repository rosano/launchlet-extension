import { _LBX_DISABLE_ENCRYPTION } from '../-shared/_common/global.js';

export const LBXMessageIsValid = function(inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw new Error('LBXErrorInputNotValid');
	}

	if (_LBX_DISABLE_ENCRYPTION()) {
		return typeof inputData.LBXMessageEncryptedData === 'string';
	}

	if (typeof inputData.LBXMessageEncryptedData !== 'string') {
		return false;
	}

	return true;
};
