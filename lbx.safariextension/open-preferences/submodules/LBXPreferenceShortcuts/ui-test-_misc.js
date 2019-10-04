import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().LBXPreferenceShortcutsRoute;

describe('LBXPreferenceShortcutsUIMisc', function () {

	before(function() {
		return browser.visit(kDefaultRoute.OLSKRoutePath);
	});

});
