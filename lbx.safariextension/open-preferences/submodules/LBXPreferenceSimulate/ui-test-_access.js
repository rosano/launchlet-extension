import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().LBXPreferenceSimulateRoute;

Object.entries({
	LBXPreferenceSimulate: '.LBXPreferenceSimulate',

	LBXPreferenceSimulateHeading: '.LBXPreferenceSimulateHeading',
	LBXPreferenceSimulateBlurb: '.LBXPreferenceSimulateBlurb',

	LBXPreferenceSimulateCodeStringFieldLabel: '.LBXPreferenceSimulateCodeStringFieldLabel',
	LBXPreferenceSimulateCodeStringField: '.LBXPreferenceSimulateCodeStringField',
	LBXPreferenceSimulateCodeStringCopyButton: '.LBXPreferenceSimulateCodeStringCopyButton',

	LBXPreferenceSimulateKeyStringFieldLabel: '.LBXPreferenceSimulateKeyStringFieldLabel',
	LBXPreferenceSimulateKeyStringField: '.LBXPreferenceSimulateKeyStringField',
	LBXPreferenceSimulateKeyStringCopyButton: '.LBXPreferenceSimulateKeyStringCopyButton',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LBXPreferenceSimulateUIAccess', function () {

	before(function() {
		return browser.visit(kDefaultRoute.OLSKRoutePath);
	});
	
	it('shows LBXPreferenceSimulate', function() {
		browser.assert.elements(LBXPreferenceSimulate, 1);
	});
	
	it('shows LBXPreferenceSimulateHeading', function() {
		browser.assert.elements(LBXPreferenceSimulateHeading, 1);
	});
	
	it('shows LBXPreferenceSimulateBlurb', function() {
		browser.assert.elements(LBXPreferenceSimulateBlurb, 1);
	});
	
	it('shows LBXPreferenceSimulateCodeStringFieldLabel', function() {
		browser.assert.elements(LBXPreferenceSimulateCodeStringFieldLabel, 1);
	});
	
	it('shows LBXPreferenceSimulateCodeStringField', function() {
		browser.assert.elements(LBXPreferenceSimulateCodeStringField, 1);
	});
	
	it('shows LBXPreferenceSimulateCodeStringCopyButton', function() {
		browser.assert.elements(LBXPreferenceSimulateCodeStringCopyButton, 1);
	});
	
	it('shows LBXPreferenceSimulateKeyStringFieldLabel', function() {
		browser.assert.elements(LBXPreferenceSimulateKeyStringFieldLabel, 1);
	});
	
	it('shows LBXPreferenceSimulateKeyStringField', function() {
		browser.assert.elements(LBXPreferenceSimulateKeyStringField, 1);
	});
	
	it('shows LBXPreferenceSimulateKeyStringCopyButton', function() {
		browser.assert.elements(LBXPreferenceSimulateKeyStringCopyButton, 1);
	});

});
