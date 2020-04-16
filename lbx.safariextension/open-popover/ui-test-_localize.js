import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().LBXPopoverRoute;

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

const uLocalized = function (inputData) {
	return OLSKTestingLocalized(inputData, languageCode);
};

describe(`LBXPopoverUI_Localize-${ languageCode }`, function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			OLSKRoutingLanguage: languageCode,
		});

	});

	it('localizes LBXPopoverGenerateKeyButton', function() {
		browser.assert.text(LBXPopoverGenerateKeyButton, uLocalized('LBXPopoverGenerateKeyButtonText'))
	});

	context('GenerateKey', function test_GenerateKey() {

		before(function () {
			browser.click(LBXPopoverGenerateKeyButton)
		});

		it('localizes LBXPopoverPublicKeyCopyButton', function() {
			browser.assert.text(LBXPopoverPublicKeyCopyButton, uLocalized('LBXPopoverPublicKeyCopyButtonText'))
		});

		it('localizes LBXPopoverDeleteKeyButton', function() {
			browser.assert.text(LBXPopoverDeleteKeyButton, uLocalized('LBXPopoverDeleteKeyButtonText'))
		});

	});

	context('DidPair', function test_DidPair() {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage: languageCode,
				LBXPopoverPreloadPrivateKey: 'alfa',
				LBXPopoverPreloadPublicKey: 'bravo',
				LBXPopoverPreloadDidPair: 'true',
			});
		});

		it('localizes LBXPopoverRunAutomaticRecipesFieldLabel', function() {
			browser.assert.text(LBXPopoverRunAutomaticRecipesFieldLabel, uLocalized('LBXPopoverRunAutomaticRecipesFieldLabelText'))
		});

		it('localizes LBXPopoverShowSettingsButton', function() {
			browser.assert.text(LBXPopoverShowSettingsButton, uLocalized('LBXPopoverShowSettingsButtonText'))
		});

	});

});

});
