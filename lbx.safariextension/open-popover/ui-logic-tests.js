const { throws, deepEqual } = require('assert');

const mod = require('./ui-logic.js');

describe('LBXPopoverRandomSeed', function test_LBXPopoverRandomSeed() {

	it('returns string', function() {
		deepEqual(typeof mod.LBXPopoverRandomSeed(), 'string');
	});

	it('returns unique', function() {
		const length = 100;
		deepEqual(Array.from(new Array(length)).map(mod.LBXPopoverRandomSeed).filter(function (value, index, self) {
			return self.indexOf(value) === index;
		}).length, length);
	});

});
