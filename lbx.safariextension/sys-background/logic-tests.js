const { throws, deepEqual } = require('assert');

const mod = require('./logic.js');

describe('LBXPayloadIsValid', function test_LBXPayloadIsValid() {

	const uStubItem = function() {
		return {
			LBXPayloadPackageScript: '',
			LBXPayloadPackageStyle: '',
			LBXPayloadPackageOptions: {},
		}
	};

	it('throws error if not object', function() {
		throws(function() {
			mod.LBXPayloadIsValid(null);
		}, /LBXErrorInputNotValid/);
	});

	it('returns false if LBXPayloadPackageScript not string', function() {
		deepEqual(mod.LBXPayloadIsValid(Object.assign(uStubItem(), {
			LBXPayloadPackageScript: null,
		})), false);
	});

	it('returns false if LBXPayloadPackageStyle not string', function() {
		deepEqual(mod.LBXPayloadIsValid(Object.assign(uStubItem(), {
			LBXPayloadPackageStyle: null,
		})), false);
	});

	it('returns false if LBXPayloadPackageOptions not object', function() {
		deepEqual(mod.LBXPayloadIsValid(Object.assign(uStubItem(), {
			LBXPayloadPackageOptions: null,
		})), false);
	});

	it('returns true', function() {
		deepEqual(mod.LBXPayloadIsValid(uStubItem()), true);
	});	

});
