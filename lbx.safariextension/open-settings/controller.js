exports.OLSKControllerRoutes = function() {
	return {
		LBXSettingsRoute: {
			OLSKRoutePath: '/settings',
			OLSKRouteMethod: 'get',
			OLSKRouteFunction (req, res, next) {
				return res.send(Object.entries({
					[`<script src="../open-settings/ui-behaviour.js"></script>`]: `<script type="text/javascript">${ require('OLSKDisk').OLSKDiskReadFile(require('path').join(__dirname, 'ui-behaviour.js')).replace('navigator.language', `'${ res.locals.OLSKSharedPageCurrentLanguage }'`) }</script>`,
				}).reduce(function (coll, [search, replace]) {
					return require('OLSKString').OLSKStringPatch(
						coll, search, replace);
				}, require('OLSKDisk').OLSKDiskReadFile(require('path').join(__dirname, 'ui-view.html'))));
			},
			OLSKRouteLanguageCodes: ['en', 'fr', 'es', 'pt'],
		},
	};
};
