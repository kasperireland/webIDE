var editor = ace.edit("editor");
//editor.setTheme("ace/theme/github");
//editor.session.setMode("ace/mode/javascript");
let fontSize = 18;

editor.setOptions({
	fontFamily: "monospace",
	fontSize: fontSize,
	highlightActiveLine: false,
	highlightGutterLine: true,
	enableBasicAutocompletion: true,
	enableLiveAutocompletion: true
});

// var EditSession = require("ace/edit_session").EditSession;
var EditSession = ace.EditSession;

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

var js = new EditSession("console.log('Hello World');");
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
	$("#runI")
		.contents()
		.find("style")
		.remove();
	let doc = runI.contentDocument;
	doc.body.innerHTML =
		doc.body.innerHTML + "<style>" + css.getValue() + "</style>";
}

function updateJs() {
	$("#runI")
		.contents()
		.find("script")
		.remove();
	var scriptTag = "<script>" + js.getValue() + "</script>";
	$("#runI")
		.contents()
		.find("body")
		.append(scriptTag);
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

//==============================================
function getValue(msg) {
	return prompt(msg, "");
}
//==============================================
function downloadProject() {
	let htmlC = html.getValue();
	let cssC = css.getValue();
	let jsC = js.getValue();

	let projectName = $("#title").val();
	if (projectName === "Enter Project Name") {
		projectName = getValue("Please Enter Project Title:");
		$("#title").val(projectName);
	}
	if (!projectName || projectName === "") {
		projectName = "Unnamed Project";
		$("#title").val(projectName);
	}

	let zip = new JSZip();
	zip.file("index.html", htmlC);
	let cssFolder = zip.folder("css");
	cssFolder.file("main.css", cssC);
	let jsFolder = zip.folder("js");
	jsFolder.file("main.js", jsC);
	zip
		.generateAsync({
			type: "blob"
		})
		.then(function(content) {
			saveAs(content, projectName + ".zip");
		});
}

//downloadProject();
//============================================

$("#menuUl").hide();
function showMenu() {
	$("#menuUl").toggle();
}

function hideMenu() {
	$("#menuUl").hide();
}

$("#zoomInB").click(function() {
	fontSize = fontSize + 4;
	editor.setFontSize(fontSize);
	hideMenu();
});

$("#zoomOutB").click(function() {
	fontSize = fontSize - 4;
	editor.setFontSize(fontSize);
	hideMenu();
});
