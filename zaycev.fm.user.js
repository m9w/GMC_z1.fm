// ==UserScript==
// @name         GMC zaycev.fm
// @version      1.0
// @description  Global media control zaycev.fm
// @author       @m9w
// @match        https://www.zaycev.fm/*
// ==/UserScript==

(function() {
    'use strict';
    navigator.mediaSession.metadata = new MediaMetadata();
    function update(path=$('#chanel_nav .g-active').attr('href')){
        $.getJSON("https://api.zaycev.fm/api/v1/channels" + path + "/latest?page=1&limit=1", function(a){
            var data = a.latest[0];
            navigator.mediaSession.metadata.title = data.title;
            navigator.mediaSession.metadata.artist = data.artist;
            navigator.mediaSession.metadata.album = $("a.g-active")[0].text;
            navigator.mediaSession.metadata.artwork = [{sizes:"300x300", src: data.InfoTrack.images.extralarge}];
        });
    }
    setInterval(update, 10000);

    function next(){
        var el = $("#chanel_nav a.g-active").next();
        if(el.length == 0) el = $("#chanel_nav a:first");
        update(el.attr("href"));
        el.click();
    }
    function prew(){
        var el = $("#chanel_nav a.g-active").prev('a');
        if(el.length == 0) el = $("#chanel_nav a:last");
        console.log(el.length);
        update(el.attr("href"));
        el.click();
    }

    navigator.mediaSession.setActionHandler('previoustrack', prew);
    navigator.mediaSession.setActionHandler('nexttrack', next);
    update();
})();
