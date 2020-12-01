<script>
export let LBXSettingShortcutsMap = {};

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[OLSKInternational.OLSKInternationalSimplifiedLanguageCode(window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage'))]);
};

import { OLSK_SPEC_UI } from 'OLSKSpec';

import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();

const mod = {

	// INTERFACE

	InterfaceCreateButtonDidClick () {
		dispatch('LBXSettingShortcutsDispatchCreate');
	},

	// CONTROL

	ControlNotifyChange (original, key, value) {
		dispatch('LBXSettingShortcutsDispatchUpdate', Object.keys(LBXSettingShortcutsMap).reduce(function (coll, item) {
			if (item !== original) {
				coll[item] = LBXSettingShortcutsMap[item];
			};

			if (item === original && typeof key !== 'undefined') {
				coll[key] = LBXSettingShortcutsMap[item];
			};

			if (item === original && typeof value !== 'undefined') {
				coll[item] = value;
			};

			return coll;
		}, {}))
	},

};
</script>

<div class="LBXSettingShortcuts"> 

<h1 class="LBXSettingShortcutsHeading">{ OLSKLocalized('LBXSettingShortcutsHeadingText') }</h1>

<p>
	<button class="LBXSettingShortcutsCreateButton" on:click={ mod.InterfaceCreateButtonDidClick }>{ OLSKLocalized('LBXSettingShortcutsCreateButtonText') }</button>
</p>

{#each Object.keys(LBXSettingShortcutsMap) as item}
	<p class="LBXSettingShortcutsItem">
		<input class="LBXSettingShortcutsItemKeyField" placeholder={ OLSKLocalized('LBXSettingShortcutsItemKeyFieldPlaceholderText') } value={ item } autofocus on:input={ (event) => mod.ControlNotifyChange(item, event.target.value, undefined) } />
		
		<input class="LBXSettingShortcutsItemValueField" placeholder={ OLSKLocalized('LBXSettingShortcutsItemValueFieldPlaceholderText') } value={ LBXSettingShortcutsMap[item] } on:input={ (event) => mod.ControlNotifyChange(item, undefined, event.target.value) } />

		<button class="LBXSettingShortcutsItemDeleteButton" on:click={ (event) => mod.ControlNotifyChange(item, undefined, undefined) }>{ OLSKLocalized('LBXSettingShortcutsItemDeleteButtonText') }</button>
	</p>
{/each}

</div>

<style src="./ui-style.css"></style>
