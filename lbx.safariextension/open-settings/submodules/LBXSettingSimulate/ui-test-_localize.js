import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().LBXSettingSimulateRoute;

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

const uLocalized = function (inputData) {
	return OLSKTestingLocalized(inputData, languageCode);
};

describe(`LBXSettingSimulateUI_Localize-${ languageCode }`, function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			OLSKRoutingLanguage: languageCode,
		});
	});

	it('localizes LBXSettingSimulateHeading', function () {
		browser.assert.text(LBXSettingSimulateHeading, uLocalized('LBXSettingSimulateHeadingText'));
	});

	it('localizes LBXSettingSimulateBlurb', function () {
		deepEqual(browser.query(LBXSettingSimulateBlurb).innerHTML, uLocalized('LBXSettingSimulateBlurbText'));
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
