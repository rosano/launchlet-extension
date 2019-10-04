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

export const LBXShortcutString = function (param1, param2) {
	if (typeof param1 !== 'object' || param1 === null) {
		throw new Error('LBXErrorInputInvalid');
	}

	if (typeof param1.code !== 'string') {
		throw new Error('LBXErrorInputInvalid');
	};

	if (typeof param1.key !== 'string') {
		throw new Error('LBXErrorInputInvalid');
	};

	if (param1.key === 'Control') {
		return '';
	};

	if (param1.key === 'Meta') {
		return '';
	};

	if (param1.key === 'Alt') {
		return '';
	};

	if (param1.key === 'Shift') {
		return '';
	};

	return [
		param1.ctrlKey && 'Ctrl',
		param1.metaKey && 'Cmd',
		param1.altKey && 'Alt',
		param1.shiftKey && 'Shift',
		(param1.ctrlKey || param1.metaKey || param1.altKey || param1.shiftKey) && (param2 ? `[${ param1.key }]` : param1.code),
		].filter(function (e) {
			return !!e;
		}).join('+');
};
