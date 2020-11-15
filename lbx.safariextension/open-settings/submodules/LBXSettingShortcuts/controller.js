exports.OLSKControllerRoutes = function() {
	return {
		LBXSettingShortcutsRoute: {
			OLSKRoutePath: '/stub/LBXSettingShortcuts',
			OLSKRouteMethod: 'get',
			OLSKRouteFunction (req, res, next) {
				return res.OLSKLayoutRender(require('path').join(__dirname, 'stub-view.ejs'));
			},
			OLSKRouteLanguages: ['en', 'fr', 'es'],
		},
	};
};
