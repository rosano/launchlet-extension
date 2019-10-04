<script>
import OLSKInternational from 'OLSKInternational';
export const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[OLSKInternational.OLSKInternationalSimplifiedLanguageCode(window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage'))]);
};

import { LBXShortcutStringCode, LBXShortcutStringKey } from '../../../-shared/LBXShortcut/main.js';

const mod = {

	// VALUE

	_ValueCodeString: '',

	// INTERFACE

	InterfaceKeydownDidFire (event) {
		mod._ValueCodeString = LBXShortcutStringCode(event);
	},

};
</script>

<svelte:window on:keydown={ mod.InterfaceKeydownDidFire }/>

<div class="LBXPreferenceSimulate"> 

<h1 class="LBXPreferenceSimulateHeading">{ OLSKLocalized('LBXPreferenceSimulateHeadingText') }</h1>

<p class="LBXPreferenceSimulateBlurb">{@html OLSKLocalized('LBXPreferenceSimulateBlurbText') }</p>

<label class="LBXPreferenceSimulateCodeStringFieldLabel">
	<span>{ OLSKLocalized('LBXPreferenceSimulateCodeStringFieldLabelText') }</span>
	<input class="LBXPreferenceSimulateCodeStringField" bind:value={ mod._ValueCodeString } on:click={ () => this.select() } />
</label>

</div>

<style src="./ui-style.css"></style>
