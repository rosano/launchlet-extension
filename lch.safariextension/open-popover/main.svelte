<script>
import { OLSKLocalized } from '../-shared/LBXGlobal/main.js';
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
		mod.ValuePublicKey('alfa')
	},

}
</script>

{#if !mod.ValuePublicKey()}
	<button class="LBXPopoverGenerateButton" on:click={ mod.InterfaceGenerateButtonDidClick }>{ OLSKLocalized('LBXPopoverGenerateButtonText') }</button>
{/if}

{#if mod.ValuePublicKey()}
	<textarea class="LBXPopoverPublicKeyField"></textarea>
{/if}

<style src="./ui-style.css"></style>
