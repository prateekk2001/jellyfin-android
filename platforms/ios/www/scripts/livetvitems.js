define(["jQuery"],function(e){function r(){return LibraryBrowser.getSavedQueryKey()}function t(o){Dashboard.showLoadingMsg(),ApiClient.getLiveTvPrograms(i).then(function(n){window.scrollTo(0,0);var s="",l=LibraryBrowser.getQueryPagingHtml({startIndex:i.StartIndex,limit:i.Limit,totalRecordCount:n.TotalRecordCount,showLimit:!1});o.querySelector(".listTopPaging").innerHTML=l,"Poster"==a?s=LibraryBrowser.getPosterViewHtml({items:n.Items,shape:i.IsMovie?"portrait":"auto",context:"livetv",showTitle:!1,centerText:!0,lazy:!0,showStartDateIndex:!0,overlayText:!1,showProgramAirInfo:!0,overlayMoreButton:!0}):"PosterCard"==a&&(s=LibraryBrowser.getPosterViewHtml({items:n.Items,shape:"portrait",context:"livetv",showTitle:!0,showStartDateIndex:!0,lazy:!0,cardLayout:!0,showProgramAirInfo:!0,overlayMoreButton:!0}));var d=o.querySelector(".itemsContainer");d.innerHTML=s+l,ImageLoader.lazyChildren(d),e(".btnNextPage",o).on("click",function(){i.StartIndex+=i.Limit,t(o)}),e(".btnPreviousPage",o).on("click",function(){i.StartIndex-=i.Limit,t(o)}),LibraryBrowser.saveQueryValues(r(),i),Dashboard.hideLoadingMsg()})}var a=LibraryBrowser.getDefaultItemsView("Poster","Poster"),o=new Date;o.setHours(0,0,0,0);var i={UserId:Dashboard.getCurrentUserId(),SortBy:"StartDate,SortName",SortOrder:"Ascending",StartIndex:0,HasAired:!1};pageIdOn("pagebeforeshow","liveTvItemsPage",function(){i.ParentId=LibraryMenu.getTopParentId();var e=this,a=LibraryBrowser.getDefaultPageSize();a!=i.Limit&&(i.Limit=a,i.StartIndex=0),i.IsMovie="movies"==getParameterByName("type")?!0:null,i.IsSports="sports"==getParameterByName("type")?!0:null,i.IsKids="kids"==getParameterByName("type")?!0:null;var o=r();LibraryBrowser.loadSavedQueryValues(o,i),t(e)})});