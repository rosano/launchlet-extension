import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().LBXPreferenceSimulateRoute;

describe('LBXPreferenceSimulateUIMisc', function () {

before(function() {
	return browser.visit(kDefaultRoute.OLSKRoutePath);
});

});
