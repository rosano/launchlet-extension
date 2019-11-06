const { throws, deepEqual } = require('assert');

const mainModule = require('./logic.js');

describe('LBXPayloadIsValid', function testLBXPayloadIsValid() {

	const uStubItem = function() {
		return {
			LBXPayloadPackageScript: '',
			LBXPayloadPackageStyle: '',
			LBXPayloadPackageOptions: {},
		}
	};

	it('throws error if not object', function() {
		throws(function() {
			mainModule.LBXPayloadIsValid(null);
		}, /LBXErrorInputNotValid/);
	});

	it('returns false if LBXPayloadPackageScript not string', function() {
		deepEqual(mainModule.LBXPayloadIsValid(Object.assign(uStubItem(), {
			LBXPayloadPackageScript: null,
		})), false);
	});

	it('returns false if LBXPayloadPackageStyle not string', function() {
		deepEqual(mainModule.LBXPayloadIsValid(Object.assign(uStubItem(), {
			LBXPayloadPackageStyle: null,
		})), false);
	});

	it('returns false if LBXPayloadPackageOptions not object', function() {
		deepEqual(mainModule.LBXPayloadIsValid(Object.assign(uStubItem(), {
			LBXPayloadPackageOptions: null,
		})), false);
	});

	it('returns true', function() {
		deepEqual(mainModule.LBXPayloadIsValid(uStubItem()), true);
	});	

});
