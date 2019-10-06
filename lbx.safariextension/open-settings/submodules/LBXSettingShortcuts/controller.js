exports.OLSKControllerRoutes = function() {
	return {
		LBXSettingShortcutsRoute: {
			OLSKRoutePath: '/stubs/LBXSettingShortcuts',
			OLSKRouteMethod: 'get',
			OLSKRouteFunction: function (req, res, next) {
				return res.render(require('path').join(__dirname, 'stub-view.ejs'));
			},
			OLSKRouteLanguages: ['en', 'fr', 'es'],
		},
	};
};