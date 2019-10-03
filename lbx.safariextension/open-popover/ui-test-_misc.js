import { deepEqual } from 'assert';

const kDefaultRoutePath = require('./controller.js').OLSKControllerRoutes().LBXPopoverRoute.OLSKRoutePath;

describe('LBXPopoverUIMisc', function () {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});
	
	context('LBXPopoverPublicKeyField', function () {

		before(function () {
			browser.click(LBXPopoverGenerateKeyButton);
		});

		it('sets value', function() {
			browser.assert.input(LBXPopoverPublicKeyField, '"LBX_TESTING_PUBLIC_KEY"');
		});

		it('sets autofocus', function() {
			browser.assert.attribute(LBXPopoverPublicKeyField, 'autofocus', '');
		});

		it('sets focus', function() {
			browser.assert.hasFocus(LBXPopoverPublicKeyField)
			deepEqual(browser.activeElement, browser.query(LBXPopoverPublicKeyField));
		});
		
	});

});
