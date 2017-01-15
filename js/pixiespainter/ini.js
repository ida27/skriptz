var app = 'paint'
var knot = 'body'
var srcs_path = 'assets/js/'

function addAppScripts() {
    var srcs = [
        'skel.js',
        'styl.js',
        'ctrl.js',
        'keys.js',
        'brush.js',
    ]
    for(var i=0; i < srcs.length; i++) {
        addScript(srcs_path + srcs[i])
    } 
}
function addDependencies() {
    addStylesheet('assets/3rd/jqui/jquery-ui.min.css')
    addScript('assets/3rd/jqui/jquery-ui.min.js')
}
function addScript(file_path) {
    $('head').append('<script type="text/javascript" src="' + file_path + '"></script>')
}
function addStylesheet(file_path) {
    $('head').append('<link rel="stylesheet" type="text/javascript" href="' + file_path + '">')
}
(function ($) {
    $(document).ready(function() {
        addDependencies()
        addAppScripts()

    // Set brush-color to 'red':
    $(app + '-controls .color').val('ff0800')
    // Apply brush-color to brush:
    $(app + '-canvas-cursor').css('background', '#ff0800')
    // Set brush-mode to 'on':
    $(app + '-controls-controller-middle').addClass('selected')
    // Hide info-text:
    $(app + '-controls-header-info').click()
    // Focus app, so user can go right ahead to make key-inputs:
    $(app).focus()

    });//docready
})(jQuery);
