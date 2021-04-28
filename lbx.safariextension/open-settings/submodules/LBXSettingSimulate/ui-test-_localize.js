const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().LBXSettingSimulateRoute;

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

const uLocalized = function (inputData) {
	return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
};

describe('LBXSettingSimulateUI_Localize-' + OLSKRoutingLanguage, function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			OLSKRoutingLanguage,
		});
	});

	it('localizes LBXSettingSimulateHeading', function () {
		browser.assert.text(LBXSettingSimulateHeading, uLocalized('LBXSettingSimulateHeadingText'));
	});

	it('localizes LBXSettingSimulateBlurb', function () {
		browser.assert.OLSKInnerHTML(LBXSettingSimulateBlurb, uLocalized('LBXSettingSimulateBlurbText'));
	});

	it('localizes LBXSettingSimulateCodeStringFieldLabel', function () {
		browser.assert.text(LBXSettingSimulateCodeStringFieldLabel, uLocalized('LBXSettingSimulateCodeStringFieldLabelText'));
	});

	it('localizes LBXSettingSimulateCodeStringCopyButton', function () {
		browser.assert.text(LBXSettingSimulateCodeStringCopyButton, uLocalized('LBXSettingSimulateSharedCopyButtonText'));
	});

	it('localizes LBXSettingSimulateKeyStringFieldLabel', function () {
		browser.assert.text(LBXSettingSimulateKeyStringFieldLabel, uLocalized('LBXSettingSimulateKeyStringFieldLabelText'));
	});

	it('localizes LBXSettingSimulateKeyStringCopyButton', function () {
		browser.assert.text(LBXSettingSimulateKeyStringCopyButton, uLocalized('LBXSettingSimulateSharedCopyButtonText'));
	});

});

});
