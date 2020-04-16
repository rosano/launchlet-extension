const { throws, deepEqual } = require('assert');

const mainModule = require('./rollup-config-custom.js');

describe('LBXBackgroundRollupConfigCustom', function test_LBXBackgroundRollupConfigCustom() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule.LBXBackgroundRollupConfigCustom(null);
		}, /LBXErrorInputNotValid/);
	});

	it('removes livereload', function() {
		deepEqual(mainModule.LBXBackgroundRollupConfigCustom({
			output: {},
			plugins: [{
				name: 'livereload',
			}],
		}).plugins, []);
	});

});
