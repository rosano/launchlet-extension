exports.OLSKControllerRoutes = function() {
	return {
		LBXPopoverRoute: {
			OLSKRoutePath: '/popover',
			OLSKRouteMethod: 'get',
			OLSKRouteFunction (req, res, next) {
				return res.render(require('path').join(__dirname, 'stub-view.ejs'));
			},
			OLSKRouteLanguages: ['en', 'fr', 'es'],
		},
	};
};
