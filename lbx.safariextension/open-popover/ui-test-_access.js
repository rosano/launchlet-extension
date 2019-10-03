import { deepEqual } from 'assert';

const kDefaultRoutePath = require('./controller.js').OLSKControllerRoutes().LBXPopoverRoute.OLSKRoutePath;

Object.entries({
	LBXPopover: '.LBXPopover',

	LBXPopoverGenerateKeyButton: '.LBXPopoverGenerateKeyButton',
	LBXPopoverDeleteKeyButton: '.LBXPopoverDeleteKeyButton',
	LBXPopoverPublicKeyField: '.LBXPopoverPublicKeyField',
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
		
	});

});
