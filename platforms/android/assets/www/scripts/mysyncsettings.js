!function(e,t,n){function r(e){e.querySelector("#txtSyncPath").value=AppSettings.syncPath(),e.querySelector("#chkWifi").checked=AppSettings.syncOnlyOnWifi();var t=AppSettings.cameraUploadServers();e.querySelector(".uploadServerList").innerHTML=ConnectionManager.getSavedServers().map(function(e){var n=-1==t.indexOf(e.Id)?"":" checked",r="<paper-checkbox"+n+' class="chkUploadServer" data-id="'+e.Id+'">'+e.Name+"</paper-checkbox>";return r}).join(""),Dashboard.hideLoadingMsg()}function a(t){AppSettings.syncPath(t.querySelector("#txtSyncPath").value),AppSettings.syncOnlyOnWifi(t.querySelector("#chkWifi").checked),AppSettings.cameraUploadServers(e(".chkUploadServer",t).get().filter(function(e){return e.checked}).map(function(e){return e.getAttribute("data-id")})),Dashboard.hideLoadingMsg(),require(["toast"],function(e){e(Globalize.translate("SettingsSaved"))})}function i(){var t=e(this).parents(".page")[0];Dashboard.showLoadingMsg();var n=getParameterByName("userId")||Dashboard.getCurrentUserId();return ApiClient.getUser(n).then(function(e){a(t,e)}),!1}e(n).on("pageinit","#syncPreferencesPage",function(){var t=this;e("form",t).off("submit",i).on("submit",i),e(".btnSelectSyncPath",t).on("click",function(){require(["nativedirectorychooser"],function(){NativeDirectoryChooser.chooseDirectory().then(function(n){e("#txtSyncPath",t).val(n)})})})}).on("pageshow","#syncPreferencesPage",function(){var e=this;Dashboard.showLoadingMsg();var t=getParameterByName("userId")||Dashboard.getCurrentUserId();ApiClient.getUser(t).then(function(t){r(e,t)}),AppInfo.supportsSyncPathSetting?e.querySelector(".fldSyncPath").classList.remove("hide"):e.querySelector(".fldSyncPath").classList.add("hide")})}(jQuery,window,document);