// ==UserScript==
// @name          Wikipedia Optimizor - Warm Paper Theme
// @version       Beta
// @description	  A neat warm paper theme, with smart toc sidebar, explicit multilingual links, and other powerful optimizations
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
// ==/UserScript==

/* WARM PAPER THEME */
(function() {
var css = `
    /* hide tagline */
    #siteSub {display: none;}

    /* hide header */
    #mw-navigation {display: none;}

    /* hide header except search */
    #mw-head > div:not(#right-navigation),
    #right-navigation > div:not(#p-search) {display: none;}

    /* content style */
    body {
        font-size: inherit;
        background: url(http://i.imgur.com/anSVcTO.png);
        // background: white;
    }
    #bodyContent {
        font: 14px/1.5 Open Sans, sans-serif;
    }
    body b {
        font-weight: 600 !important;
    }
    p {
        margin: 0 0 1em 0;
        line-height: inherit;
        color: #555 !important;
    }
        .MathJax {
            color: #666;
        }

    /* prevents sub/superscripts from throwing off line spacing */
    sub, sup {
        font-size: 75%;
        line-height: 0;
        position: relative;
        vertical-align: baseline;
    }
        sup {top: -0.33em;}
        sub {bottom: -0.33em;}

    /* title style */
    .firstHeading {
        font: 48px/1 AquilineTwo, IM Fell Great Primer Pro, Georgia, Open Sans !important;
        color: rgba(0,0,0,0.55) !important;
        // font-weight: 400 !important;
        display: block;
        margin: 0 !important;
        padding: .75em 0 1em 10px !important;
        // position: relative  !important;
        // z-index: 99999 !important;
    }

    /* redirect title */
    #contentSub {display:none !important;}

    .dablink, .rellink, .relarticle {
        font-size: 0.95em;
        color: #777;
        position: relative;
        z-index: 99;
    }


    #column-one, #footer { display: none !important; }

    /* hide left and top panel */
    #mw-panel {display: none!important;}
    .noprint {display: none!important;}

    #panel, #head,#page-base
      { display: none !important; }


    /* section headers styple */
    h1, h2, h3, h4, h5, h6 {
        border: none !important;
        font-family: Open Sans, Droid Serif, PT Serif, Georgia, Helvetica, sans-serif !important;
        margin: 0.5em 0;
        color: #444;
    }
    h2 {
        font-size: 21px;
        // color: #AA0000;
        text-transform: uppercase;
        text-decoration: underline;
    }
    h3 {
        font-size: 18px;
        font-weight: 400;
    }
    h4 {
        font-size: 16px;
        font-weight: 400;
    }
    h5 {
        font-size: 1em;
        font-weight: 400;
    }


    #content.mw-body {
        position: relative;
        top: 0;
        bottom: 0;
        left: calc(200px + 1em);
        max-width: calc(100% - 315px);
        margin: 0;
        border: none !important;
        border-radius: 2px !important;
        padding: 0px 1.6em 2em 1em !important;
        background: none;
        color: #555;
    }
        #content ul, #content ol {
            color: #666 !important;
            list-style-image: none;
            margin-bottom: 1em;
            margin-top: 0em;
        }
        #content table.wikitable {
            color: #666 !important;
            border: 1px solid #EEE !important;
        }
        table.wikitable > tr > th, table.wikitable > tr > td, table.wikitable > * > tr > th, table.wikitable > * > tr > td {    border: 1px solid #CCC !important;}

    /* TRY language bar style and interaction */
    #p-lang {
        font-family: Open Sans, sans-serif !important;
        // border: 1px solid #EEE !important;
        border: none;
        // border-radius: 2px !important;
        font-size: 12px;
        font-weight: 400;
        background: url(http://i.imgur.com/anSVcTO.png);
        /* make sidebar  */
        position: fixed !important;
        display: inline-block;
        top: 0;
        bottom: 0;
        left: 0;
        width: 200px;
        padding: 0.2em 0;
        margin: 0 .5em;
        // word-break: break-all !important;
        overflow: auto;
        // z-index: 99999;
        // height: 100%;
        background: #EDEDED url(http://i.imgur.com/anSVcTO.png) center center scroll;
        // background: white center center scroll;
        }

    /* table of contents style and interaction*/
    #toc {
        font-family: Open Sans, sans-serif !important;
        // border: 1px solid #EEE !important;
        border: none;
        // border-radius: 2px !important;
        font-size: 12px;
        font-weight: 400;
        background: url(http://i.imgur.com/anSVcTO.png);
        /* make sidebar  */
        position: fixed !important;
        display: inline-block;
        top: 0;
        bottom: 0;
        left: 0;
        width: 200px;
        padding: 0.2em 0;
        margin: 0 .5em;
        // word-break: break-all !important;
        overflow: auto;
        // z-index: 99999;
        // height: 100%;
        background: #EDEDED url(http://i.imgur.com/anSVcTO.png) center center scroll;
        // background: white center center scroll;
        }
        #toc > ul {
            overflow-y: auto !important;
            /*word-break: break-all !important;*/
            /*height: 100% !important;*/
            overflow-x: hidden !important;
            background: #EDEDED url(http://i.imgur.com/anSVcTO.png) center center scroll;
            // background: white center center scroll;
            padding: 1em 0 5em;
            margin: auto 0 !important;

        }

        .toc ul ul { margin-left: 1em !important; }
        .toc a {
            display: block;
            padding: 0.25em 1em;
            border-radius: 2px;
            line-height: 1.25 !important;
        }
        /* toc headers */
        .toclevel-1 > a > .toctext {
            font-weight: 600;
            text-transform: uppercase;
            padding-top: 0.25em;
            display: inline-block;
        }
        .tocnumber {display:none;}
        .toc h2 {display:none !important;}
    /*.toc:hover {
        background-color: #F5F5F5 !important;
        box-shadow: 0 0 4px #666 !important;
        -moz-transition: 400ms;
        }*/
    .toccolours, .thumb {
        border: 1px solid #EEE !important;
        // box-shadow: 0px 0px 3px 0 #999 !important;
        border-radius: 2px !important;
        }
    div.toctitle {text-decoration: none !important;}
    span.toctoggle {display:none !important;}

    #toc a:link {color: #888 !important; text-decoration: none !important;}
    #toc a:visited {color: #AAA !important;}
    #toc a:hover {color: #000 !important; text-decoration: none !important; background: rgba(0,0,0,0.05);}
    #toc a:active {color: #00A6FF !important; outline:none;}

    /* pictures / images */
    .infobox {
        background-color: #FCFCFC !important;
        border:1px solid #DDD !important;
        border-radius: 2px !important;
        // box-shadow: 0px 0px 2px 0 #999 !important;
        }
        .infobox tbody tr th {
            background: none !important;
            font-weight: 600 !important;
        }

    .thumb {
        border: 1px solid #E0E0E0 !important;
        border-radius: 2px !important;
    }
    .thumbinner {
        // padding: 4px !important;
        border: none !important;
        }

    .thumbimage {
        border: none !important;
    }

    .magnify {
        display:none;
    }

    .editsection, .mw-editsection, .plainlinks.hlist.navbar {display: none !important;}

    /* link style and interaction */
    a:link {
        color: #274787 !important;
        text-decoration: none !important;
    }
    // a:visited {color: #888 !important;}
    a:hover {color: #36c !important; }
    a:active {color:#40BCFF !important; outline:none;}

    /* search results */
    .mw-search-result-data, .mw-specialpage-summary, .mw-search-formheader, .mw-search-createlink {display:none !important;}
    .mw-search-results {padding-top: 15px !important;}
    div.mw-jump {display:none!important;}
    table#mw-search-top-table tr td input {display:none!important;}

    /* hide citations */
    // a[href=\"#References\"], sup[class=\"reference\"], span[id=\"References\"], ol[class=\"references\"], .refbegin {display:none !important;}

    /* hide rating */
    // div#mw-articlefeedback {display:none!important;}

    /* hide coordinates on location pages */
    #coordinates {display:none !important;}

    /* hide hide button
    .collapseButton {display:none !important;}  */

    /* hide protected lock */
    div#protected-icon {display:none !important;}

    /* hide toc title */
    div.toctitle {display:none !important;}

    /* merge suggestion
    table.metadata.plainlinks.ambox.ambox-move {display:none !important;} */
    /* needs citations */
    table.ambox {font-size: 0.9em; margin: 1em 2em; background: rgba(0,0,0,0.05); border: none; border-radius: 2px; padding: .25em .5em; color: rgba(0,0,0,0.65);}

    /* hide stubs */
    TABLE.metadata.plainlinks.stub {display:none!important;}

    /* V•T•E */
    .plainlinks.hlist.navbar.mini {
        display: none;
    }

    /* Categories */
    #mw-normal-catlinks {
        font-size: 0.9em;
    }
`;

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
(function() {
    var langs = ['en','zh','fr']; // Add language tabs, e.g. fr, de, ja, ko, etc. (ISO 639-1)
    for(var i in langs){
        var lang = $('#p-lang > div > ul > li.interlanguage-link.interwiki-' + langs[i]).html();
        console.log('F: '+lang);
        if(lang){
            var node = '<li><span>' + lang + '</span></li>';
            // $('#mw-page-base').append(node)
            // $('#mw-head-base').append(node)
            // $('#content').append(node)
            // $('#toc').append(node)
            // $('#mw-page-base > div > ul').append(node)
            // $('#toc > div > ul').append(node);
            $('#toc > div > ul').append(node)
            /*
            var button = document.createElement("Button");
            // button.innerHTML = "Title";
            button.innerHTML = lang;
            button.style = "top:0; right:0;position:fixed;"
            document.body.appendChild(button);
            */
        }
    }
})();

(function () {
    /*
        Customize labels by editing LABEL_STYLE.
        "LABEL", "LANG_CODE" and "LANG_NAME" will be replaced.

        e.g.
            "LABEL (LANG_NAME)" => "Étoile (Français)"
            "[LANG_CODE]LABEL" => "[fr]Étoile"
     */
    var LABEL_STYLE = 'Étoile (Français)';

    var _REPLACEMENT_LABEL = 'LABEL';
    var _REPLACEMENT_LANG_CODE = 'LANG_CODE';
    var _REPLACEMENT_LANG_NAME = 'LANG_NAME';
    var _REGEXP_LINK = new RegExp('http:\/\/([a-z\-]+)\.wikipedia\.org\/wiki\/([^#]+)');
    var _REGEXP_SPACES = new RegExp('_', 'g');
    var links = document.getElementById('p-lang').getElementsByTagName('A');
    for (var i=0; i<links.length; i++) {
        var link = links[i];
        if (link.hreflang && link.href.match(_REGEXP_LINK)) {
            var langCode = RegExp.$1;
            var langName = link.innerHTML;
            var label = decodeURI(RegExp.$2).replace(_REGEXP_SPACES, ' ');
            link.innerHTML = LABEL_STYLE
                .replace(_REPLACEMENT_LABEL, label)
                .replace(_REPLACEMENT_LANG_CODE, langCode)
                .replace(_REPLACEMENT_LANG_NAME, langName);
            // START LYF

            // var button = document.createElement(langName);
            var button = document.createElement("test");
            button.innerHTML = link.innerHTML;
            button.style = "top:0;right:0;position:fixed;"
            document.body.appendChild(button);

            //$('button selector').click(function(){
            //   window.location.href=link.innerHTML;
            //})
            // END LYF
        }
    }
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
