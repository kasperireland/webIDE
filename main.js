var editor = ace.edit("editor");
//editor.setTheme("ace/theme/github");
//editor.session.setMode("ace/mode/javascript");
editor.setOptions({
	fontFamily: "monospace",
	fontSize: "14pt",
	highlightActiveLine: false,
	highlightGutterLine: true,
	enableBasicAutocompletion: true,
	enableLiveAutocompletion: true
});

var EditSession = require("ace/edit_session").EditSession;

var html = new EditSession("<h2>Hello World</h2>");
html.setMode("ace/mode/html");
html.on("change", function(delta) {
	updateHtml();
});

var css = new EditSession(["h2{", "   color: purple;", "}"]);
css.setMode("ace/mode/css");
css.on("change", function(delta) {
	updateCss();
});

var js = new EditSession("console.log('Hello World')");
js.setMode("ace/mode/javascript");
js.on("change", function(delta) {
	updateJs();
});

//=======================================================
runI = document.getElementById("runI");

function updateHtml() {
	runI.srcdoc = html.getValue();
}

function updateCss() {
	let doc = runI.contentDocument;
	doc.body.innerHTML =
		doc.body.innerHTML + "<style>" + css.getValue() + "</style>";
}

function updateJs() {
	console.log("updating js");
	let doc = runI.contentDocument;
	doc.body.innerHTML =
		doc.body.innerHTML + "<script>" + js.getValue() + "</script>";
}

//=======================================================
updateHtml();
updateCss();
updateJs();
//=======================================================

setHtml();

function setHtml() {
	editor.setSession(html);
}
function setCss() {
	editor.setSession(css);
}
function setJs() {
	editor.setSession(js);
}
