define(["jQuery"],function(e){function i(i){return new Promise(function(a){var r=document.querySelector(".mainAnimatedPages");if(!i.cancel){var o=s(r),l=o+1;l>=v&&(l=0);var c=n(i),u=c.elem,m="string"==typeof u?null:u.getAttribute("data-require");m=m?m.split(","):[];var g=-1!=i.url.toLowerCase().indexOf("/configurationpage?");g&&(m.push("jqmpopup"),m.push("jqmcollapsible"),m.push("jqmcheckbox"),m.push("legacy/dashboard"),m.push("legacy/selectmenu"),m.push("jqmcontrolgroup")),(g||u.classList&&u.classList.contains("type-interior"))&&(m.push("jqmlistview"),m.push("scripts/notifications")),require(m,function(){var n=r.querySelectorAll(".mainAnimatedPage"),o=n[l],s=o.querySelector(".page-view");s&&d(s);for(var v=0,g=n.length;g>v;v++)l==v?n[v].classList.remove("hide"):n[v].classList.add("hide");"string"==typeof u?o.innerHTML=u:(o.innerHTML="",c.hasScript?e(u).appendTo(o):o.appendChild(u),t(m,u));var f=o.querySelector(".page-view");p&&p(f,!1,i),e.mobile=e.mobile||{},e.mobile.activePage=f,a(f)})}})}function t(i,t){for(var a=!1,r=0,n=i.length;n>r;r++)if(0==i[r].indexOf("jqm")){a=!0;break}a&&e(t).trigger("create")}function a(e,i,t){return e.split(i).join(t)}function r(e,i){i&&(e=a(e,"<!--<script","<script"),e=a(e,"</script>-->","</script>"));var t=document.createElement("div");return t.innerHTML=e,t.querySelector('div[data-role="page"]')}function n(e){if(-1==e.view.indexOf('data-role="page"')){var i='<div class="page-view" data-type="'+(e.type||"")+'" data-url="'+e.url+'">';return i+=e.view,i+="</div>"}var t=-1!=e.view.indexOf("<script"),a=r(e.view,t);return a.classList.add("page-view"),a.setAttribute("data-type",e.type||""),a.setAttribute("data-url",e.url),{elem:a,hasScript:t}}function o(e){p=e}function s(e){for(var i=e.querySelectorAll(".mainAnimatedPage"),t=0,a=i.length;a>t;t++)if(!i[t].classList.contains("hide"))return t;return-1}function l(){var e=document.querySelector("neon-animated-pages.mainAnimatedPages");if(e){var i=document.createElement("div");i.classList.add("mainAnimatedPages"),i.classList.add("skinBody"),i.innerHTML='<div class="mainAnimatedPage hide"></div><div class="mainAnimatedPage hide"></div><div class="mainAnimatedPage hide"></div>',e.parentNode.replaceChild(i,e)}v=document.querySelectorAll(".mainAnimatedPage").length}function c(i){return new Promise(function(t,a){var r=i.url,n=document.querySelector(".page-view[data-url='"+r+"']"),o=m(n,"mainAnimatedPage");if(n){for(var s=-1,l=document.querySelectorAll(".mainAnimatedPage"),c=0,d=l.length;d>c;c++)if(l[c]==o){s=c;break}if(-1!=s){var u=document.querySelector(".mainAnimatedPages");if(i.cancel)return;var v=u.querySelectorAll(".mainAnimatedPage"),g=v[s],n=g.querySelector(".page-view");p&&p(n,!0,i);for(var c=0,d=v.length;d>c;c++)s==c?v[c].classList.remove("hide"):v[c].classList.add("hide");return e.mobile=e.mobile||{},e.mobile.activePage=n,void t(n)}}a()})}function d(e){e.dispatchEvent(new CustomEvent("viewdestroy",{}))}function u(){for(var e=document.querySelectorAll(".mainAnimatedPage.hide .page-view"),i=0,t=e.length;t>i;i++){var a=e[i];d(a),a.parentNode.removeChild(a)}}function m(e,i){for(;!e.classList||!e.classList.contains(i);)if(e=e.parentNode,!e)return null;return e}var v,p;return l(),{loadView:i,tryRestoreView:c,reset:u,setOnBeforeChange:o}});