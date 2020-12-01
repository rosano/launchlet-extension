const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().LBXSettingsRoute;

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

const uLocalized = function (inputData) {
	return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
};

describe(`LBXSettingsUI_Localize-${ OLSKRoutingLanguage }`, function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			OLSKRoutingLanguage,
		});
	});

	it('localizes LBXSettingsGuideLink', function () {
		browser.assert.text(LBXSettingsGuideLink, uLocalized('LBXSettingsGuideLinkText'));
	});

});

});
