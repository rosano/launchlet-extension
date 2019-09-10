<script>
import { OLSKLocalized, LBX_TESTING_BEHAVIOUR } from '../-shared/LBXGlobal/main.js';

import { LBXPopoverRandomSeed } from './ui-logic.js'

const mod = {

	// VALUE

	_ValuePublicKey: undefined,
	ValuePublicKey(inputData) {
		if (typeof inputData === 'undefined') {
			return mod._ValuePublicKey
		};

		mod._ValuePublicKey = inputData
	},

	// INTERFACE

	InterfaceGenerateButtonDidClick () {
		mod.ValuePublicKey(LBX_TESTING_BEHAVIOUR() ? 'LBX_TESTING_PUBLIC_KEY' : LBXPopoverRandomSeed())
	},

}
</script>

{#if !mod.ValuePublicKey()}
	<button class="LBXPopoverGenerateButton" on:click={ mod.InterfaceGenerateButtonDidClick }>{ OLSKLocalized('LBXPopoverGenerateButtonText') }</button>
{/if}

{#if mod.ValuePublicKey()}
	<textarea class="LBXPopoverPublicKeyField">{ mod.ValuePublicKey() }</textarea>
{/if}

<style src="./ui-style.css"></style>
