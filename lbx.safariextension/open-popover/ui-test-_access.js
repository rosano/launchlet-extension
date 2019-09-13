import { deepEqual } from 'assert';

const kDefaultRoutePath = require('./controller.js').OLSKControllerRoutes().LBXPopoverRoute.OLSKRoutePath;

Object.entries({
	LBXPopoverGenerateKeyButton: '.LBXPopoverGenerateKeyButton',
	LBXPopoverDisconnectButton: '.LBXPopoverDisconnectButton',
	LBXPopoverPublicKeyField: '.LBXPopoverPublicKeyField',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LBXPopoverUIAccess', function () {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});
	
	context('Startup', function testStartup() {

		it('shows LBXPopoverGenerateKeyButton', function() {
			browser.assert.elements(LBXPopoverGenerateKeyButton, 1)
		});

		it('hides LBXPopoverDisconnectButton', function() {
			browser.assert.elements(LBXPopoverDisconnectButton, 0)
		});

		it('hides LBXPopoverPublicKeyField', function() {
			browser.assert.elements(LBXPopoverPublicKeyField, 0)
		});
		
	});
	
	context('Generate', function testGenerate() {

		before(async function () {
			browser.click(LBXPopoverGenerateKeyButton)
			await browser.wait({ element: LBXPopoverPublicKeyField })
		});

		it('hides LBXPopoverGenerateKeyButton', function() {
			browser.assert.elements(LBXPopoverGenerateKeyButton, 0)
		});

		it('shows LBXPopoverDisconnectButton', function() {
			browser.assert.elements(LBXPopoverDisconnectButton, 1)
		});

		it('shows LBXPopoverPublicKeyField', function() {
			browser.assert.elements(LBXPopoverPublicKeyField, 1)
		});
		
	});

});
