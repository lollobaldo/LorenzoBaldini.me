!function i(r,o,a){function u(n,t){if(!o[n]){if(!r[n]){var e="function"==typeof require&&require;if(!t&&e)return e(n,!0);if(c)return c(n,!0);throw new Error("Cannot find module '"+n+"'")}var s=o[n]={exports:{}};r[n][0].call(s.exports,function(t){var e=r[n][1][t];return u(e||t)},s,s.exports,i,r,o,a)}return o[n].exports}for(var c="function"==typeof require&&require,t=0;t<a.length;t++)u(a[t]);return u}({1:[function(t,e,n){var s,i;s=this,i=function(){return function(n){var s={};function i(t){if(s[t])return s[t].exports;var e=s[t]={exports:{},id:t,loaded:!1};return n[t].call(e.exports,e,e.exports,i),e.loaded=!0,e.exports}return i.m=n,i.c=s,i.p="",i(0)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function s(t,e){for(var n=0;n<e.length;n++){var s=e[n];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(t,e,n){return e&&s(t.prototype,e),n&&s(t,n),t}}();var i=n(1),u=n(3),r=function(){function n(t,e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,n),i.initializer.load(this,e,t),this.begin()}return s(n,[{key:"toggle",value:function(){this.pause.status?this.start():this.stop()}},{key:"stop",value:function(){this.typingComplete||this.pause.status||(this.toggleBlinking(!0),this.pause.status=!0,this.options.onStop(this.arrayPos,this))}},{key:"start",value:function(){this.typingComplete||this.pause.status&&(this.pause.status=!1,this.pause.typewrite?this.typewrite(this.pause.curString,this.pause.curStrPos):this.backspace(this.pause.curString,this.pause.curStrPos),this.options.onStart(this.arrayPos,this))}},{key:"destroy",value:function(){this.reset(!1),this.options.onDestroy(this)}},{key:"reset",value:function(){var t=arguments.length<=0||void 0===arguments[0]||arguments[0];clearInterval(this.timeout),this.replaceText(""),this.cursor&&this.cursor.parentNode&&(this.cursor.parentNode.removeChild(this.cursor),this.cursor=null),this.strPos=0,this.arrayPos=0,this.curLoop=0,t&&(this.insertCursor(),this.options.onReset(this),this.begin())}},{key:"begin",value:function(){var t=this;this.typingComplete=!1,this.shuffleStringsIfNeeded(this),this.insertCursor(),this.bindInputFocusEvents&&this.bindFocusEvents(),this.timeout=setTimeout(function(){t.currentElContent&&0!==t.currentElContent.length?t.backspace(t.currentElContent,t.currentElContent.length):t.typewrite(t.strings[t.sequence[t.arrayPos]],t.strPos)},this.startDelay)}},{key:"typewrite",value:function(i,r){var o=this;this.fadeOut&&this.el.classList.contains(this.fadeOutClass)&&(this.el.classList.remove(this.fadeOutClass),this.cursor&&this.cursor.classList.remove(this.fadeOutClass));var t=this.humanizer(this.typeSpeed),a=1;!0!==this.pause.status?this.timeout=setTimeout(function(){r=u.htmlParser.typeHtmlChars(i,r,o);var t=0,e=i.substr(r);if("^"===e.charAt(0)&&/^\^\d+/.test(e)){var n=1;n+=(e=/\d+/.exec(e)[0]).length,t=parseInt(e),o.temporaryPause=!0,o.options.onTypingPaused(o.arrayPos,o),i=i.substring(0,r)+i.substring(r+n),o.toggleBlinking(!0)}if("`"===e.charAt(0)){for(;"`"!==i.substr(r+a).charAt(0)&&!(r+ ++a>i.length););var s=i.substring(0,r);i=s+i.substring(s.length+1,r+a)+i.substring(r+a+1),a--}o.timeout=setTimeout(function(){o.toggleBlinking(!1),r>=i.length?o.doneTyping(i,r):o.keepTyping(i,r,a),o.temporaryPause&&(o.temporaryPause=!1,o.options.onTypingResumed(o.arrayPos,o))},t)},t):this.setPauseStatus(i,r,!0)}},{key:"keepTyping",value:function(t,e,n){0===e&&(this.toggleBlinking(!1),this.options.preStringTyped(this.arrayPos,this)),e+=n;var s=t.substr(0,e);this.replaceText(s),this.typewrite(t,e)}},{key:"doneTyping",value:function(t,e){var n=this;this.options.onStringTyped(this.arrayPos,this),this.toggleBlinking(!0),this.arrayPos===this.strings.length-1&&(this.complete(),!1===this.loop||this.curLoop===this.loopCount)||(this.timeout=setTimeout(function(){n.backspace(t,e)},this.backDelay))}},{key:"backspace",value:function(n,s){var i=this;if(!0!==this.pause.status){if(this.fadeOut)return this.initFadeOut();this.toggleBlinking(!1);var t=this.humanizer(this.backSpeed);this.timeout=setTimeout(function(){s=u.htmlParser.backSpaceHtmlChars(n,s,i);var t=n.substr(0,s);if(i.replaceText(t),i.smartBackspace){var e=i.strings[i.arrayPos+1];e&&t===e.substr(0,s)?i.stopNum=s:i.stopNum=0}s>i.stopNum?(s--,i.backspace(n,s)):s<=i.stopNum&&(i.arrayPos++,i.arrayPos===i.strings.length?(i.arrayPos=0,i.options.onLastStringBackspaced(),i.shuffleStringsIfNeeded(),i.begin()):i.typewrite(i.strings[i.sequence[i.arrayPos]],s))},t)}else this.setPauseStatus(n,s,!0)}},{key:"complete",value:function(){this.options.onComplete(this),this.loop?this.curLoop++:this.typingComplete=!0}},{key:"setPauseStatus",value:function(t,e,n){this.pause.typewrite=n,this.pause.curString=t,this.pause.curStrPos=e}},{key:"toggleBlinking",value:function(t){this.cursor&&(this.pause.status||this.cursorBlinking!==t&&((this.cursorBlinking=t)?this.cursor.classList.add("typed-cursor--blink"):this.cursor.classList.remove("typed-cursor--blink")))}},{key:"humanizer",value:function(t){return Math.round(Math.random()*t/2)+t}},{key:"shuffleStringsIfNeeded",value:function(){this.shuffle&&(this.sequence=this.sequence.sort(function(){return Math.random()-.5}))}},{key:"initFadeOut",value:function(){var t=this;return this.el.className+=" "+this.fadeOutClass,this.cursor&&(this.cursor.className+=" "+this.fadeOutClass),setTimeout(function(){t.arrayPos++,t.replaceText(""),t.strings.length>t.arrayPos?t.typewrite(t.strings[t.sequence[t.arrayPos]],0):(t.typewrite(t.strings[0],0),t.arrayPos=0)},this.fadeOutDelay)}},{key:"replaceText",value:function(t){this.attr?this.el.setAttribute(this.attr,t):this.isInput?this.el.value=t:"html"===this.contentType?this.el.innerHTML=t:this.el.textContent=t}},{key:"bindFocusEvents",value:function(){var e=this;this.isInput&&(this.el.addEventListener("focus",function(t){e.stop()}),this.el.addEventListener("blur",function(t){e.el.value&&0!==e.el.value.length||e.start()}))}},{key:"insertCursor",value:function(){this.showCursor&&(this.cursor||(this.cursor=document.createElement("span"),this.cursor.className="typed-cursor",this.cursor.innerHTML=this.cursorChar,this.el.parentNode&&this.el.parentNode.insertBefore(this.cursor,this.el.nextSibling)))}}]),n}();e.default=r,t.exports=e.default},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&(t[s]=n[s])}return t},s=function(){function s(t,e){for(var n=0;n<e.length;n++){var s=e[n];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(t,e,n){return e&&s(t.prototype,e),n&&s(t,n),t}}();var i,r=n(2),u=(i=r)&&i.__esModule?i:{default:i},o=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t)}return s(t,[{key:"load",value:function(t,e,n){if(t.el="string"==typeof n?document.querySelector(n):n,t.options=a({},u.default,e),t.isInput="input"===t.el.tagName.toLowerCase(),t.attr=t.options.attr,t.bindInputFocusEvents=t.options.bindInputFocusEvents,t.showCursor=!t.isInput&&t.options.showCursor,t.cursorChar=t.options.cursorChar,t.cursorBlinking=!0,t.elContent=t.attr?t.el.getAttribute(t.attr):t.el.textContent,t.contentType=t.options.contentType,t.typeSpeed=t.options.typeSpeed,t.startDelay=t.options.startDelay,t.backSpeed=t.options.backSpeed,t.smartBackspace=t.options.smartBackspace,t.backDelay=t.options.backDelay,t.fadeOut=t.options.fadeOut,t.fadeOutClass=t.options.fadeOutClass,t.fadeOutDelay=t.options.fadeOutDelay,t.isPaused=!1,t.strings=t.options.strings.map(function(t){return t.trim()}),"string"==typeof t.options.stringsElement?t.stringsElement=document.querySelector(t.options.stringsElement):t.stringsElement=t.options.stringsElement,t.stringsElement){t.strings=[],t.stringsElement.style.display="none";var s=Array.prototype.slice.apply(t.stringsElement.children),i=s.length;if(i)for(var r=0;r<i;r+=1){var o=s[r];t.strings.push(o.innerHTML.trim())}}for(var r in t.strPos=0,t.arrayPos=0,t.stopNum=0,t.loop=t.options.loop,t.loopCount=t.options.loopCount,t.curLoop=0,t.shuffle=t.options.shuffle,t.sequence=[],t.pause={status:!1,typewrite:!0,curString:"",curStrPos:0},t.typingComplete=!1,t.strings)t.sequence[r]=r;t.currentElContent=this.getCurrentElContent(t),t.autoInsertCss=t.options.autoInsertCss,this.appendAnimationCss(t)}},{key:"getCurrentElContent",value:function(t){return t.attr?t.el.getAttribute(t.attr):t.isInput?t.el.value:"html"===t.contentType?t.el.innerHTML:t.el.textContent}},{key:"appendAnimationCss",value:function(t){var e="data-typed-js-css";if(t.autoInsertCss&&(t.showCursor||t.fadeOut)&&!document.querySelector("["+e+"]")){var n=document.createElement("style");n.type="text/css",n.setAttribute(e,!0);var s="";t.showCursor&&(s+="\n        .typed-cursor{\n          opacity: 1;\n        }\n        .typed-cursor.typed-cursor--blink{\n          animation: typedjsBlink 0.7s infinite;\n          -webkit-animation: typedjsBlink 0.7s infinite;\n                  animation: typedjsBlink 0.7s infinite;\n        }\n        @keyframes typedjsBlink{\n          50% { opacity: 0.0; }\n        }\n        @-webkit-keyframes typedjsBlink{\n          0% { opacity: 1; }\n          50% { opacity: 0.0; }\n          100% { opacity: 1; }\n        }\n      "),t.fadeOut&&(s+="\n        .typed-fade-out{\n          opacity: 0;\n          transition: opacity .25s;\n        }\n        .typed-cursor.typed-cursor--blink.typed-fade-out{\n          -webkit-animation: 0;\n          animation: 0;\n        }\n      "),0!==n.length&&(n.innerHTML=s,document.body.appendChild(n))}}}]),t}(),c=new(e.default=o);e.initializer=c},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={strings:["These are the default values...","You know what you should do?","Use your own!","Have a great day!"],stringsElement:null,typeSpeed:0,startDelay:0,backSpeed:0,smartBackspace:!0,shuffle:!1,backDelay:700,fadeOut:!1,fadeOutClass:"typed-fade-out",fadeOutDelay:500,loop:!1,loopCount:1/0,showCursor:!0,cursorChar:"|",autoInsertCss:!0,attr:null,bindInputFocusEvents:!1,contentType:"html",onComplete:function(t){},preStringTyped:function(t,e){},onStringTyped:function(t,e){},onLastStringBackspaced:function(t){},onTypingPaused:function(t,e){},onTypingResumed:function(t,e){},onReset:function(t){},onStop:function(t,e){},onStart:function(t,e){},onDestroy:function(t){}};e.default=n,t.exports=e.default},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function s(t,e){for(var n=0;n<e.length;n++){var s=e[n];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(t,e,n){return e&&s(t.prototype,e),n&&s(t,n),t}}();var s=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t)}return n(t,[{key:"typeHtmlChars",value:function(t,e,n){if("html"!==n.contentType)return e;var s=t.substr(e).charAt(0);if("<"===s||"&"===s){var i="";for(i="<"===s?">":";";t.substr(e+1).charAt(0)!==i&&!(++e+1>t.length););e++}return e}},{key:"backSpaceHtmlChars",value:function(t,e,n){if("html"!==n.contentType)return e;var s=t.substr(e).charAt(0);if(">"===s||";"===s){var i="";for(i=">"===s?"<":"&";t.substr(e-1).charAt(0)!==i&&!(--e<0););e--}return e}}]),t}(),i=new(e.default=s);e.htmlParser=i}])},"object"==typeof n&&"object"==typeof e?e.exports=i():"function"==typeof define&&define.amd?define([],i):"object"==typeof n?n.Typed=i():s.Typed=i()},{}],2:[function(t,e,n){var s=t("typed.js");t("./imports/navbar"),t("./imports/counters");$("#typed").ready(function(){new s("#typed",{stringsElement:"#typed-strings",typeSpeed:60,backSpeed:10,loop:!0})})},{"./imports/counters":3,"./imports/navbar":4,"typed.js":1}],3:[function(t,e,n){var o,s;e.exports={main:function(){help1(),help2()},help1:$((o=jQuery,s=window,void(o.fn.inViewport=function(r){return this.each(function(t,i){function e(){var t=o(this).height(),e=i.getBoundingClientRect(),n=e.top,s=e.bottom;return r.call(i,Math.max(0,0<n?t-n:s<t?s:t))}e(),o(s).on("resize scroll",e)})}))),help2:jQuery(function(e){e(".stats-counter").inViewport(function(t){0<t&&!this.initNumAnim&&(this.initNumAnim=!0,e(this).prop("Counter",0).animate({Counter:e(this).text()},{duration:2e3,step:function(t){e(this).text(Math.ceil(t))}}))})})}},{}],4:[function(t,e,n){e.exports={main:function(){change(),jump(),scroll()},change:$(window).scroll(function(){50<$(document).scrollTop()?$("nav").addClass("nav-scroll"):$("nav").removeClass("nav-scroll")}),jump:$(document).ready(function(){$("a[href*=\\#]").bind("click",function(t){var e=$("nav").outerHeight()+20;t.preventDefault();var n=$(this).attr("href");return $("html, body").stop().animate({scrollTop:$(n).offset().top-e},600,function(){var t=$(window).scrollTop();location.hash=n,$(window).scrollTop(t)}),!1})}),scroll:$(window).scroll(function(){var e=$(window).scrollTop(),n=$("nav").outerHeight();$(".page-section").each(function(t){$(this).position().top-n<=e&&($("nav a.active").removeClass("active"),$("nav a").eq(t).addClass("active"))})}).scroll()}},{}]},{},[2]);