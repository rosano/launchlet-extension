import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().LBXPreferenceSimulateRoute;

Object.entries({
	LBXPreferenceSimulate: '.LBXPreferenceSimulate',

	LBXPreferenceSimulateHeading: '.LBXPreferenceSimulateHeading',
	LBXPreferenceSimulateBlurb: '.LBXPreferenceSimulateBlurb',

	LBXPreferenceSimulateCodeStringFieldLabel: '.LBXPreferenceSimulateCodeStringFieldLabel',
	LBXPreferenceSimulateCodeStringField: '.LBXPreferenceSimulateCodeStringField',
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

});
