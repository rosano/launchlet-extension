import { throws, deepEqual } from 'assert';

import * as mainModule from './logic.js';

import { _LBX_DISABLE_ENCRYPTION } from '../-shared/_common/global.js'

describe('LBXPayloadIsValid', function testPayloadIsValid() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule.LBXPayloadIsValid(null);
		}, /LBXErrorInputNotValid/);
	});

	if (_LBX_DISABLE_ENCRYPTION()) {
		
		it('returns false if LBXPayloadEncryptedData not string', function() {
			deepEqual(mainModule.LBXPayloadIsValid({
				LBXPayloadEncryptedData: null
			}), false);
		});

		it('returns true', function() {
			deepEqual(mainModule.LBXPayloadIsValid({
				LBXPayloadEncryptedData: '',
			}), true);
		});	

		return
	};

	it('returns false if LBXPayloadEncryptedData not string', function() {
		deepEqual(mainModule.LBXPayloadIsValid({
			LBXPayloadEncryptedData: null,
		}), false);
	});

	it('returns true', function() {
		deepEqual(mainModule.LBXPayloadIsValid({
			LBXPayloadEncryptedData: '',
		}), true);
	});	

});
