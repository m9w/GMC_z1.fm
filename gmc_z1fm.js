// ==UserScript==
// @name         Support Z1.fm in global media control
// @namespace    http://tampermonkey.net/
// @version      1.0
// @author       @m9w
// @match        https://z1.fm/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    navigator.mediaSession.setActionHandler('play', jQuery.zvPlayer.play);
    navigator.mediaSession.setActionHandler('pause', jQuery.zvPlayer.pause);
    navigator.mediaSession.setActionHandler('seekbackward', function() {jQuery.zvPlayer.lastSound.setPosition(jQuery.zvPlayer.lastSound.position-5000);});
    navigator.mediaSession.setActionHandler('seekforward', function() {jQuery.zvPlayer.lastSound.setPosition(jQuery.zvPlayer.lastSound.position+5000)});
    navigator.mediaSession.setActionHandler('previoustrack', jQuery.zvPlayer.previous);
    navigator.mediaSession.setActionHandler('nexttrack', jQuery.zvPlayer.next);

    var lastid = 0;
    function update(){
        if (lastid == jQuery.zvPlayer.lastSound.id)return;
        else {
            var title = document.querySelector(".player-song-name").innerText.split(" — ");
            var url = $(".played>.song-img>img").first().attr("data-original");
            if(url) url = [{sizes:"200x200", src: location.protocol+"//"+location.host+url}];
            navigator.mediaSession.metadata = new MediaMetadata({
                title: title[1],
                artist: title[0],
                album: "@m9w",
                artwork: url
            });
            lastid = jQuery.zvPlayer.lastSound.id
        }
    }
    setInterval(update,500);
})();
