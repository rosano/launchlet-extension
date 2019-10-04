<script>
import OLSKInternational from 'OLSKInternational';
export const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[OLSKInternational.OLSKInternationalSimplifiedLanguageCode(navigator.language)]);
};

import { OLSK_TESTING_BEHAVIOUR } from 'OLSKTesting';



const mod = {

	// MESSAGE

	LBXPreferenceShortcutsDispatchCreate () {
		mod.LBXPreferenceShortcutsMap[''] = '';
	},

	LBXPreferenceShortcutsDispatchUpdate (event) {
		mod.LBXPreferenceShortcutsMap = event.detail;
	},

	// VALUE

	LBXPreferenceShortcutsMap: {},

	// SETUP

	SetupEverything() {
	},

	// LIFECYCLE

	LifecycleModuleWillMount() {
		mod.SetupEverything();
	},

};

mod.LifecycleModuleWillMount();

import LBXPreferenceShortcuts from './submodules/LBXPreferenceShortcuts/main.svelte';
</script>

<div class="LBXPreferences"> 

<LBXPreferenceShortcuts LBXPreferenceShortcutsMap={ mod.LBXPreferenceShortcutsMap } on:LBXPreferenceShortcutsDispatchCreate={ mod.LBXPreferenceShortcutsDispatchCreate } on:LBXPreferenceShortcutsDispatchUpdate={ mod.LBXPreferenceShortcutsDispatchUpdate } />

</div>

<style src="./ui-style.css"></style>
