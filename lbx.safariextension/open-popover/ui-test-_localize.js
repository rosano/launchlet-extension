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

	context('Startup', function testStartup() {

		it('localizes LBXPopoverGenerateKeyButton', function() {
			browser.assert.text(LBXPopoverGenerateKeyButton, uLocalized('LBXPopoverGenerateKeyButtonText'))
		});
		
	});

	context('DidGenerate', function testDidGenerate() {

		before(async function () {
			browser.click(LBXPopoverGenerateKeyButton)
			await browser.wait({ element: LBXPopoverPublicKeyField })
		});

		it('localizes LBXPopoverDisconnectButton', function() {
			browser.assert.text(LBXPopoverDisconnectButton, uLocalized('LBXPopoverDisconnectButtonText'))
		});

	});

});

});
