import { throws, deepEqual } from 'assert';

import * as mainModule from './logic.js';

import { _LBX_DISABLE_ENCRYPTION } from '../-shared/_common/main.js';

describe('LBXMessageIsValid', function testLBXMessageIsValid() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule.LBXMessageIsValid(null);
		}, /LBXErrorInputNotValid/);
	});

	if (_LBX_DISABLE_ENCRYPTION()) {
		
		it('returns false if LBXMessageEncryptedData not string', function() {
			deepEqual(mainModule.LBXMessageIsValid({
				LBXMessageEncryptedData: null
			}), false);
		});

		it('returns true', function() {
			deepEqual(mainModule.LBXMessageIsValid({
				LBXMessageEncryptedData: '',
			}), true);
		});	

		return;
	}

	it('returns false if LBXMessageEncryptedData not string', function() {
		deepEqual(mainModule.LBXMessageIsValid({
			LBXMessageEncryptedData: null,
		}), false);
	});

	it('returns true', function() {
		deepEqual(mainModule.LBXMessageIsValid({
			LBXMessageEncryptedData: '',
		}), true);
	});	

});
