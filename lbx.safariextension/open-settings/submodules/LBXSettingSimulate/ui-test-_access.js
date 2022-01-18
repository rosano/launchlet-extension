const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().LBXSettingSimulateRoute;

Object.entries({
	LBXSettingSimulate: '.LBXSettingSimulate',

	LBXSettingSimulateHeading: '.LBXSettingSimulateHeading',
	LBXSettingSimulateBlurb: '.LBXSettingSimulateBlurb',

	LBXSettingSimulateCodeStringFieldLabel: '.LBXSettingSimulateCodeStringFieldLabel',
	LBXSettingSimulateCodeStringField: '.LBXSettingSimulateCodeStringField',
	LBXSettingSimulateCodeStringCopyButton: '.LBXSettingSimulateCodeStringCopyButton',

	LBXSettingSimulateKeyStringFieldLabel: '.LBXSettingSimulateKeyStringFieldLabel',
	LBXSettingSimulateKeyStringField: '.LBXSettingSimulateKeyStringField',
	LBXSettingSimulateKeyStringCopyButton: '.LBXSettingSimulateKeyStringCopyButton',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('LBXSettingSimulateUI_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});
	
	it('shows LBXSettingSimulate', function() {
		browser.assert.elements(LBXSettingSimulate, 1);
	});
	
	it('shows LBXSettingSimulateHeading', function() {
		browser.assert.elements(LBXSettingSimulateHeading, 1);
	});
	
	it('shows LBXSettingSimulateBlurb', function() {
		browser.assert.elements(LBXSettingSimulateBlurb, 1);
	});
	
	it('shows LBXSettingSimulateCodeStringFieldLabel', function() {
		browser.assert.elements(LBXSettingSimulateCodeStringFieldLabel, 1);
	});
	
	it('shows LBXSettingSimulateCodeStringField', function() {
		browser.assert.elements(LBXSettingSimulateCodeStringField, 1);
	});
	
	it('shows LBXSettingSimulateCodeStringCopyButton', function() {
		browser.assert.elements(LBXSettingSimulateCodeStringCopyButton, 1);
	});
	
	it('shows LBXSettingSimulateKeyStringFieldLabel', function() {
		browser.assert.elements(LBXSettingSimulateKeyStringFieldLabel, 1);
	});
	
	it('shows LBXSettingSimulateKeyStringField', function() {
		browser.assert.elements(LBXSettingSimulateKeyStringField, 1);
	});
	
	it('shows LBXSettingSimulateKeyStringCopyButton', function() {
		browser.assert.elements(LBXSettingSimulateKeyStringCopyButton, 1);
	});

});
