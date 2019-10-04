import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().LBXPreferenceSimulateRoute;

describe('LBXPreferenceSimulateUIMisc', function () {

before(function() {
	return browser.visit(kDefaultRoute.OLSKRoutePath);
});

describe('keydown', function() {
	
	before(function () {
		browser.assert.input(LBXPreferenceSimulateCodeStringField, '');
		browser.assert.input(LBXPreferenceSimulateKeyStringField, '');
	});

	before(function () {
		browser.OLSKFireKeyboardEvent(browser.window, 'a', {
			code: 'KeyA',
			ctrlKey: true,
		});
	});

	it('sets LBXPreferenceSimulateCodeStringField', function () {
		browser.assert.input(LBXPreferenceSimulateCodeStringField, 'Ctrl+KeyA');
	});

	it('sets LBXPreferenceSimulateKeyStringField', function () {
		browser.assert.input(LBXPreferenceSimulateKeyStringField, 'Ctrl+[a]');
	});

});

});
