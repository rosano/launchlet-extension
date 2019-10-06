import { deepEqual } from 'assert';

const kDefaultRoutePath = require('./controller.js').OLSKControllerRoutes().LBXPopoverRoute.OLSKRoutePath;

Object.entries({
	LBXPopover: '.LBXPopover',

	LBXPopoverGenerateKeyButton: '.LBXPopoverGenerateKeyButton',
	LBXPopoverDeleteKeyButton: '.LBXPopoverDeleteKeyButton',
	LBXPopoverPublicKeyField: '.LBXPopoverPublicKeyField',
	LBXPopoverPublicKeyCopyButton: '.LBXPopoverPublicKeyCopyButton',

	LBXPopoverRunAutomaticRecipesField: '.LBXPopoverRunAutomaticRecipesField',
	LBXPopoverRunAutomaticRecipesFieldLabel: '.LBXPopoverRunAutomaticRecipesFieldLabel',

	LBXPopoverShowPreferencesButton: '.LBXPopoverShowPreferencesButton',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LBXPopoverUIAccess', function () {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});
	
	it('shows LBXPopover', function() {
		browser.assert.elements(LBXPopover, 1);
	});
	
	it('shows LBXPopoverGenerateKeyButton', function() {
		browser.assert.elements(LBXPopoverGenerateKeyButton, 1);
	});

	it('hides LBXPopoverDeleteKeyButton', function() {
		browser.assert.elements(LBXPopoverDeleteKeyButton, 0);
	});

	it('hides LBXPopoverPublicKeyField', function() {
		browser.assert.elements(LBXPopoverPublicKeyField, 0);
	});

	it('hides LBXPopoverPublicKeyCopyButton', function() {
		browser.assert.elements(LBXPopoverPublicKeyCopyButton, 0);
	});

	it('shows LBXPopoverRunAutomaticRecipesField', function () {
		browser.assert.elements(LBXPopoverRunAutomaticRecipesField, 1);
	});

	it('shows LBXPopoverRunAutomaticRecipesFieldLabel', function () {
		browser.assert.elements(LBXPopoverRunAutomaticRecipesFieldLabel, 1);
	});

	it('shows LBXPopoverShowPreferencesButton', function () {
		browser.assert.elements(LBXPopoverShowPreferencesButton, 1);
	});
	
	context('GenerateKey', function () {

		before(function () {
			browser.click(LBXPopoverGenerateKeyButton);
		});

		it('hides LBXPopoverGenerateKeyButton', function() {
			browser.assert.elements(LBXPopoverGenerateKeyButton, 0);
		});

		it('shows LBXPopoverDeleteKeyButton', function() {
			browser.assert.elements(LBXPopoverDeleteKeyButton, 1);
		});

		it('shows LBXPopoverPublicKeyField', function() {
			browser.assert.elements(LBXPopoverPublicKeyField, 1);
		});

		it('shows LBXPopoverPublicKeyCopyButton', function() {
			browser.assert.elements(LBXPopoverPublicKeyCopyButton, 1);
		});
		
	});

});
