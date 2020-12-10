const { throws, deepEqual } = require('assert');

const mod = require('./rollup-config-custom.js');

describe('LBXBackgroundRollupConfigCustom', function test_LBXBackgroundRollupConfigCustom() {

	it('throws error if not object', function() {
		throws(function() {
			mod.LBXBackgroundRollupConfigCustom(null);
		}, /LBXErrorInputNotValid/);
	});

	it('removes livereload', function() {
		deepEqual(mod.LBXBackgroundRollupConfigCustom({
			output: {},
			plugins: [{
				name: 'livereload',
			}],
		}).plugins, []);
	});

});
