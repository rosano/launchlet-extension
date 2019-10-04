<script>
import OLSKInternational from 'OLSKInternational';
export const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[OLSKInternational.OLSKInternationalSimplifiedLanguageCode(window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage'))]);
};

import { LBXShortcutString } from '../../../-shared/LBXShortcut/main.js';

const mod = {

	// VALUE

	_ValueCodeString: '',

	_ValueKeyString: '',

	// INTERFACE

	InterfaceKeydownDidFire (event) {
		if (!LBXShortcutString(event)) {
			return;
		};

		mod._ValueCodeString = LBXShortcutString(event);
		mod._ValueKeyString = LBXShortcutString(event, true);
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

<label class="LBXPreferenceSimulateKeyStringFieldLabel">
	<span>{ OLSKLocalized('LBXPreferenceSimulateKeyStringFieldLabelText') }</span>
	<input class="LBXPreferenceSimulateKeyStringField" bind:value={ mod._ValueKeyString } on:click={ () => this.select() } />
</label>

</div>

<style src="./ui-style.css"></style>
