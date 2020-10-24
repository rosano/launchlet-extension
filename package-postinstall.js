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

(function OLSKPostinstallExternalAssets() {
	require('./node_modules/OLSKExpress/modules/OLSKAssets/main.js').OLSKAssetsCopyAssetsFromTo([
		'normalize.css',
		'OLSKLayout',
		'simplecrypto',
	], require('path').join(__dirname, 'node_modules'), require('path').join(__dirname, 'lbx.safariextension/-shared/__external'));
})();
