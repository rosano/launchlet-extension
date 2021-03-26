exports.OLSKControllerRoutes = function() {
	return {
		LBXSettingShortcutsRoute: {
			OLSKRoutePath: '/stub/LBXSettingShortcuts',
			OLSKRouteMethod: 'get',
			OLSKRouteFunction (req, res, next) {
				return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'stub-view.ejs'));
			},
			OLSKRouteLanguageCodes: ['en', 'fr', 'es', 'pt'],
		},
	};
};
