<script>
import api from './api.js';

import OLSKInternational from 'OLSKInternational';
export const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[OLSKInternational.OLSKInternationalSimplifiedLanguageCode(navigator.language)]);
};

const mod = {

	// MESSAGE

	LBXPreferenceShortcutsDispatchCreate () {
		mod.LBXPreferenceShortcutsMap[''] = '';
	},

	LBXPreferenceShortcutsDispatchUpdate (event) {
		api.MessageSendToBackground('DispatchBackgroundUpdateShortcutsMap', mod.LBXPreferenceShortcutsMap = event.detail)
	},

	MessageDidReceiveFromBackground (event) {
		return {
			DispatchSharedShortcutsMap() {
				if (!event.message) {
					return;
				};
				
				mod.LBXPreferenceShortcutsMap = event.message;
		  },
		}[event.name]();
	},

	// VALUE

	LBXPreferenceShortcutsMap: {},

	// SETUP

	SetupEverything() {
		mod.SetupMessageReceiveFromBackground();
		mod.SetupValueShortcutsMap();
	},
	
	SetupMessageReceiveFromBackground() {
		api.MessageReceiveFromBackground(mod.MessageDidReceiveFromBackground);
	},
	
	SetupValueShortcutsMap() {
		api.MessageSendToBackground('DispatchBackgroundSendShortcutsMap');
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

<p>
	<a class="LBXPreferencesGuideLink" href="https://launchlet.dev/guide" target="_blank">{ OLSKLocalized('LBXPreferencesGuideLinkText') }</a>
</p>

<hr>

<LBXPreferenceShortcuts LBXPreferenceShortcutsMap={ mod.LBXPreferenceShortcutsMap } on:LBXPreferenceShortcutsDispatchCreate={ mod.LBXPreferenceShortcutsDispatchCreate } on:LBXPreferenceShortcutsDispatchUpdate={ mod.LBXPreferenceShortcutsDispatchUpdate } />

</div>

<style src="./ui-style.css"></style>
