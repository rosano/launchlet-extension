<script>
import OLSKInternational from 'OLSKInternational';
export const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[OLSKInternational.OLSKInternationalSimplifiedLanguageCode(window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage'))]);
};

const mod = {

	// INTERFACE

	InterfaceKeydownDidFire (event) {
		console.log(event);
	},

};
</script>

<svelte:window on:keydown={ mod.InterfaceKeydownDidFire }/>

<div class="LBXPreferenceSimulate"> 

<h1 class="LBXPreferenceSimulateHeading">{ OLSKLocalized('LBXPreferenceSimulateHeadingText') }</h1>

<p class="LBXPreferenceSimulateBlurb">{@html OLSKLocalized('LBXPreferenceSimulateBlurbText') }</p>

</div>

<style src="./ui-style.css"></style>
