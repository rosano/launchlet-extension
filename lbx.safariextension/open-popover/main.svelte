<script>
import api from './api.js';

import OLSKInternational from 'OLSKInternational';
export const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[OLSKInternational.OLSKInternationalSimplifiedLanguageCode(window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage'))]);
};

import Clipboard from 'clipboard';
import { OLSK_TESTING_BEHAVIOUR } from 'OLSKTesting';

import { LBXPopoverRandomSeed } from './ui-logic.js';

export let LBXPopoverPreloadPrivateKey = null;
export let LBXPopoverPreloadPublicKey = null;
export let LBXPopoverPreloadDidPair = false;
export let LBXPopoverRunAutomaticRecipes = false;

const mod = {

	// VALUE

	_ValuePublicKey: undefined,
	ValuePublicKey(inputData) {
		if (typeof inputData === 'undefined') {
			return mod._ValuePublicKey;
		}

		mod._ValuePublicKey = inputData;
	},
	
	// INTERFACE

	InterfaceGenerateKeyButtonDidClick () {
		mod.CommandGenerateKeys();
	},

	InterfaceDeleteKeyButtonDidClick () {
		mod.CommandDeleteKey();
	},

	InterfaceShowPreferencesButtonDidClick () {
		mod.CommandShowPreferences();
	},

	// COMMAND
	
	async CommandGenerateKeys () {
		let item = OLSK_TESTING_BEHAVIOUR() ? {
			privateJwk: 'LBX_TESTING_PRIVATE_KEY',
			publicJwk: 'LBX_TESTING_PUBLIC_KEY',
		} : await mod._CommandGenerateKeys();

		mod._CommandStorePrivateKey(item.privateJwk);
		mod._CommandStorePublicKey(JSON.stringify(item.publicJwk));
	},
	async _CommandGenerateKeys () {
		return new Promise(function (resolve, reject) {
			window.simpleCrypto.asym.generateEncryptKey(reject, resolve);
		});
	},
	_CommandStorePrivateKey (inputData) {
		if (!api.IsExtensionContext()) {
			return;
		}
		
		api.CallBackgroundFunction('DispatchBackgroundStorePrivateKey', inputData);
	},
	_CommandStorePublicKey (inputData) {
		mod.ValuePublicKey(inputData);

		if (!api.IsExtensionContext()) {
			return;
		}
		
		api.CallBackgroundFunction('DispatchBackgroundStorePublicKey', mod.ValuePublicKey());
	},
	CommandDeleteKey () {
		mod.ValuePublicKey(null);
		LBXPopoverPreloadDidPair = false;
		
		api.CallBackgroundFunction('DispatchBackgroundDeleteKeys');
	},

	CommandShowPreferences () {
		api.PreferencesPageProgrammaticLaunch();
	},

	// SETUP

	async SetupEverything() {
		if (LBXPopoverPreloadPublicKey) {
			mod.ValuePublicKey(LBXPopoverPreloadPublicKey);
		}

		if (!api.IsExtensionContext()) {
			return;
		}

	  mod.ValuePublicKey(await api.LocalDataGet('LBXPairPublicKey'));
	  LBXPopoverPreloadDidPair = !!(await api.LocalDataGet('LBXPayload'));
	},

	// LIFECYCLE

	LifecycleModuleWillMount() {
		mod.SetupEverything();
	},

	LifecycleModuleDidMount () {
		new Clipboard('.LBXPopoverPublicKeyCopyButton');
	},

};

mod.LifecycleModuleWillMount();

import { onMount } from 'svelte';
onMount(mod.LifecycleModuleDidMount);
</script>

<div class="LBXPopover"> 

{#if !mod._ValuePublicKey }
	<p>
		<button class="LBXPopoverGenerateKeyButton" on:click={ mod.InterfaceGenerateKeyButtonDidClick }>{ OLSKLocalized('LBXPopoverGenerateKeyButtonText') }</button>
	</p>
{/if}

{#if mod._ValuePublicKey}
	<p>
		<button class="LBXPopoverDeleteKeyButton" on:click={ mod.InterfaceDeleteKeyButtonDidClick }>{ OLSKLocalized('LBXPopoverDeleteKeyButtonText') }</button>
	</p>
{/if}

{#if mod._ValuePublicKey && !LBXPopoverPreloadDidPair}
	<p>
		<input class="LBXPopoverPublicKeyField" value={ mod.ValuePublicKey() } onclick="this.select()" autofocus />
		<button class="LBXPopoverPublicKeyCopyButton" data-clipboard-target=".LBXPopoverPublicKeyField">{ OLSKLocalized('LBXPopoverPublicKeyCopyButtonText') }</button>
	</p>
{/if}

<p>
	<label>
		<span class="LBXPopoverRunAutomaticRecipesFieldLabel">{ OLSKLocalized('LBXPopoverRunAutomaticRecipesFieldLabelText') }</span>
		<input class="LBXPopoverRunAutomaticRecipesField" type="checkbox" bind:value={ LBXPopoverRunAutomaticRecipes } />
	</label>
</p>

<p>
	<button class="LBXPopoverShowPreferencesButton" on:click={ mod.InterfaceShowPreferencesButtonDidClick }>{ OLSKLocalized('LBXPopoverShowPreferencesButtonText') }</button>
</p>

</div>

<style src="./ui-style.css"></style>
