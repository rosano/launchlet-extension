import { throws, deepEqual } from 'assert';

import * as mainModule from './logic.js';

describe('LBXPayloadIsValid', function testPayloadIsValid() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule.LBXPayloadIsValid(null);
		}, /LBXErrorInputInvalid/);
	});

	it('returns false if LBXPayloadEncryptedData not object', function() {
		deepEqual(mainModule.LBXPayloadIsValid({
			LBXPayloadEncryptedData: null
		}), false);
	});

	it('returns false if LBXPayloadEncryptedData.rsaEncrypted not object', function() {
		deepEqual(mainModule.LBXPayloadIsValid({
			LBXPayloadEncryptedData: {
				rsaEncrypted: null
			},
		}), false);
	});

	it('returns true', function() {
		deepEqual(mainModule.LBXPayloadIsValid({
			LBXPayloadEncryptedData: {
				rsaEncrypted: {}
			},
		}), true);
	});	

});
