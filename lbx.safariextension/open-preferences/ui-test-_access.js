import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().LBXPreferencesRoute;

Object.entries({
	LBXPreferences: '.LBXPreferences',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LBXPreferencesUIAccess', function () {

	before(function() {
		return browser.visit(kDefaultRoute.OLSKRoutePath);
	});
	
	it('shows LBXPreferences', function() {
		browser.assert.elements(LBXPreferences, 1);
	});
	
	it('shows LBXPreferenceShortcuts', function() {
		browser.assert.elements('.LBXPreferenceShortcuts', 1);
	});

});
