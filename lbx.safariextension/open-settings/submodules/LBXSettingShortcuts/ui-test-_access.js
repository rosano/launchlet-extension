const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().LBXSettingShortcutsRoute;

Object.entries({
	LBXSettingShortcuts: '.LBXSettingShortcuts',

	LBXSettingShortcutsHeading: '.LBXSettingShortcutsHeading',
	
	LBXSettingShortcutsCreateButton: '.LBXSettingShortcutsCreateButton',
	
	LBXSettingShortcutsItem: '.LBXSettingShortcutsItem',
	LBXSettingShortcutsItemKeyField: '.LBXSettingShortcutsItemKeyField',
	LBXSettingShortcutsItemValueField: '.LBXSettingShortcutsItemValueField',
	LBXSettingShortcutsItemDeleteButton: '.LBXSettingShortcutsItemDeleteButton',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('LBXSettingShortcutsUI_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});
	
	it('shows LBXSettingShortcuts', function() {
		browser.assert.elements(LBXSettingShortcuts, 1);
	});
	
	it('shows LBXSettingShortcutsHeading', function() {
		browser.assert.elements(LBXSettingShortcutsHeading, 1);
	});

	it('shows LBXSettingShortcutsCreateButton', function () {
		browser.assert.elements(LBXSettingShortcutsCreateButton, 1);
	});

	it('hides LBXSettingShortcutsItem', function () {
		browser.assert.elements(LBXSettingShortcutsItem, 0);
	});

	context('LBXSettingShortcutsMap', function () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				LBXSettingShortcutsMap: JSON.stringify({
					'': '',
				}),
			});
		});
		
		it('shows LBXSettingShortcutsItem', function () {
			browser.assert.elements(LBXSettingShortcutsItem, 1);
		});
		
		it('shows LBXSettingShortcutsItemKeyField', function () {
			browser.assert.elements(LBXSettingShortcutsItemKeyField, 1);
		});
		
		it('shows LBXSettingShortcutsItemValueField', function () {
			browser.assert.elements(LBXSettingShortcutsItemValueField, 1);
		});
		
		it('shows LBXSettingShortcutsItemDeleteButton', function () {
			browser.assert.elements(LBXSettingShortcutsItemDeleteButton, 1);
		});
	
	});

});
