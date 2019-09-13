//# OLSKPostinstallExternalAssets

(function OLSKPostinstallExternalAssets() {
	const OLSKAssets = require('./node_modules/OLSKApp/modules/OLSKAssets/main.js');
	const pathPackage = require('path');

	OLSKAssets.OLSKAssetsCopyAssetsFromTo([
		'normalize.css',
		'simplecrypto',
	], pathPackage.join(__dirname, 'node_modules'), pathPackage.join(__dirname, 'lbx.safariextension/-shared/__external'));
})();
