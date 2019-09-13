import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().LBXPopoverRoute;

describe('LBXPopoverUILink', function () {

	before(function() {
		return browser.visit(kDefaultRoute.OLSKRoutePath);
	});

	context('Startup', function testStartup() {

		before(async function () {
			browser.click(LBXPopoverGenerateKeyButton)
			await browser.wait({ element: LBXPopoverPublicKeyField })
		});

		it('fills LBXPopoverPublicKeyField with public key', function() {
			browser.assert.input(LBXPopoverPublicKeyField, '"LBX_TESTING_PUBLIC_KEY"')
		});

	});

	context('DeleteKey', function testDeleteKey() {

		before(async function () {
			browser.click(LBXPopoverDeleteKeyButton)
			await browser.wait({ element: LBXPopoverPublicKeyField })
		});

		it('show LBXPopoverGenerateKeyButton', function() {
			browser.assert.elements(LBXPopoverGenerateKeyButton, 1)
		});

		it('hides LBXPopoverDeleteKeyButton', function() {
			browser.assert.elements(LBXPopoverDeleteKeyButton, 0)
		});

		it('hides LBXPopoverPublicKeyField', function() {
			browser.assert.elements(LBXPopoverPublicKeyField, 0)
		});

	});

	context('GenerateKey', function testGenerateKey() {

		before(function () {
			return browser.visit(`${ kDefaultRoute.OLSKRoutePath }?LBXPopoverPreloadPrivateKey=alfa&LBXPopoverPreloadPublicKey=bravo`);
		});

		it('hides LBXPopoverGenerateKeyButton', function() {
			browser.assert.elements(LBXPopoverGenerateKeyButton, 0)
		});

		it('show LBXPopoverDeleteKeyButton', function() {
			browser.assert.elements(LBXPopoverDeleteKeyButton, 1)
		});

		it('shows LBXPopoverPublicKeyField', function() {
			browser.assert.elements(LBXPopoverPublicKeyField, 1)
		});

		it('fills LBXPopoverPublicKeyField with LBXPopoverPreloadPublicKey', function() {
			browser.assert.input(LBXPopoverPublicKeyField, 'bravo')
		});

	});

	context('DidLink', function testDidLink() {

		before(function () {
			return browser.visit(`${ kDefaultRoute.OLSKRoutePath }?LBXPopoverPreloadPrivateKey=alfa&LBXPopoverPreloadPublicKey=bravo&LBXPopoverPreloadDidLink=true`);
		});

		it('hides LBXPopoverGenerateKeyButton', function() {
			browser.assert.elements(LBXPopoverGenerateKeyButton, 0)
		});

		it('show LBXPopoverDeleteKeyButton', function() {
			browser.assert.elements(LBXPopoverDeleteKeyButton, 1)
		});

		it('hides LBXPopoverPublicKeyField', function() {
			browser.assert.elements(LBXPopoverPublicKeyField, 0)
		});

	});

});
