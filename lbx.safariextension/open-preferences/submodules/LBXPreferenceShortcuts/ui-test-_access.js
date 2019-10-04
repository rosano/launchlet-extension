import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().LBXPreferenceShortcutsRoute;

Object.entries({
	LBXPreferenceShortcuts: '.LBXPreferenceShortcuts',

	LBXPreferenceShortcutsHeading: '.LBXPreferenceShortcutsHeading',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LBXPreferenceShortcutsUIAccess', function () {

	before(function() {
		return browser.visit(kDefaultRoute.OLSKRoutePath);
	});
	
	it('shows LBXPreferenceShortcuts', function() {
		browser.assert.elements(LBXPreferenceShortcuts, 1);
	});
	
	it('shows LBXPreferenceShortcutsHeading', function() {
		browser.assert.elements(LBXPreferenceShortcutsHeading, 1);
	});

});
