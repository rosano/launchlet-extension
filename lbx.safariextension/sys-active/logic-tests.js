import { throws, deepEqual } from 'assert';

import * as mainModule from './logic.js';

import { _LBX_DISABLE_ENCRYPTION } from '../-shared/_common/main.js';

describe('LBXRequestIsValid', function testLBXRequestIsValid() {

	const uStubItem = function () {
		return {
			LBXRequestName: '',
			LBXRequestEncryptedData: '',
		};
	};

	it('throws error if not object', function() {
		throws(function() {
			mainModule.LBXRequestIsValid(null);
		}, /LBXErrorInputNotValid/);
	});

	it('returns false if LBXRequestName not string', function() {
		deepEqual(mainModule.LBXRequestIsValid(Object.assign(uStubItem(), {
			LBXRequestName: null,
		})), false);
	});

	it('returns false if LBXRequestEncryptedData not string', function() {
		deepEqual(mainModule.LBXRequestIsValid(Object.assign(uStubItem(), {
			LBXRequestEncryptedData: null,
		})), false);
	});

	it('returns true', function() {
		deepEqual(mainModule.LBXRequestIsValid(uStubItem()), true);
	});	

});
