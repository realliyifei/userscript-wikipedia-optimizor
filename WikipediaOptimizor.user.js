// ==UserScript==
// @name          Wikipedia Optimizor
// @version       1.0.0
// @description	  Wikipedia optimizor, with various themes, smart toc sidebar, explicit multilingual links, and other handy optimizations
// @license       MIT
// @author        Li, Yifei
// @namespace     https://github.com/realliyifei/userscript-wikipedia-optimizor
// @include       http://wikipedia.org/*
// @include       https://wikipedia.org/*
// @include       http://*.wikipedia.org/*
// @include       https://*.wikipedia.org/*
// @include       http://en.wikipedia.org/wiki/File:*
// @run-at        document-start
// @downloadURL   https://github.com/realliyifei/userscript-wikipedia-optimizor/blob/master/WikipediaOptimizor.user.js
// @updateURL     https://github.com/realliyifei/userscript-wikipedia-optimizor/blob/master/WikipediaOptimizor.user.js
// @supportURL    https://github.com/realliyifei/userscript-wikipedia-optimizor/issues
// Notes: This require is for "LANGUAGE DISPLAY"
// @require       https://code.jquery.com/jquery-3.2.1.min.js
// Notes: This three requires are for "STICK TABLE HEADERS"
// @require       https://code.jquery.com/jquery-1.12.0.min.js
// @require       https://greasyfork.org/scripts/2199-waitforkeyelements/code/waitForKeyElements.js?version=6349
// @require       https://cdnjs.cloudflare.com/ajax/libs/floatthead/1.3.2/jquery.floatThead.min.js
// @resource      LOCAL_DEV_CSS   file:///Users/yifeili/git-local/userscript-wikipedia-optimizor/theme/academia-dev.css
// @resource      theme_academia  https://raw.githubusercontent.com/realliyifei/userscript-wikipedia-optimizor/master/theme/academia.css
// @resource      theme_warmpaper https://raw.githubusercontent.com/realliyifei/userscript-wikipedia-optimizor/master/theme/warmpaper.css
// @grant         GM_getResourceText
// @grant         GM_addStyle
// ==/UserScript==

/* THEME */
(function() {
    // select theme here: acamida or warmpaper
    var css = GM_getResourceText("LOCAL_DEV_CSS"); // for local debug; only work in chrome
    // var css = GM_getResourceText("theme_academia");
    // var css = GM_getResourceText("theme_warmpaper");

    if (false || (document.location.href.indexOf("http://en.wikipedia.org/wiki/File:") == 0))

    css = `
        /* hide image properties box on image page */
        ul#filetoc {display:none !important;}
        h1#firstHeading.firstHeading {display:none !important;}
        div.sharedUploadNotice {display:none !important;}
        div#file.fullImageLink {text-align:center !important;}
    `;

    if (typeof GM_addStyle != "undefined") {
        GM_addStyle(css);
    } else if (typeof PRO_addStyle != "undefined") {
        PRO_addStyle(css);
    } else if (typeof addStyle != "undefined") {
        addStyle(css);
    } else {
        var node = document.createElement("style");
        node.type = "text/css";
        node.appendChild(document.createTextNode(css));
        var heads = document.getElementsByTagName("head");
        if (heads.length > 0) {
            heads[0].appendChild(node);
        } else {
            // no head yet, stick it whereever
            document.documentElement.appendChild(node);
        }
    }
    })();

    /* CONTENTS ON SCROLL */
    window.onscroll = function() {
       var t = document.documentElement.scrollTop || document.querySelector('#content').scrollTop; // Get the current height
       // Get the point of aim
       var menu = document.querySelectorAll('div#toc>ul a');
       var flag = -1;
       for (var i = 0; i < menu.length; i++) {
          var ssid = menu[i].href.split('#');
          ssid = ssid[ssid.length - 1];

          if (document.getElementById(ssid).offsetTop + 200 >= t) {
             // menu[i].closest('li').focus();
             flag = i;
             break;
          }
       }

        for (var ik = 0; ik < menu.length; ik++) {
            if (flag == ik) { // find the corresponding title
                menu[ik].style.color = "#000 !important"; // set flag a black color
                menu[ik].style.background = "rgba(0,0,0,0.05)"; // set flag a background
                // menu[ik].style.fontWeight = "bolder"; // set flag a as bolder font
                // menu[ik].closest('li').style.borderRight = "thin solid wheat";
                // menu[ik].focus(); // add focus box
            } else { // recover
                menu[ik].style = "unset"
                // menu[ik].style.fontWeight = "unset";
                // menu[ik].closest('li').style.borderRight = "unset";
            }
        }

    };

