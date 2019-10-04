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

	context('LBXPreferenceShortcutsMap', function () {

		before(function () {
			return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
				LBXPreferenceShortcutsMap: JSON.stringify({
					'': '',
				}),
			}));
		});
		
		it('localizes LBXPreferenceShortcutsItemKeyField', function () {
			browser.assert.attribute(LBXPreferenceShortcutsItemKeyField, 'placeholder', uLocalized('LBXPreferenceShortcutsItemKeyFieldPlaceholderText'));
		});
		
		it('localizes LBXPreferenceShortcutsItemValueField', function () {
			browser.assert.attribute(LBXPreferenceShortcutsItemValueField, 'placeholder', uLocalized('LBXPreferenceShortcutsItemValueFieldPlaceholderText'));
		});
		
		it('localizes LBXPreferenceShortcutsItemDeleteButton', function () {
			browser.assert.text(LBXPreferenceShortcutsItemDeleteButton, uLocalized('LBXPreferenceShortcutsItemDeleteButtonText'));
		});
	
	});

});

});
