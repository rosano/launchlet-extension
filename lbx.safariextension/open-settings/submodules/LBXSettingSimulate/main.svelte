<script>
import OLSKInternational from 'OLSKInternational';
export const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[OLSKInternational.OLSKInternationalSimplifiedLanguageCode(window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage'))]);
};

import { LBXShortcutString } from '../../../-shared/LBXShortcut/main.js';

import Clipboard from 'clipboard';

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

	LifecycleModuleDidMount () {
		new Clipboard('.LBXSettingSimulateCodeStringCopyButton');
		new Clipboard('.LBXSettingSimulateKeyStringCopyButton');
	},

};

import { onMount } from 'svelte';
onMount(mod.LifecycleModuleDidMount);
</script>

<svelte:window on:keydown={ mod.InterfaceKeydownDidFire }/>

<div class="LBXSettingSimulate"> 

<h1 class="LBXSettingSimulateHeading">{ OLSKLocalized('LBXSettingSimulateHeadingText') }</h1>

<p class="LBXSettingSimulateBlurb">{@html OLSKLocalized('LBXSettingSimulateBlurbText') }</p>

<p>
	<label class="LBXSettingSimulateCodeStringFieldLabel">
		<span>{ OLSKLocalized('LBXSettingSimulateCodeStringFieldLabelText') }</span>
		<input class="LBXSettingSimulateCodeStringField" bind:value={ mod._ValueCodeString } on:click={ () => this.select() } />
	</label>
	<button class="LBXSettingSimulateCodeStringCopyButton" data-clipboard-target=".LBXSettingSimulateCodeStringField">{ OLSKLocalized('LBXSettingSimulateSharedCopyButtonText') }</button>
</p>

<p>
	<label class="LBXSettingSimulateKeyStringFieldLabel">
		<span>{ OLSKLocalized('LBXSettingSimulateKeyStringFieldLabelText') }</span>
		<input class="LBXSettingSimulateKeyStringField" bind:value={ mod._ValueKeyString } on:click={ () => this.select() } />
	</label>
	<button class="LBXSettingSimulateKeyStringCopyButton" data-clipboard-target=".LBXSettingSimulateKeyStringField">{ OLSKLocalized('LBXSettingSimulateSharedCopyButtonText') }</button>
</p>

</div>

<style src="./ui-style.css"></style>
