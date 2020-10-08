const { throws, deepEqual } = require('assert');

const mainModule = require('./main.js');

describe('LBXShortcutValidation', function test_LBXShortcutValidation() {

	it('throws if not string', function () {
		throws(function () {
			mainModule.LBXShortcutValidation(null)
		}, /LBXErrorInputNotValid/);
	});

	it('returns function', function() {
		deepEqual(typeof mainModule.LBXShortcutValidation(''), 'function');
	});

	context('function', function () {
		
		it('throws if not object', function () {
			throws(function () {
				mainModule.LBXShortcutValidation('')(null)
			}, /LBXErrorInputNotValid/);
		});

		it('throws if code not string', function () {
			throws(function () {
				mainModule.LBXShortcutValidation('')({
					code: null,
				})
			}, /LBXErrorInputNotValid/);
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

describe('LBXShortcutString', function test_LBXShortcutString() {

	it('throws if not object', function () {
		throws(function () {
			mainModule.LBXShortcutString(null)
		}, /LBXErrorInputNotValid/);
	});

	it('throws if code not string', function () {
		throws(function () {
			mainModule.LBXShortcutString({
				code: null,
				key: 'alfa',
			})
		}, /LBXErrorInputNotValid/);
	});

	it('throws if key not string', function () {
		throws(function () {
			mainModule.LBXShortcutString({
				code: 'alfa',
				key: null,
			})
		}, /LBXErrorInputNotValid/);
	});

	it('returns string', function () {
		deepEqual(mainModule.LBXShortcutString({
			code: 'alfa',
			key: 'bravo',
		}), '');
	});

	it('ignores if Ctrl', function () {
		deepEqual(mainModule.LBXShortcutString({
			code: 'alfa',
			key: 'Control',
			ctrlKey: true,
		}), '');
	});

	it('ignores if Cmd', function () {
		deepEqual(mainModule.LBXShortcutString({
			code: 'alfa',
			key: 'Meta',
			metaKey: true,
		}), '');
	});

	it('ignores if Alt', function () {
		deepEqual(mainModule.LBXShortcutString({
			code: 'alfa',
			key: 'Alt',
			altKey: true,
		}), '');
	});

	it('ignores if Shift', function () {
		deepEqual(mainModule.LBXShortcutString({
			code: 'alfa',
			key: 'Shift',
			shiftKey: true,
		}), '');
	});

	it('ignores if Tab', function () {
		deepEqual(mainModule.LBXShortcutString({
			code: 'Tab',
			key: 'Tab',
			shiftKey: true,
		}), '');
	});

	it('prepends Ctrl', function () {
		deepEqual(mainModule.LBXShortcutString({
			code: 'alfa',
			key: 'bravo',
			ctrlKey: true,
		}), 'Ctrl+alfa');
	});

	it('prepends Alt', function () {
		deepEqual(mainModule.LBXShortcutString({
			code: 'alfa',
			key: 'bravo',
			altKey: true,
		}), 'Alt+alfa');
	});

	it('prepends Shift', function () {
		deepEqual(mainModule.LBXShortcutString({
			code: 'alfa',
			key: 'bravo',
			shiftKey: true,
		}), 'Shift+alfa');
	});

	it('prepends Cmd', function () {
		deepEqual(mainModule.LBXShortcutString({
			code: 'alfa',
			key: 'bravo',
			metaKey: true,
		}), 'Cmd+alfa');
	});

	context('param2', function () {

		it('uses key', function () {
			deepEqual(mainModule.LBXShortcutString({
				code: 'alfa',
				key: 'bravo',
				metaKey: true,
			}, true), 'Cmd+[bravo]');
		});
	
	});

});
