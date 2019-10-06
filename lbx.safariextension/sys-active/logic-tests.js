import { throws, deepEqual } from 'assert';

import * as mainModule from './logic.js';

import { _LBX_DISABLE_ENCRYPTION } from '../-shared/_common/main.js';

describe('LBXMessageIsValid', function testLBXMessageIsValid() {

	const uStubItem = function () {
		return {
			LBXMessageName: '',
			LBXMessageEncryptedData: '',
		};
	};

	it('throws error if not object', function() {
		throws(function() {
			mainModule.LBXMessageIsValid(null);
		}, /LBXErrorInputNotValid/);
	});

	it('returns false if LBXMessageName not string', function() {
		deepEqual(mainModule.LBXMessageIsValid(Object.assign(uStubItem(), {
			LBXMessageName: null,
		})), false);
	});

	it('returns false if LBXMessageEncryptedData not string', function() {
		deepEqual(mainModule.LBXMessageIsValid(Object.assign(uStubItem(), {
			LBXMessageEncryptedData: null,
		})), false);
	});

	it('returns true', function() {
		deepEqual(mainModule.LBXMessageIsValid(uStubItem()), true);
	});	

});
