import { throws, deepEqual } from 'assert';

import * as mainModule from './rollup-config-custom.js';

describe('LBXPopoverRollupConfigCustom', function testLBXPopoverRollupConfigCustom() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule.LBXPopoverRollupConfigCustom(null);
		}, /LCHErrorInputInvalid/);
	})

	it('sets output.format', function() {
		deepEqual(mainModule.LBXPopoverRollupConfigCustom({
			output: {},
		}).output.format, 'umd');
	});

});
