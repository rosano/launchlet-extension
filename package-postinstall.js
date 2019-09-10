//# OLSKPostinstallExternalAssets

(function OLSKPostinstallExternalAssets() {
	const OLSKAssets = require('./node_modules/OLSKApp/modules/OLSKAssets/main.js');
	const pathPackage = require('path');

	OLSKAssets.OLSKAssetsCopyAssetsFromTo([
		'normalize.css',
	], pathPackage.join(__dirname, 'node_modules'), pathPackage.join(__dirname, 'lch.safariextension/-shared/--external'));
})();