/* LANGUAGE DISPLAY */
// (function() {
//     var langs = ['en','zh','fr']; // Add language tabs, e.g. fr, de, ja, ko, etc. (ISO 639-1)
//     for(var i in langs){
//         var lang = $('#p-lang > div > ul > li.interlanguage-link.interwiki-' + langs[i]).html();
//         console.log('F: '+lang);
//         if(lang){
//             var node = '<li><span>' + lang + '</span></li>';
//             // $('#mw-page-base').append(node)
//             // $('#mw-head-base').append(node)
//             // $('#content').append(node)
//             // $('#toc').append(node)
//             // $('#mw-page-base > div > ul').append(node)
//             // $('#toc > div > ul').append(node);
//             $('#toc > div > ul').append(node)
//             /*
//             var button = document.createElement("Button");
//             // button.innerHTML = "Title";
//             button.innerHTML = lang;
//             button.style = "top:0; right:0;position:fixed;"
//             document.body.appendChild(button);
//             */
//         }
//     }
// })();

// (function () {
//     /*
//         Customize labels by editing LABEL_STYLE.
//         "LABEL", "LANG_CODE" and "LANG_NAME" will be replaced.

//         e.g.
//             "LABEL (LANG_NAME)" => "Étoile (Français)"
//             "[LANG_CODE]LABEL" => "[fr]Étoile"
//      */
//     var LABEL_STYLE = 'Étoile (Français)';

//     var _REPLACEMENT_LABEL = 'LABEL';
//     var _REPLACEMENT_LANG_CODE = 'LANG_CODE';
//     var _REPLACEMENT_LANG_NAME = 'LANG_NAME';
//     var _REGEXP_LINK = new RegExp('http:\/\/([a-z\-]+)\.wikipedia\.org\/wiki\/([^#]+)');
//     var _REGEXP_SPACES = new RegExp('_', 'g');
//     var links = document.getElementById('p-lang').getElementsByTagName('A');
//     for (var i=0; i<links.length; i++) {
//         var link = links[i];
//         if (link.hreflang && link.href.match(_REGEXP_LINK)) {
//             var langCode = RegExp.$1;
//             var langName = link.innerHTML;
//             var label = decodeURI(RegExp.$2).replace(_REGEXP_SPACES, ' ');
//             link.innerHTML = LABEL_STYLE
//                 .replace(_REPLACEMENT_LABEL, label)
//                 .replace(_REPLACEMENT_LANG_CODE, langCode)
//                 .replace(_REPLACEMENT_LANG_NAME, langName);
//             // START LYF

//             // var button = document.createElement(langName);
//             var button = document.createElement("test");
//             button.innerHTML = link.innerHTML;
//             button.style = "top:0;right:0;position:fixed;"
//             document.body.appendChild(button);

//             //$('button selector').click(function(){
//             //   window.location.href=link.innerHTML;
//             //})
//             // END LYF
//         }
//     }
// })();

/* LANGUAGE DISPLAY V2 */
(function () {
	'use strict';

	console.log('Executing Wikipedia article name with language.');

	// Utilities.

	const sel = document.querySelector.bind(document);
	const selAll = document.querySelectorAll.bind(document);
	const eq = a => b => a === b;
	const test = regex => text => regex.test(text);
	const testOn = text => regex => regex.test(text);
	const prepend = a => b => a + b;
	const makeEl = (tag, attrs, ...content) => {
		const el = document.createElement(tag);
		if (attrs) Object.keys(attrs).forEach(attr => el.setAttribute(attr, attrs[attr]));
		content.map(obj => typeof obj === 'string' ? document.createTextNode(obj) : obj)
			.forEach(node => el.appendChild(node));
		return el;
	};
	const pipe = (...fs) => fs.reduce((left, right) => (...args) => right(left(...args)));
	const uniq = list => {
		const seen = [];
		return list.filter(item => seen.some(eq(item)) ? false : (seen.push(item), true));
	};
	const not = f => (...args) => !f(...args);

	//
	const elements = Array.from(selAll('.interlanguage-link'));

	elements.forEach(el => {
		const a = el.getElementsByTagName('a')[0];
		const langName = a.textContent;
		const titleAndLanguage = a.getAttribute('title');
		const titleMatcher = [
				/(.+) – .+/,    // English, etc.
				/(.+) +\(.+\)/, // Spanish, etc.
				/.+: (.+)/,     // Japanese, etc.
			]
			.find(testOn(titleAndLanguage));
		const title = titleAndLanguage.replace(titleMatcher, '$1');
		a.textContent = '';
		a.appendChild(makeEl('span', { 'class': 'language-name' },
			langName));
		a.appendChild(document.createTextNode(' '));
		a.appendChild(makeEl('span', { 'class': 'article-title' },
			title));
	});

	// Styles.
	sel('head').appendChild(makeEl('style', null,
		`
		.interlanguage-link .language-name {
			display: block;
			text-transform: uppercase;
			font-size: 0.7em;
		}
		`
	));

})();

/*
var button = document.createElement("Button");
button.innerHTML = "Title";
button.style = "top:0;right:0;position:absolute;z-index: 9999"
document.body.appendChild(button);
*/
/* STICK TABLE HEADERS (bug) */
waitForKeyElements ("table.jquery-tablesorter", floatTableHeaders, true);

function floatTableHeaders(table){
  $(table).floatThead();
}

/* ClEAN DONATION REQUEST */
// GM.addStyle("html body #centralNotice, html body [id*=frbanner], html body [id*=frb-inline] { display: none !important; }");