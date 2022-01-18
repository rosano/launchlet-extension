const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().LBXSettingsRoute;

Object.entries({
	LBXSettings: '.LBXSettings',
	
	LBXSettingsGuideLink: '.LBXSettingsGuideLink',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('LBXSettingsUI_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});
	
	it('shows LBXSettings', function() {
		browser.assert.elements(LBXSettings, 1);
	});

	it('shows LBXSettingsGuideLink', function () {
		browser.assert.elements(LBXSettingsGuideLink, 1);
	});
	
	it('shows LBXSettingShortcuts', function() {
		browser.assert.elements('.LBXSettingShortcuts', 1);
	});
	
	it('shows LBXSettingSimulate', function() {
		browser.assert.elements('.LBXSettingSimulate', 1);
	});

});
