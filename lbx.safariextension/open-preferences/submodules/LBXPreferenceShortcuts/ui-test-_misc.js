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

context('LBXPreferenceShortcutsMap', function () {

	before(function () {
		return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
			LBXPreferenceShortcutsMap: JSON.stringify({
				'alfa': 'bravo',
			}),
		}));
	});

	context('LBXPreferenceShortcutsItemKeyField', function () {
		
		it('sets value', function () {
			browser.assert.input(LBXPreferenceShortcutsItemKeyField, 'alfa');
		});
	
	});

	context('LBXPreferenceShortcutsItemValueField', function () {
		
		it('sets value', function () {
			browser.assert.input(LBXPreferenceShortcutsItemValueField, 'bravo');
		});
	
	});

});

});
