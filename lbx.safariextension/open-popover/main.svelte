<script>
import api from './api.js'

import { OLSKLocalized } from '../-shared/LBXGlobal/main.js';
import { OLSK_TESTING_BEHAVIOUR } from 'OLSKTesting';

import { LBXPopoverRandomSeed } from './ui-logic.js'

export let LBXPopoverInitializingPrivateKey = null;
export let LBXPopoverInitializingPublicKey = null;
export let LBXPopoverInitializingDidLink = false;

const mod = {

	// VALUE

	_ValuePublicKey: undefined,
	ValuePublicKey(inputData) {
		if (typeof inputData === 'undefined') {
			return mod._ValuePublicKey
		};

		mod._ValuePublicKey = inputData
	},
	_ValuePrivateKey: undefined,
	ValuePrivateKey(inputData) {
		if (typeof inputData === 'undefined') {
			return mod._ValuePrivateKey
		};

		mod._ValuePrivateKey = inputData
	},

	// INTERFACE

	InterfaceGenerateButtonDidClick () {
		mod.CommandGenerateKeys()
	},
	InterfaceDisconnectButtonDidClick () {
		mod.CommandDisconnect()
	},

	// COMMAND
	
	CommandGenerateKeys () {
		let item = OLSK_TESTING_BEHAVIOUR() ? LBXPopoverRandomSeed() : cryptico.generateRSAKey(LBXPopoverRandomSeed(), 1024);

		mod._CommandStorePrivateKey(item)
		mod._CommandStorePublicKey(OLSK_TESTING_BEHAVIOUR() ? 'LBX_TESTING_PUBLIC_KEY' : cryptico.publicKeyString(item));
	},
	_CommandStorePrivateKey (inputData) {
		mod.ValuePrivateKey(inputData)

		api.CallBackgroundFunction('DispatchBackgroundStorePrivateKey', OLSK_TESTING_BEHAVIOUR() ? 'LBX_TESTING_PRIVATE_KEY' : (function SerializePrivateKey(key) {
			// https://github.com/wwwtyro/cryptico/issues/28#issuecomment-319841493
		  return {
		    coeff: key.coeff.toString(16),
		    d: key.d.toString(16),
		    dmp1: key.dmp1.toString(16),
		    dmq1: key.dmq1.toString(16),
		    e: key.e.toString(16),
		    n: key.n.toString(16),
		    p: key.p.toString(16),
		    q: key.q.toString(16)
		  }
		})(mod.ValuePrivateKey()))
	},
	_CommandStorePublicKey (inputData) {
		mod.ValuePublicKey(inputData)

		api.CallBackgroundFunction('DispatchBackgroundStorePublicKey', mod.ValuePublicKey())
	},
	CommandDisconnect () {
		mod.ValuePrivateKey(null)
		mod.ValuePublicKey(null)
		api.CallBackgroundFunction('DispatchBackgroundDeleteKeys')
	},

	// SETUP

	SetupEverything() {
		if (LBXPopoverInitializingPrivateKey) {
			mod.ValuePrivateKey(LBXPopoverInitializingPrivateKey)
		};

		if (LBXPopoverInitializingPublicKey) {
			mod.ValuePublicKey(LBXPopoverInitializingPublicKey)
		};

		api.LocalDataGet('XYZPrivateKey').then(mod.ValuePrivateKey)
		api.LocalDataGet('XYZPublicKey').then(mod.ValuePublicKey)
	},

	// LIFECYCLE

	LifecycleModuleWillMount() {
		mod.SetupEverything()
	},

}

mod.LifecycleModuleWillMount();
</script>

{#if !mod._ValuePrivateKey || !mod._ValuePublicKey }
	<button class="LBXPopoverGenerateButton" on:click={ mod.InterfaceGenerateButtonDidClick }>{ OLSKLocalized('LBXPopoverGenerateButtonText') }</button>
{/if}

{#if mod._ValuePublicKey}
	<button class="LBXPopoverDisconnectButton" on:click={ mod.InterfaceDisconnectButtonDidClick }>{ OLSKLocalized('LBXPopoverDisconnectButtonText') }</button>
{/if}

{#if mod._ValuePublicKey && !LBXPopoverInitializingDidLink}
	<textarea class="LBXPopoverPublicKeyField">{ mod.ValuePublicKey() }</textarea>
{/if}

<style src="./ui-style.css"></style>
