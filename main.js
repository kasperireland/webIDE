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

// var EditSession = require("ace/edit_session").EditSession;
var EditSession= ace.EditSession;

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
	$('#runI').contents().find('style').remove();
	let doc = runI.contentDocument;
	doc.body.innerHTML =
		doc.body.innerHTML + "<style>" + css.getValue() + "</style>";
}

function updateJs() {
	$('#runI').contents().find('script').remove();
	var scriptTag = "<script>"+js.getValue()+"</script>";
	$("#runI").contents().find("body").append(scriptTag);
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
