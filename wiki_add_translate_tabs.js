// ==UserScript==
// @name         Wikipedia/Wiktionary - translate tabs
// @namespace    wiki-namespace
// @description  Adds user selected language links after "Article" and "Talk" tabs for faster navigation.
// @version      1.0.0
// @match        https://*.wikipedia.org/*
// @match        https://*.wiktionary.org/*
// @grant        none
// ==/UserScript==

/*
   Tired of scrolling down in wikipedia to change the language? Well suffer no more!

   To add a language tab for easy access to foreign article, add your chosen languages to the list.
   The structure of the list element is the following:

   {
       languageCode: "en",
       linkName: "eng",
       titleName: "English"
   }
   
   languageCode - this is the subdomain part of wiki pages. Can be seen in the url.
   linkName - this will be the text inside the tab visible to user.
   titleName - this is the text that is shown when the user hovers over the inserted tab. Can be left empty.
   
   Couple of languages are already set as an example.
*/

(function() {
    function getTranslateListElementHTML(languageCode, linkName, titleName, url) {
        return '<li id="ca-translate-' + languageCode + '"><span><a title="Translate to ' + titleName + '" href="' + url + '">' + linkName + '</a></span></li>';
    }

    function insertNewTab(tabHTML) {
        document.getElementById("p-namespaces").children[1].insertAdjacentHTML('beforeend', tabHTML);
    }

    function getTranslationLanguages() {
        return [{
            languageCode: "fi",
            linkName: "fin",
            titleName: "Finnish"
        },
                {
                    languageCode: "en",
                    linkName: "eng",
                    titleName: "English"
                },
                {
                    languageCode: "de",
                    linkName: "ger",
                    titleName: "German"
                }];
    }

    let translationLanguages = getTranslationLanguages();

    for (let language of translationLanguages) {
        let languageCode = language.languageCode;
        let linkName = language.linkName;
        let titleName = language.titleName;

        let languageLinkElement = document.getElementsByClassName("interlanguage-link interwiki-" + languageCode)[0];

        if(languageLinkElement) {
            let url = languageLinkElement.children[0].href;
            let translateListElementHTML = getTranslateListElementHTML(languageCode, linkName, titleName, url);
            insertNewTab(translateListElementHTML);
        }
    }
})();