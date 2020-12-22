exports.OLSKControllerRoutes = function() {
	return {
		LBXSettingsRoute: {
			OLSKRoutePath: '/settings',
			OLSKRouteMethod: 'get',
			OLSKRouteFunction (req, res, next) {
				return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'ui-view.html'));
			},
			OLSKRouteLanguageCodes: ['en', 'fr', 'es'],
		},
	};
};
