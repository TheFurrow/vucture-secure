$(document).ready(function () { console.log("please wait, loading page..."); $('#wrap-whole').css('visibility', 'hidden'); });

$(window).on('load', function () {
    $('#wrap-whole').css('visibility', 'visible');
    $('#loading-SVG').fadeOut(500, function () { this.remove(); $('#loading-screen').fadeOut(2000, function () { this.remove(); }); });
    
    console.log("page load done.");
});