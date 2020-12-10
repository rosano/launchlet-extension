import { throws, doesNotThrow, deepEqual } from 'assert';

const mod = require('./rollup-config-custom.js');

describe('LBXActiveRollupConfigCustom', function test_LBXActiveRollupConfigCustom() {

	it('throws error if not object', function() {
		throws(function() {
			mod.LBXActiveRollupConfigCustom(null);
		}, /LBXErrorInputNotValid/);
	});

	it('removes livereload', function() {
		deepEqual(mod.LBXActiveRollupConfigCustom({
			output: {},
			plugins: [{
				name: 'livereload',
			}],
		}).plugins, []);
	});

});
