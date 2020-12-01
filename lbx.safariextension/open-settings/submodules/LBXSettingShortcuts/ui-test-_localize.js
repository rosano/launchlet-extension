const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().LBXSettingShortcutsRoute;

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

const uLocalized = function (inputData) {
	return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
};

describe(`LBXSettingShortcutsUI_Localize-${ OLSKRoutingLanguage }`, function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			OLSKRoutingLanguage,
		});
	});

	it('localizes LBXSettingShortcutsHeading', function () {
		browser.assert.text(LBXSettingShortcutsHeading, uLocalized('LBXSettingShortcutsHeadingText'));
	});

	it('localizes LBXSettingShortcutsCreateButton', function () {
		browser.assert.text(LBXSettingShortcutsCreateButton, uLocalized('LBXSettingShortcutsCreateButtonText'));
	});	

	context('LBXSettingShortcutsMap', function () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
				LBXSettingShortcutsMap: JSON.stringify({
					'': '',
				}),
			});
		});
		
		it('localizes LBXSettingShortcutsItemKeyField', function () {
			browser.assert.attribute(LBXSettingShortcutsItemKeyField, 'placeholder', uLocalized('LBXSettingShortcutsItemKeyFieldPlaceholderText'));
		});
		
		it('localizes LBXSettingShortcutsItemValueField', function () {
			browser.assert.attribute(LBXSettingShortcutsItemValueField, 'placeholder', uLocalized('LBXSettingShortcutsItemValueFieldPlaceholderText'));
		});
		
		it('localizes LBXSettingShortcutsItemDeleteButton', function () {
			browser.assert.text(LBXSettingShortcutsItemDeleteButton, uLocalized('LBXSettingShortcutsItemDeleteButtonText'));
		});
	
	});

});

});
