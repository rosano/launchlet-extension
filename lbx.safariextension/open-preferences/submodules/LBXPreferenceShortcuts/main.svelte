<script>
export let LBXPreferenceShortcutsMap = {};

import OLSKInternational from 'OLSKInternational';
export const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[OLSKInternational.OLSKInternationalSimplifiedLanguageCode(navigator.language)]);
};

import { OLSK_TESTING_BEHAVIOUR } from 'OLSKTesting';

import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();

const mod = {

	// INTERFACE

	InterfaceCreateButtonDidClick () {
		dispatch('LBXPreferenceShortcutsDispatchCreate');
	},

};
</script>

<div class="LBXPreferenceShortcuts"> 

<h1 class="LBXPreferenceShortcutsHeading">{ OLSKLocalized('LBXPreferenceShortcutsHeadingText') }</h1>

<button class="LBXPreferenceShortcutsCreateButton" on:click={ mod.InterfaceCreateButtonDidClick }>{ OLSKLocalized('LBXPreferenceShortcutsCreateButtonText') }</button>

</div>

<style src="./ui-style.css"></style>
