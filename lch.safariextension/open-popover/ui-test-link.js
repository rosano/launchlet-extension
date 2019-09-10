import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().LBXPopoverRoute;

describe('LBXPopoverUILink', function () {

	before(function() {
		return browser.visit(kDefaultRoute.OLSKRoutePath);
	});

	context('Generate', function testGenerate() {

		before(async function () {
			browser.click(LBXPopoverGenerateButton)
			await browser.wait({ element: LBXPopoverPublicKeyField })
		});

		it('fills LBXPopoverPublicKeyField with public key', function() {
			browser.assert.input(LBXPopoverPublicKeyField, 'LBX_TESTING_PUBLIC_KEY')
		});

	});

});
