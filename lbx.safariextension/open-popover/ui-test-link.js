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

	context('Disconnect', function testDisconnect() {

		before(async function () {
			browser.click(LBXPopoverDisconnectButton)
			await browser.wait({ element: LBXPopoverPublicKeyField })
		});

		it('show LBXPopoverGenerateButton', function() {
			browser.assert.elements(LBXPopoverGenerateButton, 1)
		});

		it('hides LBXPopoverDisconnectButton', function() {
			browser.assert.elements(LBXPopoverDisconnectButton, 0)
		});

		it('hides LBXPopoverPublicKeyField', function() {
			browser.assert.elements(LBXPopoverPublicKeyField, 0)
		});

	});

	context('DidGenerate', function testDidGenerate() {

		before(function () {
			return browser.visit(`${ kDefaultRoute.OLSKRoutePath }?LBXPopoverInitializingPublicKey=alfa`);
		});

		it('hides LBXPopoverGenerateButton', function() {
			browser.assert.elements(LBXPopoverGenerateButton, 0)
		});

		it('show LBXPopoverDisconnectButton', function() {
			browser.assert.elements(LBXPopoverDisconnectButton, 1)
		});

		it('shows LBXPopoverPublicKeyField', function() {
			browser.assert.elements(LBXPopoverPublicKeyField, 1)
		});

		it('fills LBXPopoverPublicKeyField with LBXPopoverInitializingPublicKey', function() {
			browser.assert.input(LBXPopoverPublicKeyField, 'alfa')
		});

	});

	context('DidLink', function testDidLink() {

		before(function () {
			return browser.visit(`${ kDefaultRoute.OLSKRoutePath }?LBXPopoverInitializingPublicKey=alfa&LBXPopoverInitializingDidLink=true`);
		});

		it('hides LBXPopoverGenerateButton', function() {
			browser.assert.elements(LBXPopoverGenerateButton, 0)
		});

		it('show LBXPopoverDisconnectButton', function() {
			browser.assert.elements(LBXPopoverDisconnectButton, 1)
		});

		it('hides LBXPopoverPublicKeyField', function() {
			browser.assert.elements(LBXPopoverPublicKeyField, 0)
		});

	});

});