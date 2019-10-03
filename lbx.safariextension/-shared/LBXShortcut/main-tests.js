import { throws, deepEqual } from 'assert';

import * as mainModule from './main.js';

describe('LBXShortcutValidation', function testLBXShortcutValidation() {

	it('throws if not string', function () {
		throws(function () {
			mainModule.LBXShortcutValidation(null)
		}, /ErrorInputInvalid/);
	});

	it('returns function', function() {
		deepEqual(typeof mainModule.LBXShortcutValidation(''), 'function');
	});

	context('function', function () {
		
		it('throws if not object', function () {
			throws(function () {
				mainModule.LBXShortcutValidation('')(null)
			}, /ErrorInputInvalid/);
		});

		it('throws if code not string', function () {
			throws(function () {
				mainModule.LBXShortcutValidation('')({
					code: null,
				})
			}, /ErrorInputInvalid/);
		});

		it('returns false', function () {
			deepEqual(mainModule.LBXShortcutValidation('')({
				code: 'a',
			}), false);
		});

		it('returns true if code match same case', function () {
			deepEqual(mainModule.LBXShortcutValidation('a')({
				code: 'a',
			}), true);
		});

		it('returns true if code match different case', function () {
			deepEqual(mainModule.LBXShortcutValidation('a')({
				code: 'A',
			}), true);
		});

		it('returns true if key match same case', function () {
			deepEqual(mainModule.LBXShortcutValidation('[a]')({
				key: 'a',
				code: '',
			}), true);
		});

		it('returns true if key match different case', function () {
			deepEqual(mainModule.LBXShortcutValidation('[a]')({
				key: 'A',
				code: '',
			}), true);
		});

		context('Shift', function () {

			it('returns false if no shiftKey', function () {
				deepEqual(mainModule.LBXShortcutValidation('Shift+A')({
					code: 'a',
				}), false);
			});

			it('returns true', function () {
				deepEqual(mainModule.LBXShortcutValidation('Shift+A')({
					code: 'a',
					shiftKey: true,
				}), true);
			});
		
		});

		context('Ctrl', function () {

			it('returns false if no ctrlKey', function () {
				deepEqual(mainModule.LBXShortcutValidation('Ctrl+A')({
					code: 'a',
				}), false);
			});

			it('returns true', function () {
				deepEqual(mainModule.LBXShortcutValidation('Ctrl+A')({
					code: 'a',
					ctrlKey: true,
				}), true);
			});
		
		});

		context('Alt', function () {

			it('returns false if no altKey', function () {
				deepEqual(mainModule.LBXShortcutValidation('Alt+A')({
					code: 'a',
				}), false);
			});

			it('returns true', function () {
				deepEqual(mainModule.LBXShortcutValidation('Alt+A')({
					code: 'a',
					altKey: true,
				}), true);
			});
		
		});

		context('Cmd', function () {

			it('returns false if no metaKey', function () {
				deepEqual(mainModule.LBXShortcutValidation('Cmd+A')({
					code: 'a',
				}), false);
			});

			it('returns true', function () {
				deepEqual(mainModule.LBXShortcutValidation('Cmd+A')({
					code: 'a',
					metaKey: true,
				}), true);
			});
		
		});
	
	});

});
