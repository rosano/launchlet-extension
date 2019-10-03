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

		it('throws if key not string', function () {
			throws(function () {
				mainModule.LBXShortcutValidation('')({
					key: null,
				})
			}, /ErrorInputInvalid/);
		});

		it('returns false', function () {
			deepEqual(mainModule.LBXShortcutValidation('')({
				key: 'a',
			}), false);
		});

		it('returns true if key match same case', function () {
			deepEqual(mainModule.LBXShortcutValidation('a')({
				key: 'a',
			}), true);
		});

		it('returns true if key match different case', function () {
			deepEqual(mainModule.LBXShortcutValidation('a')({
				key: 'A',
			}), true);
		});

		context('Shift', function () {

			it('returns false if no shiftKey', function () {
				deepEqual(mainModule.LBXShortcutValidation('Shift+A')({
					key: 'a',
				}), false);
			});

			it('returns true', function () {
				deepEqual(mainModule.LBXShortcutValidation('Shift+A')({
					key: 'a',
					shiftKey: true,
				}), true);
			});
		
		});

		context('Ctrl', function () {

			it('returns false if no ctrlKey', function () {
				deepEqual(mainModule.LBXShortcutValidation('Ctrl+A')({
					key: 'a',
				}), false);
			});

			it('returns true', function () {
				deepEqual(mainModule.LBXShortcutValidation('Ctrl+A')({
					key: 'a',
					ctrlKey: true,
				}), true);
			});
		
		});

		context('Alt', function () {

			it('returns false if no altKey', function () {
				deepEqual(mainModule.LBXShortcutValidation('Alt+A')({
					key: 'a',
				}), false);
			});

			it('returns true', function () {
				deepEqual(mainModule.LBXShortcutValidation('Alt+A')({
					key: 'a',
					altKey: true,
				}), true);
			});
		
		});

		context('Cmd', function () {

			it('returns false if no metaKey', function () {
				deepEqual(mainModule.LBXShortcutValidation('Cmd+A')({
					key: 'a',
				}), false);
			});

			it('returns true', function () {
				deepEqual(mainModule.LBXShortcutValidation('Cmd+A')({
					key: 'a',
					metaKey: true,
				}), true);
			});
		
		});
	
	});

});
