import { throws, deepEqual } from 'assert';

import * as mainModule from './rollup-config-custom.js';

describe('LBXBackgroundRollupConfigCustom', function testLBXBackgroundRollupConfigCustom() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule.LBXBackgroundRollupConfigCustom(null);
		}, /LBXErrorInputNotValid/);
	})

	it('removes livereload', function() {
		deepEqual(mainModule.LBXBackgroundRollupConfigCustom({
			output: {},
			plugins: [{
				name: 'livereload',
			}],
		}).plugins, []);
	});

});
