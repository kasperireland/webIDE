var editor = ace.edit("editor");
//editor.setTheme("ace/theme/github");
//editor.session.setMode("ace/mode/javascript");
editor.setOptions({
    //fontFamily: "tahoma",
    fontSize: "12pt",
    highlightActiveLine: false,
    highlightGutterLine: true ,
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true
});




var EditSession = require("ace/edit_session").EditSession;

var html= new EditSession("<h2>Hello World</h2>");
html.setMode("ace/mode/html");
html.on('change', function(delta) {
    updateHtml();
});

var css = new EditSession(["h2{", "   color: purple;", "}"]);
css.setMode("ace/mode/css");
css.on('change', function(delta){
    updateCss();
});

var js = new EditSession("console.log('Hello World')");
js.setMode("ace/mode/javascript");

//=======================================================
runI= document.getElementById("runI");

function updateHtml(){
    runI.srcdoc= html.getValue();
}

function updateCss(){
    let doc= runI.contentDocument;
    doc.body.innerHTML = doc.body.innerHTML + '<style>'+css.getValue()+'</style>';
}



//=======================================================
updateHtml();
updateCss();
//=======================================================

setHtml();

function setHtml(){
    editor.setSession(html);
}
function setCss(){
    editor.setSession(css);
}
function setJs(){
    editor.setSession(js);
}