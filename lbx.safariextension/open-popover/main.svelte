<script>
import api from './api.js'

import { OLSKLocalized } from '../-shared/LBXGlobal/main.js';
import { OLSK_TESTING_BEHAVIOUR } from 'OLSKTesting';

import { LBXPopoverRandomSeed } from './ui-logic.js'

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

		api.CallBackgroundFunction('DispatchBackgroundStorePrivateKey', (function SerializePrivateKey(key) {
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
		})(mod._ValuePrivateKey = inputData))
	},

	// INTERFACE

	InterfaceGenerateButtonDidClick () {
		mod.CommandGenerateKey()
	},
	InterfaceDisconnectButtonDidClick () {
		mod.CommandDisconnect()
	},

	// COMMAND

	CommandGenerateKey () {
		mod.ValuePrivateKey(OLSK_TESTING_BEHAVIOUR() ? LBXPopoverRandomSeed() : cryptico.generateRSAKey(LBXPopoverRandomSeed(), 1024))
		mod.ValuePublicKey(OLSK_TESTING_BEHAVIOUR() ? 'LBX_TESTING_PUBLIC_KEY' : cryptico.publicKeyString(mod.ValuePrivateKey()))
	},
	CommandDisconnect () {
		mod.ValuePublicKey(null)
	},

	// LIFECYCLE

	LifecycleModuleWillMount() {
		if (LBXPopoverInitializingPublicKey) {
			mod.ValuePublicKey(LBXPopoverInitializingPublicKey)
		};
	},

}

mod.LifecycleModuleWillMount();
</script>

{#if !mod.ValuePublicKey()}
	<button class="LBXPopoverGenerateButton" on:click={ mod.InterfaceGenerateButtonDidClick }>{ OLSKLocalized('LBXPopoverGenerateButtonText') }</button>
{/if}

{#if mod.ValuePublicKey()}
	<button class="LBXPopoverDisconnectButton" on:click={ mod.InterfaceDisconnectButtonDidClick }>{ OLSKLocalized('LBXPopoverDisconnectButtonText') }</button>
{/if}

{#if mod.ValuePublicKey() && !LBXPopoverInitializingDidLink}
	<textarea class="LBXPopoverPublicKeyField">{ mod.ValuePublicKey() }</textarea>
{/if}

<style src="./ui-style.css"></style>
