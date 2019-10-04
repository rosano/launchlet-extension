export const LBXShortcutValidation = function (inputData) {
	if (typeof inputData !== 'string') {
		throw new Error('LBXErrorInputInvalid');
	}

	return function (event) {
		if (typeof event !== 'object' || event === null) {
			throw new Error('LBXErrorInputInvalid');
		}

		if (typeof event.code !== 'string') {
			throw new Error('LBXErrorInputInvalid');
		};

		const key = inputData.split('+').pop().toLowerCase();

		if (key.match(/\[.\]/i) && event.key.toLowerCase() !== key.match(/\[(.)\]/i).pop()) {
			return false;
		};

		if (!key.match(/\[.\]/i) && event.code.toLowerCase() !== key) {
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

export const LBXShortcutStringCode = function (inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw new Error('LBXErrorInputInvalid');
	}

	if (typeof inputData.code !== 'string') {
		throw new Error('LBXErrorInputInvalid');
	};

	return [
		inputData.ctrlKey && 'Ctrl',
		inputData.metaKey && 'Cmd',
		inputData.altKey && 'Alt',
		inputData.shiftKey && 'Shift',
		inputData.code,
		].filter(function (e) {
			return !!e;
		}).join('+');
};

export const LBXShortcutStringKey = function (inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw new Error('LBXErrorInputInvalid');
	}

	if (typeof inputData.key !== 'string') {
		throw new Error('LBXErrorInputInvalid');
	};

	return [
		inputData.ctrlKey && 'Ctrl',
		inputData.metaKey && 'Cmd',
		inputData.altKey && 'Alt',
		inputData.shiftKey && 'Shift',
		`[${ inputData.key }]`,
		].filter(function (e) {
			return !!e;
		}).join('+');
};
