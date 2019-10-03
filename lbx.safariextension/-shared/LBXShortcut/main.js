export const LBXShortcutValidation = function (inputData) {
	if (typeof inputData !== 'string') {
		throw new Error('LBXErrorInputInvalid');
	}

	return function (event) {
		if (typeof event !== 'object' || event === null) {
			throw new Error('LBXErrorInputInvalid');
		}

		if (typeof event.key !== 'string') {
			throw new Error('LBXErrorInputInvalid');
		};

		if (event.key.toLowerCase() !== inputData.split('+').pop().toLowerCase()) {
			return false;
		};

		if (inputData.match(/shift/i) && !event.shiftKey) {
			return false;
		};

		if (inputData.match(/ctrl/i) && !event.ctrlKey) {
			return false;
		};

		if (inputData.match(/alt/i) && !event.altKey) {
			return false;
		};

		if (inputData.match(/cmd/i) && !event.metaKey) {
			return false;
		};

		return true;	
	};
};
