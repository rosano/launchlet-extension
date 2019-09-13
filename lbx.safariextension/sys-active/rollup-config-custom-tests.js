import { throws, doesNotThrow, deepEqual } from 'assert';

import * as mainModule from './rollup-config-custom.js';

describe('LBXActiveRollupConfigCustom', function testLBXActiveRollupConfigCustom() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule.LBXActiveRollupConfigCustom(null);
		}, /LBXErrorInputInvalid/);
	})

	it('removes livereload', function() {
		deepEqual(mainModule.LBXActiveRollupConfigCustom({
			output: {},
			plugins: [{
				name: 'livereload',
			}],
		}).plugins, []);
	});

});
