import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().LBXPreferenceShortcutsRoute;

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

const uLocalized = function (inputData) {
	return OLSKTestingLocalized(inputData, languageCode);
};

describe(`LBXPreferenceShortcutsUILocalize-${ languageCode }`, function () {

	before(function() {
		return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
			OLSKRoutingLanguage: languageCode,
		}));
	});

	it('localizes LBXPreferenceShortcutsHeading', function () {
		browser.assert.text(LBXPreferenceShortcutsHeading, uLocalized('LBXPreferenceShortcutsHeadingText'));
	});

	it('localizes LBXPreferenceShortcutsCreateButton', function () {
		browser.assert.text(LBXPreferenceShortcutsCreateButton, uLocalized('LBXPreferenceShortcutsCreateButtonText'));
	});

});

});
