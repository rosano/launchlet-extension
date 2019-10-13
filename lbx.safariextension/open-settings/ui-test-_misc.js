import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().LBXSettingsRoute;

describe('LBXSettingsUIMisc', function () {

before(function() {
	return browser.visit(kDefaultRoute.OLSKRoutePath);
});

describe('LBXSettingsGuideLink', function () {

	it('sets href', function () {
		browser.assert.attribute(LBXSettingsGuideLink, 'href', 'https://launchlet.dev/guide');
	});

	it('sets target', function () {
		browser.assert.attribute(LBXSettingsGuideLink, 'target', '_blank');
	});

});

});
