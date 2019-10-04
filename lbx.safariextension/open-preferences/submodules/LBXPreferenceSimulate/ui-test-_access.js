import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().LBXPreferenceSimulateRoute;

Object.entries({
	LBXPreferenceSimulate: '.LBXPreferenceSimulate',

	LBXPreferenceSimulateHeading: '.LBXPreferenceSimulateHeading',
	LBXPreferenceSimulateBlurb: '.LBXPreferenceSimulateBlurb',
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

});
