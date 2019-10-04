import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().LBXPreferencesRoute;

describe('LBXPreferencesUIMisc', function () {

	before(function() {
		return browser.visit(kDefaultRoute.OLSKRoutePath);
	});

});
