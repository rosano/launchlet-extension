import { throws, deepEqual } from 'assert';

import * as mainModule from './ui-logic.js';

describe('LBXPopoverRandomSeed', function testLBXPopoverRandomSeed() {

	it('returns string', function() {
		deepEqual(typeof mainModule.LBXPopoverRandomSeed(), 'string');
	});

	it('returns unique', function() {
		const length = 100;
		deepEqual(Array.from(new Array(length)).map(mainModule.LBXPopoverRandomSeed).filter(function (value, index, self) {
			return self.indexOf(value) === index;
		}).length, length);
	});

});
