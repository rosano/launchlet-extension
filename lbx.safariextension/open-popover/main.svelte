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

const mod = {

	// VALUE

	_ValuePublicKey: undefined,
	ValuePublicKey(inputData) {
		if (typeof inputData === 'undefined') {
			return mod._ValuePublicKey;
		}

		mod._ValuePublicKey = inputData;
	},

	_ValueRunAutomaticRecipes: false,
	
	// INTERFACE

	InterfaceGenerateKeyButtonDidClick () {
		mod.CommandGenerateKeys();
	},

	InterfaceDeleteKeyButtonDidClick () {
		mod.CommandDeleteKey();
	},

	InterfaceRunAutomaticRecipesFieldDidInput () {
		mod.CommandLocalDataStore('LBXPreferenceRunAutomaticRecipes', this.checked);
	},

	InterfaceShowSettingsButtonDidClick () {
		mod.CommandShowSettings();
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
		if (OLSK_TESTING_BEHAVIOUR()) {
			return;
		}
		
		api.CallBackgroundFunction('DispatchBackgroundPrivateKeySave', inputData);
	},
	_CommandStorePublicKey (inputData) {
		mod.ValuePublicKey(inputData);

		if (OLSK_TESTING_BEHAVIOUR()) {
			return;
		}
		
		mod.CommandLocalDataStore('LBXPreferencePublicKey', mod.ValuePublicKey());
	},

	CommandDeleteKey () {
		mod._CommandStorePublicKey(null)

		LBXPopoverPreloadDidPair = false;
		
		api.CallBackgroundFunction('DispatchBackgroundPrivateKeyForget');
	},

	CommandShowSettings () {
		api.SettingsPageProgrammaticLaunch();
	},

	CommandLocalDataStore (key, inputData) {
	  api.LocalDataStore(key, JSON.stringify(inputData));
	},

	async CommandLocalDataRetrieve (inputData) {
	  const outputData = await api.LocalDataRetrieve(inputData);
	  
	  if (typeof outputData === 'undefined') {
	    return outputData;
	  };

	  return JSON.parse(outputData);
	},

	// SETUP

	SetupEverything() {
		mod.SetupPublicKey();

		mod.SetupDidPair();

		mod.SetupRunAutomaticRecipes();
	},

	async SetupPublicKey() {
		if (LBXPopoverPreloadPublicKey) {
			mod.ValuePublicKey(LBXPopoverPreloadPublicKey);
		}

		if (OLSK_TESTING_BEHAVIOUR() || !api.IsExtensionContext()) {
			return;
		}

	  mod.ValuePublicKey(await mod.CommandLocalDataRetrieve('LBXPreferencePublicKey'));
	},

	async SetupDidPair() {
		if (OLSK_TESTING_BEHAVIOUR() || !api.IsExtensionContext()) {
			return;
		}

	  LBXPopoverPreloadDidPair = !!(await mod.CommandLocalDataRetrieve('LBXPreferencePayload'));
	},

	async SetupRunAutomaticRecipes() {
		if (OLSK_TESTING_BEHAVIOUR() || !api.IsExtensionContext()) {
			return;
		}

	  mod._ValueRunAutomaticRecipes = !!(await mod.CommandLocalDataRetrieve('LBXPreferenceRunAutomaticRecipes'));
	},

	// LIFECYCLE

	LifecycleModuleWillMount() {
		mod.SetupEverything();
	},

	LifecycleModuleDidMount () {
		new Clipboard('.LBXPopoverPublicKeyCopyButton');
	},

	LifecycleSafariPopoverWillAppear() {
		mod.SetupEverything();
	},

};

mod.LifecycleModuleWillMount();

import { onMount } from 'svelte';
onMount(mod.LifecycleModuleDidMount);

if (typeof safari !== 'undefined') {
	safari.application.addEventListener('popover', mod.LifecycleSafariPopoverWillAppear, true);
};
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
	</p>

	<p>
		<button class="LBXPopoverPublicKeyCopyButton" data-clipboard-target=".LBXPopoverPublicKeyField">{ OLSKLocalized('LBXPopoverPublicKeyCopyButtonText') }</button>
	</p>
{/if}

{#if mod._ValuePublicKey && LBXPopoverPreloadDidPair}
	<p>
		<label>
			<span class="LBXPopoverRunAutomaticRecipesFieldLabel">{ OLSKLocalized('LBXPopoverRunAutomaticRecipesFieldLabelText') }</span>
			<input class="LBXPopoverRunAutomaticRecipesField" type="checkbox" checked={ mod._ValueRunAutomaticRecipes } on:input={ mod.InterfaceRunAutomaticRecipesFieldDidInput } />
		</label>
	</p>

	<p>
		<button class="LBXPopoverShowSettingsButton" on:click={ mod.InterfaceShowSettingsButtonDidClick }>{ OLSKLocalized('LBXPopoverShowSettingsButtonText') }</button>
	</p>
{/if}

</div>

<style src="./ui-style.css"></style>
