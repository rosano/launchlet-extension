import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().LBXPopoverRoute;

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

const uLocalized = function (inputData) {
	return OLSKTestingLocalized(inputData, languageCode);
};

describe(`LBXPopoverUILocalize-${ languageCode }`, function () {

	before(function() {
		return browser.visit(`${ languageCode }${ kDefaultRoute.OLSKRoutePath }`);
	});

	it('localizes LBXPopoverGenerateKeyButton', function() {
		browser.assert.text(LBXPopoverGenerateKeyButton, uLocalized('LBXPopoverGenerateKeyButtonText'))
	});

	it('localizes LBXPopoverShowPreferencesButton', function() {
		browser.assert.text(LBXPopoverShowPreferencesButton, uLocalized('LBXPopoverShowPreferencesButtonText'))
	});

	context('GenerateKey', function testGenerateKey() {

		before(function () {
			browser.click(LBXPopoverGenerateKeyButton)
		});

		it('localizes LBXPopoverDeleteKeyButton', function() {
			browser.assert.text(LBXPopoverDeleteKeyButton, uLocalized('LBXPopoverDeleteKeyButtonText'))
		});

	});

});

});
