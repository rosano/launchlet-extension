import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().LBXPreferenceShortcutsRoute;

Object.entries({
	LBXPreferenceShortcuts: '.LBXPreferenceShortcuts',

	LBXPreferenceShortcutsHeading: '.LBXPreferenceShortcutsHeading',
	
	LBXPreferenceShortcutsCreateButton: '.LBXPreferenceShortcutsCreateButton',
	
	LBXPreferenceShortcutsItem: '.LBXPreferenceShortcutsItem',
	LBXPreferenceShortcutsItemKeyField: '.LBXPreferenceShortcutsItemKeyField',
	LBXPreferenceShortcutsItemValueField: '.LBXPreferenceShortcutsItemValueField',
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

	it('shows LBXPreferenceShortcutsCreateButton', function () {
		browser.assert.elements(LBXPreferenceShortcutsCreateButton, 1);
	});

	it('hides LBXPreferenceShortcutsItem', function () {
		browser.assert.elements(LBXPreferenceShortcutsItem, 0);
	});

	context('LBXPreferenceShortcutsMap', function () {

		before(function () {
			return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
				LBXPreferenceShortcutsMap: JSON.stringify({
					'': '',
				}),
			}));
		});
		
		it('shows LBXPreferenceShortcutsItem', function () {
			browser.assert.elements(LBXPreferenceShortcutsItem, 1);
		});
		
		it('shows LBXPreferenceShortcutsItemKeyField', function () {
			browser.assert.elements(LBXPreferenceShortcutsItemKeyField, 1);
		});
		
		it('shows LBXPreferenceShortcutsItemValueField', function () {
			browser.assert.elements(LBXPreferenceShortcutsItemValueField, 1);
		});
	
	});

});
