<script>
import OLSKInternational from 'OLSKInternational';
export const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[OLSKInternational.OLSKInternationalSimplifiedLanguageCode(navigator.language)]);
};

import { OLSK_TESTING_BEHAVIOUR } from 'OLSKTesting';

const mod = {

	// SETUP

	SetupEverything() {
	},

	// LIFECYCLE

	LifecycleModuleWillMount() {
		mod.SetupEverything();
	},

};

mod.LifecycleModuleWillMount();
</script>

<div class="LBXPreferenceShortcuts"> 

<h1 class="LBXPreferenceShortcutsHeading">{ OLSKLocalized('LBXPreferenceShortcutsHeadingText') }</h1>

</div>

<style src="./ui-style.css"></style>
