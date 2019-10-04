import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().LBXPreferenceShortcutsRoute;

describe('LBXPreferenceShortcutsUIMisc', function () {

before(function() {
	return browser.visit(kDefaultRoute.OLSKRoutePath);
});

describe('LBXPreferenceShortcutsCreateButton', function() {

	before(function () {
		browser.assert.text('#TestLBXPreferenceShortcutsDispatchCreate', '0')
	});

	before(function () {
		browser.pressButton(LBXPreferenceShortcutsCreateButton)
	});

	it('sends LBXPreferenceShortcutsDispatchCreate', function () {
		browser.assert.text('#TestLBXPreferenceShortcutsDispatchCreate', '1')
	});

});

});
