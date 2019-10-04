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

	// COMMAND

	CommandNotifyChange (original, key, value) {
		dispatch('LBXPreferenceShortcutsDispatchUpdate', Object.keys(LBXPreferenceShortcutsMap).reduce(function (coll, item) {
			if (item !== original) {
				coll[item] = LBXPreferenceShortcutsMap[item];
			};

			if (item === original && typeof key !== 'undefined') {
				coll[key] = LBXPreferenceShortcutsMap[item];
			};

			if (item === original && typeof value !== 'undefined') {
				coll[item] = value;
			};

			return coll;
		}, {}))
	},

};
</script>

<div class="LBXPreferenceShortcuts"> 

<h1 class="LBXPreferenceShortcutsHeading">{ OLSKLocalized('LBXPreferenceShortcutsHeadingText') }</h1>

<p>
	<button class="LBXPreferenceShortcutsCreateButton" on:click={ mod.InterfaceCreateButtonDidClick }>{ OLSKLocalized('LBXPreferenceShortcutsCreateButtonText') }</button>
</p>

{#each Object.keys(LBXPreferenceShortcutsMap) as item}
	<p class="LBXPreferenceShortcutsItem">
		<input class="LBXPreferenceShortcutsItemKeyField" placeholder={ OLSKLocalized('LBXPreferenceShortcutsItemKeyFieldPlaceholderText') } value={ item } autofocus on:input={ (event) => mod.CommandNotifyChange(item, event.target.value, undefined) } />
		
		<input class="LBXPreferenceShortcutsItemValueField" placeholder={ OLSKLocalized('LBXPreferenceShortcutsItemValueFieldPlaceholderText') } value={ LBXPreferenceShortcutsMap[item] } on:input={ (event) => mod.CommandNotifyChange(item, undefined, event.target.value) } />

		<button class="LBXPreferenceShortcutsItemDeleteButton" on:click={ (event) => mod.CommandNotifyChange(item, undefined, undefined) }>{ OLSKLocalized('LBXPreferenceShortcutsItemDeleteButtonText') }</button>
	</p>
{/each}

</div>

<style src="./ui-style.css"></style>
