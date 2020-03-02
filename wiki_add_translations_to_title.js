// ==UserScript==
// @name         Wikipedia/Wiktionary - add translation to title
// @namespace    wiki-namespace
// @description  Translates the title of wikipedia/wiktionary article according to user set preference.
// @version      1.0.0
// @match        https://*.wikipedia.org/*
// @match        https://*.wiktionary.org/*
// @grant        none
// ==/UserScript==

/*
   Many people use wikipedia nearly every day. Why not learn a new language on the side?

   Add which languages you want to be translated and included after the heading.
   For example, to add German and French, your array would look like this:

   return [
            {languageCode: "de"},
            {languageCode: "fr"}
           ];

   Note that if the foreign language article does not exist, translation can not be provided.
*/

(function() {
    function getTranslationLanguages() {
        return [
                {languageCode: "de"}
               ];
    }

    let translationLanguages = getTranslationLanguages();

    for (let language of translationLanguages) {
        let languageCode = language.languageCode;

        let languageLinkElement = document.getElementsByClassName("interlanguage-link interwiki-" + languageCode)[0];
        let headerElement = document.getElementById("firstHeading");

        if(languageLinkElement) {
            let translation = decodeURI(languageLinkElement.children[0].href.match(/wiki\/(.*)/)[1].replace(/_/g, " "));
            headerElement.textContent += " [" + languageCode + ": " + translation + "]";
        }

    }
})();