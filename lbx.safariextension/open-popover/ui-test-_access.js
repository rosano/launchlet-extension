import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().LBXPopoverRoute;

Object.entries({
	LBXPopover: '.LBXPopover',

	LBXPopoverGenerateKeyButton: '.LBXPopoverGenerateKeyButton',
	LBXPopoverDeleteKeyButton: '.LBXPopoverDeleteKeyButton',
	LBXPopoverPublicKeyField: '.LBXPopoverPublicKeyField',
	LBXPopoverPublicKeyCopyButton: '.LBXPopoverPublicKeyCopyButton',

	LBXPopoverRunAutomaticRecipesField: '.LBXPopoverRunAutomaticRecipesField',
	LBXPopoverRunAutomaticRecipesFieldLabel: '.LBXPopoverRunAutomaticRecipesFieldLabel',

	LBXPopoverShowSettingsButton: '.LBXPopoverShowSettingsButton',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LBXPopoverUIAccess', function () {

	before(function() {
		return browser.visit(kDefaultRoute.OLSKRoutePath);
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

	it('hides LBXPopoverRunAutomaticRecipesField', function () {
		browser.assert.elements(LBXPopoverRunAutomaticRecipesField, 0);
	});

	it('hides LBXPopoverRunAutomaticRecipesFieldLabel', function () {
		browser.assert.elements(LBXPopoverRunAutomaticRecipesFieldLabel, 0);
	});

	it('hides LBXPopoverShowSettingsButton', function () {
		browser.assert.elements(LBXPopoverShowSettingsButton, 0);
	});
	
	context('GenerateKey', function testGenerateKey() {

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

		it('hides LBXPopoverRunAutomaticRecipesField', function () {
			browser.assert.elements(LBXPopoverRunAutomaticRecipesField, 0);
		});

		it('hides LBXPopoverRunAutomaticRecipesFieldLabel', function () {
			browser.assert.elements(LBXPopoverRunAutomaticRecipesFieldLabel, 0);
		});

		it('hides LBXPopoverShowSettingsButton', function () {
			browser.assert.elements(LBXPopoverShowSettingsButton, 0);
		});
		
	});

	context('DidPair', function testDidPair() {

		before(function () {
			return browser.visit(`${ kDefaultRoute.OLSKRoutePath }?LBXPopoverPreloadPrivateKey=alfa&LBXPopoverPreloadPublicKey=bravo&LBXPopoverPreloadDidPair=true`);
		});

		it('hides LBXPopoverPublicKeyField', function() {
			browser.assert.elements(LBXPopoverPublicKeyField, 0);
		});

		it('hides LBXPopoverPublicKeyCopyButton', function() {
			browser.assert.elements(LBXPopoverPublicKeyCopyButton, 0);
		});

		it('shows LBXPopoverDeleteKeyButton', function() {
			browser.assert.elements(LBXPopoverDeleteKeyButton, 1);
		});

		it('shows LBXPopoverRunAutomaticRecipesField', function () {
			browser.assert.elements(LBXPopoverRunAutomaticRecipesField, 1);
		});

		it('shows LBXPopoverRunAutomaticRecipesFieldLabel', function () {
			browser.assert.elements(LBXPopoverRunAutomaticRecipesFieldLabel, 1);
		});

		it('shows LBXPopoverShowSettingsButton', function () {
			browser.assert.elements(LBXPopoverShowSettingsButton, 1);
		});

	});

	context('DeleteKey', function testDeleteKey() {

		before(function () {
			browser.click(LBXPopoverDeleteKeyButton);
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

	});

});
