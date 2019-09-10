import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().LBXPopoverRoute;

describe('LBXPopoverUILink', function () {

	before(function() {
		return browser.visit(kDefaultRoute.OLSKRoutePath);
	});

	context('Startup', function testStartup() {

		before(async function () {
			browser.click(LBXPopoverGenerateButton)
			await browser.wait({ element: LBXPopoverPublicKeyField })
		});

		it('fills LBXPopoverPublicKeyField with public key', function() {
			browser.assert.input(LBXPopoverPublicKeyField, 'LBX_TESTING_PUBLIC_KEY')
		});

	});

	context('DidGenerate', function testDidGenerate() {

		before(async function () {
			return browser.visit(`${ kDefaultRoute.OLSKRoutePath }?LBXPopoverInitializingPublicKey=alfa`);
		});

		it('hides LBXPopoverGenerateButton', function() {
			browser.assert.elements(LBXPopoverGenerateButton, 0)
		});

		it('shows LBXPopoverPublicKeyField', function() {
			browser.assert.elements(LBXPopoverPublicKeyField, 1)
		});

		it('fills LBXPopoverPublicKeyField with LBXPopoverInitializingPublicKey', function() {
			browser.assert.input(LBXPopoverPublicKeyField, 'alfa')
		});

	});

	context('DidLink', function testDidLink() {

		before(async function () {
			return browser.visit(`${ kDefaultRoute.OLSKRoutePath }?LBXPopoverInitializingPublicKey=alfa&LBXPopoverInitializingDidLink=true`);
		});

		it('hides LBXPopoverGenerateButton', function() {
			browser.assert.elements(LBXPopoverGenerateButton, 0)
		});

		it('hides LBXPopoverPublicKeyField', function() {
			browser.assert.elements(LBXPopoverPublicKeyField, 0)
		});

	});

});
