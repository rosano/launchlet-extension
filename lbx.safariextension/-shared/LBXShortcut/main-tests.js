const { throws, deepEqual } = require('assert');

const mod = require('./main.js');

describe('LBXShortcutValidation', function test_LBXShortcutValidation() {

	it('throws if not string', function () {
		throws(function () {
			mod.LBXShortcutValidation(null)
		}, /LBXErrorInputNotValid/);
	});

	it('returns function', function() {
		deepEqual(typeof mod.LBXShortcutValidation(''), 'function');
	});

	context('function', function () {
		
		it('throws if not object', function () {
			throws(function () {
				mod.LBXShortcutValidation('')(null)
			}, /LBXErrorInputNotValid/);
		});

		it('throws if code not string', function () {
			throws(function () {
				mod.LBXShortcutValidation('')({
					code: null,
				})
			}, /LBXErrorInputNotValid/);
		});

		it('returns false', function () {
			deepEqual(mod.LBXShortcutValidation('')({
				code: 'a',
			}), false);
		});

		it('returns true if code match same case', function () {
			deepEqual(mod.LBXShortcutValidation('a')({
				code: 'a',
			}), true);
		});

		it('returns true if code match different case', function () {
			deepEqual(mod.LBXShortcutValidation('a')({
				code: 'A',
			}), true);
		});

		it('returns true if key match same case', function () {
			deepEqual(mod.LBXShortcutValidation('[a]')({
				key: 'a',
				code: '',
			}), true);
		});

		it('returns true if key match different case', function () {
			deepEqual(mod.LBXShortcutValidation('[a]')({
				key: 'A',
				code: '',
			}), true);
		});

		context('Shift', function () {

			it('returns false if no shiftKey', function () {
				deepEqual(mod.LBXShortcutValidation('Shift+A')({
					code: 'a',
				}), false);
			});

			it('returns true', function () {
				deepEqual(mod.LBXShortcutValidation('Shift+A')({
					code: 'a',
					shiftKey: true,
				}), true);
			});
		
		});

		context('Ctrl', function () {

			it('returns false if no ctrlKey', function () {
				deepEqual(mod.LBXShortcutValidation('Ctrl+A')({
					code: 'a',
				}), false);
			});

			it('returns true', function () {
				deepEqual(mod.LBXShortcutValidation('Ctrl+A')({
					code: 'a',
					ctrlKey: true,
				}), true);
			});
		
		});

		context('Alt', function () {

			it('returns false if no altKey', function () {
				deepEqual(mod.LBXShortcutValidation('Alt+A')({
					code: 'a',
				}), false);
			});

			it('returns true', function () {
				deepEqual(mod.LBXShortcutValidation('Alt+A')({
					code: 'a',
					altKey: true,
				}), true);
			});
		
		});

		context('Cmd', function () {

			it('returns false if no metaKey', function () {
				deepEqual(mod.LBXShortcutValidation('Cmd+A')({
					code: 'a',
				}), false);
			});

			it('returns true', function () {
				deepEqual(mod.LBXShortcutValidation('Cmd+A')({
					code: 'a',
					metaKey: true,
				}), true);
			});
		
		});
	
	});

});

describe('LBXShortcutString', function test_LBXShortcutString() {

	it('throws if not object', function () {
		throws(function () {
			mod.LBXShortcutString(null)
		}, /LBXErrorInputNotValid/);
	});

	it('throws if code not string', function () {
		throws(function () {
			mod.LBXShortcutString({
				code: null,
				key: 'alfa',
			})
		}, /LBXErrorInputNotValid/);
	});

	it('throws if key not string', function () {
		throws(function () {
			mod.LBXShortcutString({
				code: 'alfa',
				key: null,
			})
		}, /LBXErrorInputNotValid/);
	});

	it('returns string', function () {
		deepEqual(mod.LBXShortcutString({
			code: 'alfa',
			key: 'bravo',
		}), '');
	});

	it('ignores if Ctrl', function () {
		deepEqual(mod.LBXShortcutString({
			code: 'alfa',
			key: 'Control',
			ctrlKey: true,
		}), '');
	});

	it('ignores if Cmd', function () {
		deepEqual(mod.LBXShortcutString({
			code: 'alfa',
			key: 'Meta',
			metaKey: true,
		}), '');
	});

	it('ignores if Alt', function () {
		deepEqual(mod.LBXShortcutString({
			code: 'alfa',
			key: 'Alt',
			altKey: true,
		}), '');
	});

	it('ignores if Shift', function () {
		deepEqual(mod.LBXShortcutString({
			code: 'alfa',
			key: 'Shift',
			shiftKey: true,
		}), '');
	});

	it('ignores if Tab', function () {
		deepEqual(mod.LBXShortcutString({
			code: 'Tab',
			key: 'Tab',
			shiftKey: true,
		}), '');
	});

	it('prepends Ctrl', function () {
		deepEqual(mod.LBXShortcutString({
			code: 'alfa',
			key: 'bravo',
			ctrlKey: true,
		}), 'Ctrl+alfa');
	});

	it('prepends Alt', function () {
		deepEqual(mod.LBXShortcutString({
			code: 'alfa',
			key: 'bravo',
			altKey: true,
		}), 'Alt+alfa');
	});

	it('prepends Shift', function () {
		deepEqual(mod.LBXShortcutString({
			code: 'alfa',
			key: 'bravo',
			shiftKey: true,
		}), 'Shift+alfa');
	});

	it('prepends Cmd', function () {
		deepEqual(mod.LBXShortcutString({
			code: 'alfa',
			key: 'bravo',
			metaKey: true,
		}), 'Cmd+alfa');
	});

	context('param2', function () {

		it('uses key', function () {
			deepEqual(mod.LBXShortcutString({
				code: 'alfa',
				key: 'bravo',
				metaKey: true,
			}, true), 'Cmd+[bravo]');
		});
	
	});

});
