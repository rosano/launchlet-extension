exports.OLSKControllerRoutes = function() {
	return {
		LBXPopoverRoute: {
			OLSKRoutePath: '/popover',
			OLSKRouteMethod: 'get',
			OLSKRouteFunction: function (req, res, next) {
				return res.render(require('path').join(__dirname, 'stub-view'));
			},
			OLSKRouteLanguages: ['en'],
		},
	};
};
