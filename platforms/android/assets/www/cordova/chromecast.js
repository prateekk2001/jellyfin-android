!function(){function e(){function e(){return W?new Promise(function(e){e(W)}):ApiClient.getJSON(ApiClient.getUrl("System/Endpoint")).then(function(e){return W=e,e})}function t(t){var o=AppSettings.maxChromecastBitrate();t=$.extend(t,{userId:Dashboard.getCurrentUserId(),deviceId:ApiClient.deviceId(),accessToken:ApiClient.accessToken(),serverAddress:ApiClient.serverAddress(),maxBitrate:o,receiverName:b.getFriendlyName(),supportsAc3:AppSettings.enableChromecastAc3()}),Logger.log("Sending command to Chromecast: "+t.command),e().then(function(e){e.IsInNetwork?ApiClient.getPublicSystemInfo().then(function(e){t.serverAddress=e.LocalAddress,n(t)}):n(t)})}function n(e){S.sendText(JSON.stringify(e))}function o(){var e={};return e.playerName=P,e.playableMediaTypes=["Audio","Video"],e.isLocalPlayer=!1,e.appName=P,e.supportedCommands=["VolumeUp","VolumeDown","Mute","Unmute","ToggleMute","SetVolume","SetAudioStreamIndex","SetSubtitleStreamIndex","DisplayContent","SetRepeatMode","EndSession"],e}function a(e){var t=o();return t.name=t.deviceName=e.getFriendlyName(),t.id=e.getId(),t}function r(e){e=(e||"").toLowerCase();var t=["nexusplayer"];return t.push("chromecast"),t.push("eurekadongle"),t.filter(function(t){return-1!=e.replace(" ","").indexOf(t)}).length>0}function i(){var e=A.lastPlayerData||{};return e=e.PlayState||{},null==e.VolumeLevel?100:e.VolumeLevel}function s(e){if("playbackerror"==e.type){var t=e.data;setTimeout(function(){Dashboard.alert({message:Globalize.translate("MessagePlaybackError"+t),title:Globalize.translate("HeaderPlaybackError")})},300)}else"connectionerror"==e.type?setTimeout(function(){Dashboard.alert({message:Globalize.translate("MessageChromecastConnectionError"),title:Globalize.translate("HeaderError")})},300):e.type&&0==e.type.indexOf("playback")&&$(D).trigger(e.type,[e.data])}function c(e){s("string"==typeof e?JSON.parse(e):e)}function l(){Logger.log("session disconnected")}function u(e,t){S=e,Logger.log("session.connect succeeded"),e.setWebAppSessionListener(),b=t,I=t.getId(),A.lastPlayerData={},MediaController.setActivePlayer(P,a(t)),g()}function d(e,t,n){var o=t.acquire();o.on("message",c),o.on("disconnect",l),n||browserInfo.safari?o.connect().success(function(){u(o,e)}).error(m):u(o,e)}function g(){t({options:{},command:"Identify"})}function m(){Logger.log("chromecast session connect error"),p()}function p(){var e=S;e&&(e.off("message"),e.off("disconnect"),e.disconnect(),e.release()),A.lastPlayerData={},S=null}function f(e){Logger.log("calling launchWebApp"),e.getWebAppLauncher().launchWebApp(L).success(function(t){Logger.log("launchWebApp success. calling onSessionConnected"),d(e,t,!0)}).error(function(e){Logger.log("launchWebApp error:"+JSON.stringify(e))})}function y(e,t,n){Logger.log("calling joinWebApp"),e.getWebAppLauncher().joinWebApp(L).success(function(t){Logger.log("joinWebApp success. calling onSessionConnected"),d(e,t,!1)}).error(function(o){return Logger.log("joinWebApp error: "+JSON.stringify(o)),t?void y(e,!1,!0):void(n&&(Logger.log("calling launchWebApp"),f(e)))})}function h(e){S&&p(),y(e,!1,!0)}function v(e){e.off("ready"),Logger.log("creating webAppSession"),A.lastPlayerData={},h(e)}function C(){var e=I;e&&A.tryPair({id:e})}var S,b,I,A=this,P="Chromecast",L="2D4B1DA3";A.name=P,A.getItemsForPlayback=function(e){var t=Dashboard.getCurrentUserId();return e.Ids&&1==e.Ids.split(",").length?new Promise(function(n){ApiClient.getItem(t,e.Ids.split(",")).then(function(e){n({Items:[e],TotalRecordCount:1})})}):(e.Limit=e.Limit||100,e.ExcludeLocationTypes="Virtual",ApiClient.getItems(t,e))};var D={};$(D).on("playbackstart",function(e,t){Logger.log("cc: playbackstart");var n=A.getPlayerStateInternal(t);$(A).trigger("playbackstart",[n])}),$(D).on("playbackstop",function(e,t){Logger.log("cc: playbackstop");var n=A.getPlayerStateInternal(t);$(A).trigger("playbackstop",[n]),A.lastPlayerData={}}),$(D).on("playbackprogress",function(e,t){Logger.log("cc: positionchange");var n=A.getPlayerStateInternal(t);$(A).trigger("positionchange",[n])});var W;A.play=function(e){Dashboard.getCurrentUser().then(function(){e.items?A.playWithCommand(e,"PlayNow"):A.getItemsForPlayback({Ids:e.ids.join(",")}).then(function(t){e.items=t.Items,A.playWithCommand(e,"PlayNow")})})},A.playWithCommand=function(e,n){return e.items?(e.items=e.items.map(function(e){return{Id:e.Id,Name:e.Name,Type:e.Type,MediaType:e.MediaType,IsFolder:e.IsFolder}}),void t({options:e,command:n})):void ApiClient.getItem(Dashboard.getCurrentUserId(),e.ids[0]).then(function(t){e.items=[t],A.playWithCommand(e,n)})},A.unpause=function(){t({command:"Unpause"})},A.pause=function(){t({command:"Pause"})},A.shuffle=function(e){var t=Dashboard.getCurrentUserId();ApiClient.getItem(t,e).then(function(e){A.playWithCommand({items:[e]},"Shuffle")})},A.instantMix=function(e){var t=Dashboard.getCurrentUserId();ApiClient.getItem(t,e).then(function(e){A.playWithCommand({items:[e]},"InstantMix")})},A.canQueueMediaType=function(e){return"Audio"==e},A.queue=function(e){A.playWithCommnd(e,"PlayLast")},A.queueNext=function(e){A.playWithCommand(e,"PlayNext")},A.stop=function(){t({command:"Stop"})},A.displayContent=function(e){t({options:e,command:"DisplayContent"})},A.mute=function(){t({command:"Mute"})},A.unMute=function(){A.setVolume(i()+2)},A.toggleMute=function(){var e=A.lastPlayerData||{};e=e.PlayState||{},e.IsMuted?A.unMute():A.mute()},A.getTargets=function(){return ConnectSDKHelper.getDeviceList().filter(function(e){return e.hasService("Chromecast")||e.hasService("ChromeCast")||r(e.getModelName())||r(e.getFriendlyName())}).map(a)},A.seek=function(e){e=parseInt(e),e/=1e7,t({options:{position:e},command:"Seek"})},A.setAudioStreamIndex=function(e){t({options:{index:e},command:"SetAudioStreamIndex"})},A.setSubtitleStreamIndex=function(e){t({options:{index:e},command:"SetSubtitleStreamIndex"})},A.nextTrack=function(){t({options:{},command:"NextTrack"})},A.previousTrack=function(){t({options:{},command:"PreviousTrack"})},A.beginPlayerUpdates=function(){},A.endPlayerUpdates=function(){},A.volumeDown=function(){t({options:{},command:"VolumeDown"})},A.setRepeatMode=function(e){t({options:{RepeatMode:e},command:"SetRepeatMode"})},A.volumeUp=function(){t({options:{},command:"VolumeUp"})},A.setVolume=function(e){e=Math.min(e,100),e=Math.max(e,0),t({options:{volume:e},command:"SetVolume"})},A.getPlayerState=function(){var e=$.Deferred(),t=A.getPlayerStateInternal();return e.resolveWith(null,[t]),e.promise()},A.lastPlayerData={},A.getPlayerStateInternal=function(e){return e=e||A.lastPlayerData,A.lastPlayerData=e,Logger.log(JSON.stringify(e)),e},A.tryPair=function(e){var t=$.Deferred(),n=ConnectSDKHelper.getDeviceList().filter(function(t){return t.getId()==e.id})[0];return n?A.tryPairWithDevice(n,t):t.reject(),t.promise()},A.tryPairWithDevice=function(e){Logger.log("Will attempt to connect to Chromecast"),e.on("disconnect",function(){e.off("ready"),e.off("disconnect")}),e.isReady()?(Logger.log("Device is already ready, calling onDeviceReady"),v(e)):(Logger.log("Binding device ready handler"),e.on("ready",function(){Logger.log("device.ready fired"),v(e)}),Logger.log("Calling device.connect"),e.connect())},A.endSession=function(){Logger.log("Ending Chromecast session"),A.stop(),setTimeout(function(){var e=S;e&&e.close();var t=b;t&&(t.getWebAppLauncher().closeWebApp(L),t.disconnect()),p(),b=null,I=null},1e3)},document.addEventListener("resume",C,!1)}MediaController.registerPlayer(new e)}();