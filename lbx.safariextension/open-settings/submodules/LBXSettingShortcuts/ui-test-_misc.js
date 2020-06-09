const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().LBXSettingShortcutsRoute;

describe('LBXSettingShortcutsUI_Misc', function () {

before(function() {
	return browser.OLSKVisit(kDefaultRoute);
});

describe('LBXSettingShortcutsCreateButton', function() {

	before(function () {
		browser.assert.text('#TestLBXSettingShortcutsDispatchCreate', '0')
	});

	before(function () {
		browser.pressButton(LBXSettingShortcutsCreateButton)
	});

	it('sends LBXSettingShortcutsDispatchCreate', function () {
		browser.assert.text('#TestLBXSettingShortcutsDispatchCreate', '1')
	});

});

context('LBXSettingShortcutsMap', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			LBXSettingShortcutsMap: JSON.stringify({
				alfa: 'bravo',
			}),
		});
	});

	context('LBXSettingShortcutsItemKeyField', function () {
		
		it('sets value', function () {
			browser.assert.input(LBXSettingShortcutsItemKeyField, 'alfa');
		});
		
		it('sets autofocus', function () {
			browser.assert.attribute(LBXSettingShortcutsItemKeyField, 'autofocus', '');
		});
	
	});

	context('LBXSettingShortcutsItemValueField', function () {
		
		it('sets value', function () {
			browser.assert.input(LBXSettingShortcutsItemValueField, 'bravo');
		});
	
	});

});

context('LBXSettingShortcutsItemKeyField', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			LBXSettingShortcutsMap: JSON.stringify({
				alfa: 'bravo',
			}),
		});
	});

	before(function () {
		browser.assert.text('#TestLBXSettingShortcutsDispatchUpdate', '0')
		browser.assert.text('#TestLBXSettingShortcutsDispatchUpdateValue', 'undefined')
	});

	before(function () {
		browser.fill(LBXSettingShortcutsItemKeyField, 'alfax');
	});

	it('sends LBXSettingShortcutsDispatchUpdate', function () {
		browser.assert.text('#TestLBXSettingShortcutsDispatchUpdate', '1')
	});

	it('includes message', function () {
		browser.assert.text('#TestLBXSettingShortcutsDispatchUpdateValue', JSON.stringify({
			alfax: 'bravo',
		}))
	});

});

context('LBXSettingShortcutsItemValueField', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			LBXSettingShortcutsMap: JSON.stringify({
				alfa: 'bravo',
			}),
		});
	});

	before(function () {
		browser.assert.text('#TestLBXSettingShortcutsDispatchUpdate', '0')
		browser.assert.text('#TestLBXSettingShortcutsDispatchUpdateValue', 'undefined')
	});

	before(function () {
		browser.fill(LBXSettingShortcutsItemValueField, 'bravox');
	});

	it('sends LBXSettingShortcutsDispatchUpdate', function () {
		browser.assert.text('#TestLBXSettingShortcutsDispatchUpdate', '1')
	});

	it('includes message', function () {
		browser.assert.text('#TestLBXSettingShortcutsDispatchUpdateValue', JSON.stringify({
			alfa: 'bravox',
		}))
	});

});

context('LBXSettingShortcutsItemDeleteButton', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			LBXSettingShortcutsMap: JSON.stringify({
				alfa: 'bravo',
			}),
		});
	});

	before(function () {
		browser.assert.text('#TestLBXSettingShortcutsDispatchUpdate', '0')
		browser.assert.text('#TestLBXSettingShortcutsDispatchUpdateValue', 'undefined')
	});

	before(function () {
		browser.pressButton(LBXSettingShortcutsItemDeleteButton);
	});

	it('sends LBXSettingShortcutsDispatchUpdate', function () {
		browser.assert.text('#TestLBXSettingShortcutsDispatchUpdate', '1')
	});

	it('includes message', function () {
		browser.assert.text('#TestLBXSettingShortcutsDispatchUpdateValue', JSON.stringify({}))
	});

});

});
