exports.OLSKControllerRoutes = function() {
	return {
		LBXPopoverRoute: {
			OLSKRoutePath: '/popover',
			OLSKRouteMethod: 'get',
			OLSKRouteFunction (req, res, next) {
				return res.OLSKLayoutRender(require('path').join(__dirname, 'stub-view.ejs'));
			},
			OLSKRouteLanguageCodes: ['en', 'fr', 'es'],
		},
	};
};
