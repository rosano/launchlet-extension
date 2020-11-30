<script>
import api from './api.js';

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[OLSKInternational.OLSKInternationalSimplifiedLanguageCode(window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage'))]);
};

const mod = {

	// VALUE

	LBXSettingShortcutsMap: {},

	// MESSAGE

	LBXSettingShortcutsDispatchCreate () {
		mod.LBXSettingShortcutsMap[''] = '';
	},

	LBXSettingShortcutsDispatchUpdate (event) {
		api.MessageSendToBackground('DispatchBackgroundUpdateShortcutsMap', mod.LBXSettingShortcutsMap = event.detail)
	},

	MessageDidReceiveFromBackground (event) {
		return {
			DispatchSharedShortcutsMap() {
				if (!event.message) {
					return;
				};
				
				mod.LBXSettingShortcutsMap = event.message;
		  },
		}[event.name]();
	},

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

import LBXSettingShortcuts from './submodules/LBXSettingShortcuts/main.svelte';
import LBXSettingSimulate from './submodules/LBXSettingSimulate/main.svelte';
</script>

<div class="LBXSettings">

<p>
	<a class="LBXSettingsGuideLink" href="https://launchlet.dev/guide" target="_blank">{ OLSKLocalized('LBXSettingsGuideLinkText') }</a>
</p>

<hr role="presentation" />

<LBXSettingShortcuts LBXSettingShortcutsMap={ mod.LBXSettingShortcutsMap } on:LBXSettingShortcutsDispatchCreate={ mod.LBXSettingShortcutsDispatchCreate } on:LBXSettingShortcutsDispatchUpdate={ mod.LBXSettingShortcutsDispatchUpdate } />

<hr role="presentation" />

<LBXSettingSimulate />

<hr role="presentation" />

</div>

<style src="./ui-style.css"></style>
