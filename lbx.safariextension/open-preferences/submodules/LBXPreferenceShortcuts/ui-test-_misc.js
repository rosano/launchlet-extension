import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().LBXPreferenceShortcutsRoute;

describe('LBXPreferenceShortcutsUIMisc', function () {

before(function() {
	return browser.visit(kDefaultRoute.OLSKRoutePath);
});

describe('LBXPreferenceShortcutsCreateButton', function() {

	before(function () {
		browser.assert.text('#TestLBXPreferenceShortcutsDispatchCreate', '0')
	});

	before(function () {
		browser.pressButton(LBXPreferenceShortcutsCreateButton)
	});

	it('sends LBXPreferenceShortcutsDispatchCreate', function () {
		browser.assert.text('#TestLBXPreferenceShortcutsDispatchCreate', '1')
	});

});

context('LBXPreferenceShortcutsMap', function () {

	before(function () {
		return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
			LBXPreferenceShortcutsMap: JSON.stringify({
				alfa: 'bravo',
			}),
		}));
	});

	context('LBXPreferenceShortcutsItemKeyField', function () {
		
		it('sets value', function () {
			browser.assert.input(LBXPreferenceShortcutsItemKeyField, 'alfa');
		});
	
	});

	context('LBXPreferenceShortcutsItemValueField', function () {
		
		it('sets value', function () {
			browser.assert.input(LBXPreferenceShortcutsItemValueField, 'bravo');
		});
	
	});

});

context('LBXPreferenceShortcutsItemKeyField', function () {

	before(function () {
		return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
			LBXPreferenceShortcutsMap: JSON.stringify({
				alfa: 'bravo',
			}),
		}));
	});

	before(function () {
		browser.assert.text('#TestLBXPreferenceShortcutsDispatchUpdate', '0')
		browser.assert.text('#TestLBXPreferenceShortcutsDispatchUpdateValue', 'undefined')
	});

	before(function () {
		browser.fill(LBXPreferenceShortcutsItemKeyField, 'alfax');
	});

	it('sends LBXPreferenceShortcutsDispatchUpdate', function () {
		browser.assert.text('#TestLBXPreferenceShortcutsDispatchUpdate', '1')
	});

	it('includes message', function () {
		browser.assert.text('#TestLBXPreferenceShortcutsDispatchUpdateValue', JSON.stringify({
			alfax: 'bravo',
		}))
	});

});

context('LBXPreferenceShortcutsItemValueField', function () {

	before(function () {
		return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
			LBXPreferenceShortcutsMap: JSON.stringify({
				alfa: 'bravo',
			}),
		}));
	});

	before(function () {
		browser.assert.text('#TestLBXPreferenceShortcutsDispatchUpdate', '0')
		browser.assert.text('#TestLBXPreferenceShortcutsDispatchUpdateValue', 'undefined')
	});

	before(function () {
		browser.fill(LBXPreferenceShortcutsItemValueField, 'bravox');
	});

	it('sends LBXPreferenceShortcutsDispatchUpdate', function () {
		browser.assert.text('#TestLBXPreferenceShortcutsDispatchUpdate', '1')
	});

	it('includes message', function () {
		browser.assert.text('#TestLBXPreferenceShortcutsDispatchUpdateValue', JSON.stringify({
			alfa: 'bravox',
		}))
	});

});

context('LBXPreferenceShortcutsItemDeleteButton', function () {

	before(function () {
		return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
			LBXPreferenceShortcutsMap: JSON.stringify({
				alfa: 'bravo',
			}),
		}));
	});

	before(function () {
		browser.assert.text('#TestLBXPreferenceShortcutsDispatchUpdate', '0')
		browser.assert.text('#TestLBXPreferenceShortcutsDispatchUpdateValue', 'undefined')
	});

	before(function () {
		browser.pressButton(LBXPreferenceShortcutsItemDeleteButton);
	});

	it('sends LBXPreferenceShortcutsDispatchUpdate', function () {
		browser.assert.text('#TestLBXPreferenceShortcutsDispatchUpdate', '1')
	});

	it('includes message', function () {
		browser.assert.text('#TestLBXPreferenceShortcutsDispatchUpdateValue', JSON.stringify({}))
	});

});

});
