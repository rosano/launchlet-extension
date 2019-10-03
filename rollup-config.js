import { OLSKRollupScanStart } from 'OLSKRollup';

export default OLSKRollupScanStart(require('path').join(__dirname, 'lbx.safariextension'), {
	OLSKRollupPluginSwapTokens: {
		"'LBX_ACTIVE_MESSAGE_PAGE_ORIGIN_STRING'": JSON.stringify(process.env.LBX_ACTIVE_MESSAGE_PAGE_ORIGIN_STRING.split(','))
	},
});
