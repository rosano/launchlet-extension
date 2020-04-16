import { throws, doesNotThrow, deepEqual } from 'assert';

const mainModule = require('./rollup-config-custom.js');

describe('LBXActiveRollupConfigCustom', function test_LBXActiveRollupConfigCustom() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule.LBXActiveRollupConfigCustom(null);
		}, /LBXErrorInputNotValid/);
	});

	it('removes livereload', function() {
		deepEqual(mainModule.LBXActiveRollupConfigCustom({
			output: {},
			plugins: [{
				name: 'livereload',
			}],
		}).plugins, []);
	});

});
