//# ROCOHotfixSimplecryptoForUITests

(function ROCOHotfixSimplecryptoForUITests() {
	if (process.env.NODE_ENV === 'production') {
		return;
	}

	let filePath = './node_modules/simplecrypto/src/simplecrypto.js';
	require('fs').writeFileSync(filePath, require('fs')
		.readFileSync(filePath, 'utf8')
		.replace(
			'var _crypto = window.crypto || window.msCrypto;',
			`var _crypto = window.crypto || window.msCrypto
    if (!_crypto) {
        return
    };`)
	);
})();

//# OLSKPostinstallExternalAssets

(function OLSKPostinstallExternalAssets() {
	const OLSKAssets = require('./node_modules/OLSKApp/modules/OLSKAssets/main.js');
	const pathPackage = require('path');

	OLSKAssets.OLSKAssetsCopyAssetsFromTo([
		'normalize.css',
		'simplecrypto',
	], pathPackage.join(__dirname, 'node_modules'), pathPackage.join(__dirname, 'lbx.safariextension/-shared/__external'));
})();
