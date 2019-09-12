import { throws, deepEqual } from 'assert';

import * as mainModule from './logic.js';

describe('LBXPayloadIsValid', function testPayloadIsValid() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule.LBXPayloadIsValid(null);
		}, /LBXErrorInputInvalid/);
	});

	it('returns false if LBXPayloadEncryptedData not string', function() {
		deepEqual(mainModule.LBXPayloadIsValid({
			LBXPayloadEncryptedData: null
		}), false);
	});

	it('returns false if LBXPayloadEncryptedData blank', function() {
		deepEqual(mainModule.LBXPayloadIsValid({
			LBXPayloadEncryptedData: ''
		}), false);
	});

	it('returns false if LBXPayloadEncryptedData contains untrimmed whitespace', function() {
		deepEqual(mainModule.LBXPayloadIsValid({
			LBXPayloadEncryptedData: ' alfa '
		}), false);
	});

	it('returns true', function() {
		deepEqual(mainModule.LBXPayloadIsValid({
			LBXPayloadEncryptedData: 'alfa',
		}), true);
	});	

});
