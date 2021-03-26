exports.OLSKControllerRoutes = function() {
	return {
		LBXPopoverRoute: {
			OLSKRoutePath: '/popover',
			OLSKRouteMethod: 'get',
			OLSKRouteFunction (req, res, next) {
				return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'stub-view.ejs'));
			},
			OLSKRouteLanguageCodes: ['en', 'fr', 'es', 'pt'],
		},
	};
};
