import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().LBXPreferenceSimulateRoute;

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

const uLocalized = function (inputData) {
	return OLSKTestingLocalized(inputData, languageCode);
};

describe(`LBXPreferenceSimulateUILocalize-${ languageCode }`, function () {

	before(function() {
		return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
			OLSKRoutingLanguage: languageCode,
		}));
	});

	it('localizes LBXPreferenceSimulateHeading', function () {
		browser.assert.text(LBXPreferenceSimulateHeading, uLocalized('LBXPreferenceSimulateHeadingText'));
	});

	it('localizes LBXPreferenceSimulateBlurb', function () {
		deepEqual(browser.query(LBXPreferenceSimulateBlurb).innerHTML, uLocalized('LBXPreferenceSimulateBlurbText'));
	});

});

});
