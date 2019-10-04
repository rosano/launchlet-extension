import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().LBXPreferencesRoute;

describe('LBXPreferencesUIMisc', function () {

before(function() {
	return browser.visit(kDefaultRoute.OLSKRoutePath);
});

describe('LBXPreferencesGuideLink', function () {
	
	it('sets href', function () {
		browser.assert.attribute(LBXPreferencesGuideLink, 'href', 'https://launchlet.dev/guide');
	});

	it('sets target', function () {
		browser.assert.attribute(LBXPreferencesGuideLink, 'target', '_blank');
	});

});

});
