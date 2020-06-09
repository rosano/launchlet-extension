const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().LBXSettingShortcutsRoute;

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

const uLocalized = function (inputData) {
	return OLSKTestingLocalized(inputData, languageCode);
};

describe(`LBXSettingShortcutsUI_Localize-${ languageCode }`, function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			OLSKRoutingLanguage: languageCode,
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
				OLSKRoutingLanguage: languageCode,
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
