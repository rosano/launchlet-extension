let _translationDictionary = JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`);
import OLSKInternational from 'OLSKInternational';
export const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, _translationDictionary[OLSKInternational.OLSKInternationalSimplifiedLanguageCode(navigator.language)]);
};

export const LBX_TESTING_BEHAVIOUR = function () {
	if (typeof require !== 'undefined') {
		return false;
	}

	if (typeof navigator === 'undefined') {
		return false;
	}

	return navigator.appName === 'Zombie';
};
