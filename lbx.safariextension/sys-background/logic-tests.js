import { throws, deepEqual } from 'assert';

import * as mainModule from './logic.js';

describe('LBXPayloadIsValid', function testLBXPayloadIsValid() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule.LBXPayloadIsValid(null);
		}, /LBXErrorInputNotValid/);
	});

	it('returns false if LBXPayloadBookmarklet not string', function() {
		deepEqual(mainModule.LBXPayloadIsValid({
			LBXPayloadBookmarklet: null,
		}), false);
	});

	it('returns true', function() {
		deepEqual(mainModule.LBXPayloadIsValid({
			LBXPayloadBookmarklet: '',
		}), true);
	});	

});
