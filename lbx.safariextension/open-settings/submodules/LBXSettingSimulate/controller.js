exports.OLSKControllerRoutes = function() {
	return {
		LBXSettingSimulateRoute: {
			OLSKRoutePath: '/stub/LBXSettingSimulate',
			OLSKRouteMethod: 'get',
			OLSKRouteFunction (req, res, next) {
				return res.OLSKLayoutRender(require('path').join(__dirname, 'stub-view.ejs'));
			},
			OLSKRouteLanguages: ['en', 'fr', 'es'],
		},
	};
};
