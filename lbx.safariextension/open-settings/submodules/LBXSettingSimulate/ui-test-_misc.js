import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().LBXSettingSimulateRoute;

describe('LBXSettingSimulateUIMisc', function () {

before(function() {
	return browser.visit(kDefaultRoute.OLSKRoutePath);
});

describe('keydown', function() {

	before(function () {
		browser.assert.input(LBXSettingSimulateCodeStringField, '');
		browser.assert.input(LBXSettingSimulateKeyStringField, '');
	});

	context('with modifier key', function () {

		before(function () {
			browser.OLSKFireKeyboardEvent(browser.window, 'a', {
				code: 'KeyA',
				ctrlKey: true,
			});
		});

		it('sets LBXSettingSimulateCodeStringField', function () {
			browser.assert.input(LBXSettingSimulateCodeStringField, 'Ctrl+KeyA');
		});

		it('sets LBXSettingSimulateKeyStringField', function () {
			browser.assert.input(LBXSettingSimulateKeyStringField, 'Ctrl+[a]');
		});

	});

	context('with no modifier key', function () {

		before(function () {
			browser.OLSKFireKeyboardEvent(browser.window, 'b', {
				code: 'KeyB',
			});
		});

		it('does nothing', function () {
			browser.assert.input(LBXSettingSimulateCodeStringField, 'Ctrl+KeyA');
			browser.assert.input(LBXSettingSimulateKeyStringField, 'Ctrl+[a]');
		});

	});

});

describe('LBXSettingSimulateCodeStringCopyButton', function() {

	it('sets data-clipboard-target', function () {
		browser.assert.attribute(LBXSettingSimulateCodeStringCopyButton, 'data-clipboard-target', LBXSettingSimulateCodeStringField);
	});

});

describe('LBXSettingSimulateKeyStringCopyButton', function() {

	it('sets data-clipboard-target', function () {
		browser.assert.attribute(LBXSettingSimulateKeyStringCopyButton, 'data-clipboard-target', LBXSettingSimulateKeyStringField);
	});

});

});
