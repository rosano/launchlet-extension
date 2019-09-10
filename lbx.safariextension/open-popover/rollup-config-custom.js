module.exports = {
	LBXPopoverRollupConfigCustom (inputData, options = {}) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('LCHErrorInputInvalid');
		}

		inputData.output.format = 'umd';

		return inputData;
	},
	OLSKRollupConfigCustom (inputData, options) {
		return module.exports.LBXPopoverRollupConfigCustom(inputData, options);
	}
};
