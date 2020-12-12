const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().LBXPopoverRoute;

describe('LBXPopoverUI_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	describe('body', function () {

		it('classes OLSKCommon', function () {
			browser.assert.hasClass('body', 'OLSKCommon');
		});

		it('classes OLSKCommonCapped', function () {
			browser.assert.hasClass('body', 'OLSKCommonCapped');
		});

	});

	context('LBXPopoverGenerateKeyButton', function test_LBXPopoverGenerateKeyButton() {

		before(function () {
			browser.click(LBXPopoverGenerateKeyButton);
		});

		it('fills LBXPopoverPublicKeyField with public key', function() {
			browser.assert.input(LBXPopoverPublicKeyField, '"LBX_TESTING_PUBLIC_KEY"');
		});

	});
	
	context('LBXPopoverPublicKeyField', function () {

		it('sets autofocus', function() {
			browser.assert.attribute(LBXPopoverPublicKeyField, 'autofocus', '');
		});

		it('sets focus', function() {
			browser.assert.hasFocus(LBXPopoverPublicKeyField)
		});
		
	});

	describe('LBXPopoverPublicKeyCopyButton', function() {

		it('sets data-clipboard-target', function () {
			browser.assert.attribute(LBXPopoverPublicKeyCopyButton, 'data-clipboard-target', LBXPopoverPublicKeyField);
		});
		
	});

	describe('LBXPopoverRunAutomaticRecipesField', function() {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				LBXPopoverPreloadPrivateKey: 'alfa',
				LBXPopoverPreloadPublicKey: 'bravo',
				LBXPopoverPreloadDidPair: 'true',
			});
		});

		it('sets type', function () {
			browser.assert.attribute(LBXPopoverRunAutomaticRecipesField, 'type', 'checkbox');
		});

	});

});
